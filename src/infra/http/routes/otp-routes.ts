import { Router } from "express";
import { OtpController } from "../controller/otp-controller";

const router = Router();

export default (otpController: OtpController) => {

/**
 * @swagger
 * /api/otp:
 *   post:
 *     summary: Gera um token OTP para o usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token gerado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 token:
 *                   type: string
 */
  router.post("/otp", (req, res) => otpController.getOtp(req, res));

  /**
 * @swagger
 * /api/otp/validate:
 *   post:
 *     summary: Valida um token OTP enviado pelo usuário
 *     description: Recebe o userId e o token e verifica se o OTP é válido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID do usuário
 *               token:
 *                 type: string
 *                 description: Token OTP gerado
 *             required:
 *               - userId
 *               - token
 *     responses:
 *       200:
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *       400:
 *         description: Dados inválidos ou token inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: token inválido!
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
  router.post("/otp/validate", (req, res) =>
    otpController.validateOtp(req, res)
  );
  return router;
};
