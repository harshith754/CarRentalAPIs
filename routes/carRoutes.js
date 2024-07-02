import { Router } from "express";
import {
  checkAuth,
  loginUser,
  registerUser,
} from "../controller/authController.js";
import {
  createCar,
  getRides,
  rentCar,
  updateRent,
} from "../controller/carController.js";
import { authenticateAdmin, authenticateUser } from "../middleware/index.js";

const router = Router();

router.use("/create", authenticateAdmin, createCar);

router.use("/get-rides", getRides);
router.use("/rent", authenticateUser, rentCar);
router.use("/update-rent-history", authenticateAdmin, updateRent);

export default router;
