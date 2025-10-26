import swaggerJSDoc from "swagger-jsdoc";
import { config } from "./env";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend TypeScript App",
      version: "1.0.0",
      description:
        "API documentation for the Backend TypeScript Application for the Backend Project of Full Stack Developer Course.",
      contact: {
        name: "API Support",
        email: "facucottoalvarez@gmail.com",
      },
      license: {
        name: "ISC",
        url: "https://opensource.org/licenses/ISC",
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: "Development server",
      },
      {
        url: `https://api.yourdomain.com`,
        description: "Production Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token that you received after login",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The user's unique identifier",
              example: "609e125f5f1b2c0015b8e4b1",
            },
            email: {
              type: "string",
              format: "email",
              description: "The user's email address",
              example: "user@example.com",
            },
            name: {
              type: "string",
              description: "The user's name",
              example: "John Doe",
            },
            role: {
              type: "string",
              description: "The user's role",
              example: "user",
            },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["email", "name", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "The user's email address",
              example: "user@example.com",
            },
            name: {
              type: "string",
              description: "The user's name",
              example: "John Doe",
              minLength: 3,
              maxLength: 100,
            },
            password: {
              type: "string",
              description: "The user's password",
              example: "password123",
              minLength: 6,
            },
          },
        },
        RegisterResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Response message",
              example: "User registered successfully",
            },
            user: {
              $ref: "#/components/schemas/User",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "The user's email address",
              example: "user@example.com",
            },
            password: {
              type: "string",
              description: "The user's password",
              example: "password123",
              minLength: 6,
            },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Response message",
              example: "Login success and 2FA code sent to your email",
            },
            user: {
              $ref: "#/components/schemas/User",
              properties: {
                FAcode: {
                  type: "integer",
                  description: "2FA code sent to the user's email",
                  example: 159979,
                },
                FAexpires: {
                  type: "string",
                  format: "date-time",
                  description: "Expiration time of the 2FA code",
                  example: "2025-10-26T18:51:33.039Z",
                },
                message: {
                  type: "string",
                  description: "2FA code sent message",
                  example: "2FA code sent to your email",
                },
              },
            },
          },
        },
        VerifyCodeRequest: {
          type: "object",
          required: ["email", "code"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "The user's email address",
              example: "user@example.com",
            },
            code: {
              type: "string",
              description: "Verification code sent to the user's email",
              example: "123456",
            },
          },
        },
        VerifyCodeResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Response message",
              example: "Verification code sent to your email",
            },
            refreshToken: {
              type: "string",
              description: "JWT refresh token",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
            accessToken: {
              type: "string",
              description: "JWT access token",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
        Task: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The task's unique identifier",
              example: "60af924f4f1a256f88e4b2c3",
            },
            title: {
              type: "string",
              description: "The title of the task",
              example: "Complete the project documentation",
            },
            description: {
              type: "string",
              description: "Detailed description of the task",
              example:
                "Finish writing the API documentation for the new project",
            },
            completed: {
              type: "boolean",
              description: "Status of the task",
              example: false,
            },
            dueDate: {
              type: "string",
              format: "date-time",
              description: "The due date of the task",
              example: "2023-12-31T23:59:59.000Z",
            },
            priority: {
              type: "array",
              items: {
                type: "string",
                enum: ["low", "medium", "high"],
              },
              description: "Priority levels of the task",
              example: ["medium"],
            },
            subject: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "general",
                  "math",
                  "physics",
                  "chemistry",
                  "biology",
                  "science",
                  "history",
                  "language",
                  "art",
                  "music",
                  "physical_education",
                  "computer_science",
                  "other",
                ],
              },
              description: "Subjects associated with the task",
              example: ["general"],
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "The creation date of the task",
              example: "2023-10-01T12:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "The last update date of the task",
              example: "2023-10-05T15:30:00.000Z",
            },
          },
          required: [
            "id",
            "title",
            "description",
            "completed",
            "dueDate",
            "priority",
            "subject",
            "createdAt",
            "updatedAt",
          ],
        },
        CreateTaskRequest: {
          type: "object",
          required: ["title", "description"],
          properties: {
            title: {
              type: "string",
              description: "The title of the task",
              example: "Complete the project documentation",
            },
            description: {
              type: "string",
              description: "Detailed description of the task",
              example:
                "Finish writing the API documentation for the new project",
            },
            dueDate: {
              type: "string",
              format: "date-time",
              description: "The due date of the task",
              example: "2023-12-31T23:59:59.000Z",
            },
            priority: {
              type: "array",
              items: {
                type: "string",
                enum: ["low", "medium", "high"],
              },
              description: "Priority levels of the task",
              example: ["medium"],
            },
            subject: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "general",
                  "math",
                  "physics",
                  "chemistry",
                  "biology",
                  "science",
                  "history",
                  "language",
                  "art",
                  "music",
                  "physical_education",
                  "computer_science",
                  "other",
                ],
              },
              description: "Subjects associated with the task",
              example: ["general"],
            },
          },
        },
        CreateTaskResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Response message",
              example: "Task created successfully",
            },
            task: {
              $ref: "#/components/schemas/Task",
            },
          },
        },
        EditTaskRequest: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The task's unique identifier",
              example: "60af924f4f1a256f88e4b2c3",
            },
            title: {
              type: "string",
              description: "The title of the task",
              example: "Complete the project documentation",
            },
            description: {
              type: "string",
              description: "Detailed description of the task",
              example:
                "Finish writing the API documentation for the new project",
            },
            completed: {
              type: "boolean",
              description: "Status of the task",
              example: false,
            },
            dueDate: {
              type: "string",
              format: "date-time",
              description: "The due date of the task",
              example: "2023-12-31T23:59:59.000Z",
            },
            priority: {
              type: "array",
              items: {
                type: "string",
                enum: ["low", "medium", "high"],
              },
              description: "Priority levels of the task",
              example: ["medium"],
            },
            subject: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "general",
                  "math",
                  "physics",
                  "chemistry",
                  "biology",
                  "science",
                  "history",
                  "language",
                  "art",
                  "music",
                  "physical_education",
                  "computer_science",
                  "other",
                ],
              },
              description: "Subjects associated with the task",
              example: ["general"],
            },
          },
        },
        EditTaskResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Response message",
              example: "Task updated successfully",
            },
            editedTask: {
              $ref: "#/components/schemas/Task",
            },
          },
        },
        DeleteTaskResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Response message",
              example: "Task deleted successfully",
            },
            deletedTask: {
              $ref: "#/components/schemas/Task",
            },
          },
        },
        GetTaskResponse: {
          type: "object",
          properties: {
            task: {
              $ref: "#/components/schemas/Task",
            },
          },
        },
        GetAllTasksResponse: {
          type: "object",
          properties: {
            tasks: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Task",
              },
              description: "List of tasks",
            },
          },
        },
        UserExistsError: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
              example: "User already exists",
            },
          },
        },
        UserNotFoundError: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
              example: "User not found",
            },
            errors: {
              type: "array",
              description: "Details of validation errors",
              items: {
                type: "object",
                properties: {
                  path: {
                    type: "string",
                    example: "email",
                  },
                  message: {
                    type: "string",
                    example: "Email does not exist",
                  },
                },
              },
            },
          },
        },
        AccountLockedError: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
              example:
                "Account is locked due to multiple failed login attempts. Please try again in 15 minutes.",
            },
          },
        },
        InvalidCredentialsError: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
              example: "Invalid credentials",
            },
            errors: {
              type: "array",
              description: "Details of validation errors",
              items: {
                type: "object",
                properties: {
                  path: {
                    type: "string",
                    example: "email",
                  },
                  message: {
                    type: "string",
                    example: "Invalid email address",
                  },
                },
              },
            },
          },
        },
        Failed2FACodeError: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
              example: "Invalid or expired 2FA code",
            },
            errors: {
              type: "array",
              description: "Details of validation errors",
              items: {
                type: "object",
                properties: {
                  path: {
                    type: "string",
                    example: "code",
                  },
                  message: {
                    type: "string",
                    example: "Code must be 6 characters long",
                  },
                },
              },
            },
          },
        },
        ValidationError: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
              example: "Validation error",
            },
            errors: {
              type: "array",
              description: "Details of validation errors",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                    example: "email",
                  },
                  message: {
                    type: "string",
                    example: "Email is required",
                  },
                },
              },
            },
          },
        },
        TaskNotFoundError: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
              example: "Task not found",
            },
          },
        },
        TasksNotFoundError: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
              example: "No tasks found",
            },
            errors: {
              type: "array",
              description: "Details of validation errors",
            },
          },
        },
        InvalidTokenError: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
              example: "Invalid token",
            },
            errors: {
              type: "array",
              description: "Invalid token error details",
              items: {
                type: "object",
                properties: {
                  path: {
                    type: "string",
                    example: "token",
                  },
                  success: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "Invalid token",
                  },
                },
              },
            },
          },
        },
        ServerInternalError: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
              example: "Internal Server Error",
            },
            error: {
              type: "string",
              description: "Error details",
              example: "An unexpected error occurred on the server.",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [
          {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        ],
      },
    ],
    tags: [
      {
        name: "Authentication",
        description: "Endpoints of authentication and user management",
      },
      {
        name: "Tasks",
        description: "Endpoints for task management",
      },
    ],
  },
  apis: ["./src/docs/*.ts", "./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
