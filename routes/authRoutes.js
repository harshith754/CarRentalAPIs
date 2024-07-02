import { Router } from "express";
import {
  checkAuth,
  loginUser,
  registerUser,
} from "../controller/authController.js";
// import { authenticate } from "../middleware/index.js";

const router = Router();

router.use("/register", registerUser);

router.use("/login", loginUser);
router.use("/", checkAuth);

export default router;
