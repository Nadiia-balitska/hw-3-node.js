import HttpError from "../helpers/HttpError.js";

import { verifyToken } from "../helpers/jwt.js";

import { findUser } from "../services/authServices.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    return next(HttpError(401, "Bearer not found"));
  }

  const { data, error } = verifyToken(token);
  if (error) {
    return next(HttpError(401, error.message));
  }
  const { id } = data;
  const user = await findUser({ _id: id });
  if (!user) {
    return next(HttpError(401, "User not found"));
  }

  if (!user.token) {
    return next(HttpError(401, "User already logout"));
  }

  req.user = user;
  next();
};

export default authenticate;
