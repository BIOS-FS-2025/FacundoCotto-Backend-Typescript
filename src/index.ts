import express from "express";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { config } from "./config/env";
import { connectDB } from "./config/db";
import { debugMorgan } from "./utils/debbbuger";
import { Request} from "express";
import { swaggerSpec } from "./config/swagger";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none; }',
  customSiteTitle: 'Posts API Documentation'
})) 

app.use("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

morgan.token('body', (req: Request) => {
    return JSON.stringify(req.body);
});

if (process.env.NODE_ENV === 'development') {
    app.use(morgan(debugMorgan as any));
}


app.use("/api/v1/auth", authRoutes);

const startServer = async () => {
    // Database connection
    await connectDB();

    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
};

startServer();

