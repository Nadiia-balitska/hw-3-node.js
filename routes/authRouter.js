import multer from "multer";
// import express from "express";
import { Router } from "express";

import authControllers from "../controllers/authControllers.js";

import validateBody from "../helpers/validateBody.js";

import { userSignupSchema, userSigninSchema } from "../schemas/userSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const signupMiddleware = validateBody(userSignupSchema);
const signinMiddleware = validateBody(userSigninSchema);

const authRouter = Router();
// const { Router } = express;
const upload = multer({ dest: "tmp/" });

authRouter.post("/signup", signupMiddleware, authControllers.signup);

authRouter.post("/signin", signinMiddleware, authControllers.signin);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/signout", authenticate, authControllers.signout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);

export default authRouter;
