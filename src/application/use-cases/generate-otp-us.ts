export interface GenerateOtpUseCase {
  execute(userId: string): Promise<string>; 
}