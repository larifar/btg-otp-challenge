import { Router } from "express";
import { OtpController } from "../controller/otp-controller";

const router = Router();
const controller = new OtpController();

router.post("/otp", (req, res) => controller.getOtp(req, res));
router.post("/otp/validate", (req, res) => controller.validateOtp(req, res));

export default router;