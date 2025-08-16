import { GenerateOtpUseCase } from "../generate-otp-us";
import { UserAuthRepositoryUseCase } from "../user-auth-repository-us";
import { randomBytes } from "crypto";
import { totp } from "otplib";

export class GenerateOtpToken implements GenerateOtpUseCase {
  constructor(private userRepository: UserAuthRepositoryUseCase) {
    totp.options = { digits: 6, step: 30 }; // 6 dígitos, expira a cada 30s
  }

  async execute(userId: string): Promise<string> {
    let seed = await this.userRepository.getSeedByUserId(userId);

    if (!seed) {
      const user = { id: userId, seed: this.generateSeed() };
      const createdUser = await this.userRepository.saveUser(user);
      seed = createdUser.seed;
    }

    return this.generateOtp(seed);
  }

  private generateSeed(): string {
    return randomBytes(16).toString("hex"); //cria seed 32 caracteres hex
  }

  private generateOtp(seed: string) {
    return totp.generate(seed);
  }
}
