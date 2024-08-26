import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const createToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "48h" });

export const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return { data: payload };
  } catch (error) {
    return { error };
  }
};
