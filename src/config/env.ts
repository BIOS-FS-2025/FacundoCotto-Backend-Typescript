import dotenv from "dotenv";
import { jwt } from "zod";

dotenv.config();

export const config = {
  port: process.env.PORT ?? 3000,
  dbUri: process.env.DB_URI ?? "mongodb://localhost:27017/mongodb-ts-app",
  jwtSecret: process.env.JWT_SECRET ?? "default_secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? "default_refresh_secret",
  twoFAExpirationMinutes: Number(process.env.TWO_FA_EXPIRATON_MINUTES) ?? 10,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "10m",
  emailJsServiceId: process.env.EMAIL_JS_SERVICE_ID ?? "",
  emailJsUrl: process.env.EMAIL_JS_URL ?? "https://api.emailjs.com/api/v1.0/email/send",
  emailJsPublicKey: process.env.EMAIL_JS_PUBLIC_KEY ?? "",
  emailJsPrivateKey: process.env.EMAIL_JS_PRIVATE_KEY ?? "",
  emailJsWelcomeTemplateId: process.env.EMAIL_JS_WELCOME_TEMPLATE_ID ?? "",
  emailJsLoginTemplateId: process.env.EMAIL_JS_LOGIN_TEMPLATE_ID ?? "",
};

