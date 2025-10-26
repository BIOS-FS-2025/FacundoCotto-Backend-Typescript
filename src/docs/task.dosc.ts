/**
 * @swagger
 * /api/v1/tasks/create:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Create a new task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskRequest'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateTaskResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidTokenError'
 */

/**
 * @swagger
 *  /api/v1/tasks/{userId}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get all tasks for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of tasks per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *         description: Sort order (asc or desc)
 *       - in: query
 *         name: dueDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter tasks by due date
 *       - in: query
 *         name: priority
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Filter tasks by priority
 *       - in: query
 *         name: subject
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Filter tasks by subject
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filter tasks by completion status
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for filtering tasks
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllTasksResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidTokenError'
 *       404:
 *         description: No tasks found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TasksNotFoundError'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerInternalError'
 * 
 */

/**
 * @swagger
 * /api/v1/tasks/id/{id}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get a task by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTaskResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidTokenError'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskNotFoundError'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerInternalError'
 */

/**
 * @swagger
 * /api/v1/tasks/edit/{id}:
 *   put:
 *     tags:
 *       - Tasks
 *     summary: Edit a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditTaskRequest'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EditTaskResponse'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskNotFoundError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidTokenError'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerInternalError'
 *
 */

/**
 * @swagger
 * /api/v1/tasks/delete/{id}:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Delete a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteTaskResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidTokenError'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerInternalError'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskNotFoundError'
 */
