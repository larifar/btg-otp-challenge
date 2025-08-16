// @ts-ignore
import swaggerJSDoc from "swagger-jsdoc";
// @ts-ignore
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API OTP",
      version: "1.0.0",
      description: "Documentação das rotas de OTP",
    },
  },
  apis: ["./src/infra/http/routes/*.ts", "./src/infra/http/controllers/*.ts"], // onde você coloca comentários JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
