import { GetOtpRequestDTO } from "../../../application/dto/request-getOtp-dto";
import { GetOtpResponseDTO } from "../../../application/dto/response-getOtp-dto";
import { GenerateOtpUseCase } from "../../../application/use-cases/generate-otp-us";
import { GenerateOtpToken } from "../../../application/use-cases/impl/generate-otp-impl";
import { UserAuthRepositoryUseCase } from "../../../application/use-cases/user-auth-repository-us";
import { UserAuthRepositoryImpl } from "../../db/repositories/user-auth-repository-impl";
import { Request, Response } from "express";

const userAuthRepository: UserAuthRepositoryUseCase =
  new UserAuthRepositoryImpl();
const generateOtp: GenerateOtpUseCase = new GenerateOtpToken(
  userAuthRepository
);


export class OtpController {
  async getOtp(req: Request, res: Response) {
    try {
      const requestDto: GetOtpRequestDTO = { userId: req.params.userId };
      const token = await generateOtp.execute(requestDto.userId);

      const responseDto: GetOtpResponseDTO = {
        userId: requestDto.userId,
        token,
      };

      res.json(responseDto);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
}
