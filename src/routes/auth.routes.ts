import {Router} from 'express';
import { validate } from '../middlewares/validate.middleware';
import { loginSchema, registerSchema, verify2FASchema } from '../schemas/auth.schema';
import { AuthController} from '../controllers/auth.controller';
import { UserRepository } from '../repositories/user.repository';
import { AuthService } from '../services/auth.service';

const router = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post("/verify-2fa", validate(verify2FASchema), authController.verify2FA);

export default router;