/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints de autenticación y gestión de usuarios
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with email, password, and name. The email must be unique.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserExistsError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerInternalError'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates a user with email and password, returns a JWT token valid for 24 hours.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login success and 2FA code sent to your email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       409:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotFoundError'
 *       401:
 *         description: Account is locked
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccountLockedError'
 *       423:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidCredentialsError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerInternalError'
 */

/**
 * @swagger
 * /api/v1/auth/verify-2fa:
 *   post:
 *     summary: Verify 2FA code
 *     description: Verifies the 2FA code sent to the user's email.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyCodeRequest'
 *     responses:
 *       200:
 *         description: 2FA verification successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VerifyCodeResponse'
 *       409:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotFoundError'
 *       401:
 *         description: Invalid or expired 2FA code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Failed2FACodeError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerInternalError'
 */