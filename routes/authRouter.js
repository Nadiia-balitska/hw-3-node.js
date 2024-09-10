import { Router } from "express";

import authControllers from "../controllers/authControllers.js";

import validateBody from "../helpers/validateBody.js";

import {
  userSignupSchema,
  userSigninSchema,
  userEmailSchema,
} from "../schemas/userSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const signupMiddleware = validateBody(userSignupSchema);
const signinMiddleware = validateBody(userSigninSchema);
const resendVerifyEmailMiddleware = validateBody(userEmailSchema);

const authRouter = Router();

authRouter.post("/signup", signupMiddleware, authControllers.signup);

authRouter.post("/signin", signinMiddleware, authControllers.signin);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/signout", authenticate, authControllers.signout);

authRouter.get("/verify/:verificationCode", authControllers.verify);

authRouter.post(
  "/verify",
  resendVerifyEmailMiddleware,
  authControllers.resendVerify
);

export default authRouter;
