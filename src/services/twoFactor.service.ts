import crypto from "crypto";
import { config } from "../config/env";

export const generate2FACode = () => {
    const code = crypto.randomInt(100000, 1000000);
    return code.toString();
}

export const get2FAExpirationTime = (minutesToExpire = config.twoFAExpirationMinutes) => {
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + minutesToExpire)
    return expirationTime;
}

export const is2FAExpired = (expirationTime: Date) => {
    const now = new Date();
    return now > expirationTime;
}

export const verify2FACode = (inputCode: string, storedCode: string, expirationTime: Date) => {

    // First, check if the codes is expired
    if(is2FAExpired(expirationTime)){
        return {
            isValid: false,
            message: "Invalid or expired 2FA code"
        }
    }

    // Second, check if the codes match
    if(inputCode !== storedCode){
        return {
            isValid: false,
            message: "Invalid or expired 2FA code"
        }
    }

    return {
        isValid: true,
        message: "2FA code valid"
    }
}