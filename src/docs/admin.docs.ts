/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Endpoints for admin user management
 */

/**
 * @swagger
 * /api/v1/admin/create-user:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user account with email, password, and name. The email must be unique.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *       - roles: [admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserResponse'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
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
 * /api/v1/admin/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users in the system.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *       - roles: [admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetAllUsersResponse'
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllUsersResponse'
 *       404:
 *         description: No users found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoUsersFoundError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerInternalError'
 */

/**
 * @swagger
 * /api/v1/admin/update-user/{id}:
 *   put:
 *     summary: Update user information
 *     description: Updates the information of an existing user.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *       - roles: [admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserResponse'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateUserResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotFoundError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerInternalError'
 */

/**
 * @swagger
 * /api/v1/admin/delete-user/{id}:
 *   delete:
 *     summary: Delete user information
 *     description: Deletes an existing user.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *       - roles: [admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteUserResponse'
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteUserResponse'
 *       403:
 *         description: Cannot delete admin users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteAdminUserError'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotFoundError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerInternalError'
 */