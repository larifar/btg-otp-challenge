import { UserAuthRepositoryUseCase } from "../../../application/use-cases/user-auth-repository-us";
import UserAuth from "../../../domain/entities/user-auth";
import database from "../database";

export class UserAuthRepositoryImpl implements UserAuthRepositoryUseCase {
  async getSeedByUserId(userId: string): Promise<string | null> {
    const result = await database.query(
      "SELECT seed FROM user_auth WHERE id = $1",
      [userId]
    );
    return result.rows[0]?.seed || null;
  }

  async saveUser(userAuth: UserAuth): Promise<UserAuth> {
    await database.query(
      "INSERT INTO user_auth (id, seed) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET seed = EXCLUDED.seed",
      [userAuth.id, userAuth.seed]
    );
    return userAuth;
  }
}
