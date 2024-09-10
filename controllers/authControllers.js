import gravatar from "gravatar";
import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";
import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const avatarsPath = path.resolve("public", "avatars");

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


const verify = async (req, res) => {
  const { verificationCode } = req.params;
  await authServices.verifyUser(verificationCode);

  res.json({
    message: "Email verified successfully",
  });
};

const resendVerify = async (req, res) => {
  const { email } = req.body;
  await authServices.resendVerifyEmail(email);

  res.json({
    message: "Verify email send again",
  });

const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { file } = req;


    const avatarNewName = `${_id}-${filename}`;
    const avatarNewPath = path.join(avatarsPath, avatarNewName);

    const image = await Jimp.read(file.path);
    await image.resize(250, 250);

    const avatarURL = `/avatars/${avatarNewName}`;
    await fs.rename(file.path, avatarNewPath);

    await authServices.updateUser(_id, { avatarURL });

    res.json({ avatarURL: updatedUser.avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    next(HttpError(500, "Error while processing avatar"));
  }

};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),

  resendVerify: ctrlWrapper(resendVerify),

  updateAvatar: ctrlWrapper(updateAvatar),

};
