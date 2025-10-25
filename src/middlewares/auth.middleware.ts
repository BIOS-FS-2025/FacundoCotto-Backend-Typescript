
import { NextFunction } from "express";
import { extractTokenFromHeader, verifyAccessToken } from "../services/jwt.service";
import { ERRORS } from "../config/env";
import { Request, Response } from "express";
import { User } from '../models/user.model';



export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        // console.log("Authorization Header: ", authHeader);
        const token = extractTokenFromHeader(authHeader);
        // console.log("Extracted Token: ", token);

        if(!token){
            return res.status(400).json({success: false, message: "Authorization header missing or invalid", error: ERRORS.UNAUTHORIZED },  );
        }

        let decoded;

        try {
            decoded = verifyAccessToken(token);
        }catch (tokenError: any) {
            return res.status(401).json({success: false, message: tokenError.message, error: ERRORS.UNAUTHORIZED },  );
        }

        const user = await User.findOne({ _id: decoded.userId }, { projection: { password: 0, twoFactorCode: 0, twoFactorExpires: 0 } });

        if(!user){
            return res.status(404).json({success: false, message: "User not found", error: ERRORS.NOT_FOUND },  );
        }

        if(!user.isVerified){
            return res.status(403).json({success: false, message: "User not verified", error: ERRORS.USER_NOT_VERIFIED },  );
        }

        req.user = user;
        req.userId = user._id.toString();

        next();
    }catch (error: any) {
        return res.status(500).json({success: false, message: "Internal server error", error: ERRORS.SERVER_ERROR },  );
    }
}