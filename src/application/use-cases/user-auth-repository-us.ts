import UserAuth from "../../domain/entities/user-auth";

export interface UserAuthRepositoryUseCase {
  getSeedByUserId(userId: string): Promise<string | null>;
  saveUser(userAuth: UserAuth): Promise<UserAuth>;
}
