import { Request, Response } from "express";
import { GetOtpRequestDTO } from "../../../application/dto/request-getOtp-dto";
import { ValidateOtpRequestDTO } from "../../../application/dto/request-validateOtp-dto";
import { GetOtpResponseDTO } from "../../../application/dto/response-getOtp-dto";
import { GenerateOtpUseCase } from "../../../application/use-cases/generate-otp-us";
import { ValidateTokenOtpUseCase } from "../../../application/use-cases/validate-otp-us";

export class OtpController {
  constructor(
    private generateOtpUS: GenerateOtpUseCase,
    private validateOtpUS: ValidateTokenOtpUseCase
  ) {}

  async getOtp(req: Request, res: Response) {
    try {
      const { userId } = req.body; // pega apenas o userId
      if (!userId) return res.status(400).json({ error: "userId obrigatório" });

      const requestDto: GetOtpRequestDTO = { userId };
      const token = await this.generateOtpUS.execute(requestDto.userId);

      const responseDto: GetOtpResponseDTO = {
        userId: requestDto.userId,
        token,
      };

      res.json(responseDto);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  async validateOtp(req: Request, res: Response) {
    try {
      const requestDto: ValidateOtpRequestDTO = req.body;

      if (!requestDto.userId || !requestDto.token) {
        return res
          .status(400)
          .json({ error: "userId e token são obrigatórios" });
      }

      const isValid = await this.validateOtpUS.execute(
        requestDto.userId,
        requestDto.token
      );

      if (!isValid) {
        return res.status(400).json({ error: "token inválido!" });
      }

      return res.status(200).json({ status: "ok" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
}
