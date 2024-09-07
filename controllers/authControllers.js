import gravatar from "gravatar";
import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";
import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const avatarsPath = path.resolve("public", "covers");

const signup = async (req, res) => {
  const { email, password, username } = req.body;
  const avatarURL = gravatar.url(email, { s: "250", d: "identicon" }, true);
  const newUser = await authServices.signup({
    email,
    password,
    username,
    avatarURL,
  });

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
    avatarURL: newUser.avatarURL,
  });
};

const signin = async (req, res) => {
  const { token, user } = await authServices.signin(req.body);

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = (req, res) => {
  const { username, email, avatarURL } = req.user;

  res.json({
    username,
    email,
    avatarURL,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await authServices.updateUser({ _id }, { token: "" });

  res.json({
    message: "Logout success",
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
};
