import express from "express";
import cors from "cors";
import createOtpRoutes from "../infra/http/routes/otp-routes";
import { setupSwagger } from "../infra/config/swagger";
import { UserAuthRepositoryImpl } from "../infra/db/repositories/user-auth-repository-impl";
import { GenerateOtpToken } from "../application/use-cases/impl/generate-otp-impl";
import { ValidateOtpToken } from "../application/use-cases/impl/validate-otp-impl";
import { OtpController } from "../infra/http/controller/otp-controller";

const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || "http://localhost";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

const userAuthRepository = new UserAuthRepositoryImpl();
const generateOtpUseCase = new GenerateOtpToken(userAuthRepository);
const validateOtpUseCase = new ValidateOtpToken(userAuthRepository);

const otpController = new OtpController(generateOtpUseCase, validateOtpUseCase);

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/api", createOtpRoutes(otpController));

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`);
});
