import { UserAuthRepositoryUseCase } from "../user-auth-repository-us";
import { ValidateTokenOtpUseCase } from "../validate-otp-us";
import { totp } from "otplib";

export class ValidateOtpToken implements ValidateTokenOtpUseCase{
    constructor(private userRepository: UserAuthRepositoryUseCase){
        totp.options = { digits: 6, step: 30 };
    }
    
    async execute(userId: string, otp: string): Promise<boolean> {
        const seed = await this.userRepository.getSeedByUserId(userId);

        if(!seed){
            throw new Error("Usuário não encontrado.");
        }

        return this.validateOtp(seed, otp);
    }

    private validateOtp(seed: string, token: string): boolean{
        return totp.check(token, seed);
    }
    
}