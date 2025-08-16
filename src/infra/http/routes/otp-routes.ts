import { Router } from "express";
import { OtpController } from "../controller/otp-controller";

const router = Router();

export default (otpController: OtpController) => {
  router.post("/otp", (req, res) => otpController.getOtp(req, res));
  router.post("/otp/validate", (req, res) =>
    otpController.validateOtp(req, res)
  );
  return router;
};
