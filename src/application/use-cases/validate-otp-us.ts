export interface ValidateTokenOtpUseCase {
  execute(userId: string, otp: string): Promise<boolean>;
}