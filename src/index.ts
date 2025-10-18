import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { config } from "./config/env";
import { connectDB } from "./config/db";
import { debugMorgan } from "./utils/debbbuger";
import { Request} from "express";


const app = express();

app.use(cors());
app.use(express.json());

morgan.token('body', (req) => {
    const expressReq = req as Request;
    return JSON.stringify(expressReq.body);
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

