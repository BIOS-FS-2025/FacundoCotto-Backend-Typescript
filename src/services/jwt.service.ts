import { Payload } from "../types/user.types";
import jwt, { Secret } from "jsonwebtoken";
import { config } from "../config/env";
import { StringValue } from "ms";

const jwtSecret: Secret = config.jwtSecret as Secret;
const jwtRefreshSecret: Secret = config.jwtRefreshSecret as Secret;
const jwtExpiresIn: StringValue = config.jwtExpiresIn as StringValue;
const jwtRefreshExpiresIn: StringValue = "7d" as StringValue;

export const generateAccessToken = (payload: Payload) => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiresIn || "10h",
    issuer: "mytasks-api",
    audience: "mytasks-users",
  });
};

export const generateRefreshToken = (payload: Payload) => {
  return jwt.sign({ userId: payload.userId }, jwtRefreshSecret, {
    expiresIn: jwtRefreshExpiresIn || "7d",
    issuer: "mytasks-api",
    audience: "mytasks-users",
  });
};

export const extractTokenFromHeader = (
  authHeader: string | undefined
): string | null => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  return authHeader.split(" ")[1];
};

export const verifyAccessToken = (token: string): Payload => {
  const bodyToken = {
    issuer: "mytasks-api",
    audience: "mytasks-users",
  };

  try {
    try {
      return jwt.verify(token, jwtSecret, bodyToken) as Payload;
    } catch (error) {
      return jwt.verify(token, jwtRefreshSecret, bodyToken) as Payload;
    }
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid token");
    } else {
      throw new Error("Token verification failed");
    }
  }
};
