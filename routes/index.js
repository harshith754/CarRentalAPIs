import { Router } from "express";

import AuthRoutes from "./authRoutes.js";
import CarRoutes from "./carRoutes.js";
const router = Router();

router.use("/api/auth", AuthRoutes);
router.use("/api/car", CarRoutes);

export default router;
