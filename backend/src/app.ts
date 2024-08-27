import express, { Application, Router } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { erroMiddleware } from "../middlewares/errorHandler.middleware";
import deserializeUser from "../middlewares/deserializeUser.middleware";
import { config } from "dotenv";
import { SocketHandler } from "../utils/interfaces/interface";
import createMessageSocketHandler from "../routes/message/message.socket";

config();

const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
  methods: "GET,POST,PUT,DELETE,PATCH",
};

const expressApp: Application = express();
const port = Number(process.env.PORT) || 3000;
const server = http.createServer(expressApp);
const io = new Server(server, {
  cors: corsOptions,
});

const messagesSocketHandler = createMessageSocketHandler(io);
const socketHandlers = [messagesSocketHandler];

const initialiseMiddleware = (): void => {
  expressApp.use(cors(corsOptions));
  expressApp.use(express.json());
  expressApp.use(cookieParser());
  expressApp.use(helmet());
  expressApp.use(compression());
  expressApp.use(morgan("dev"));
  expressApp.use(deserializeUser);
};

const initialiseDatabaseConnection = (): void => {
  const dbConnection = process.env.DATABASE_CONNECTION;
  if (!dbConnection) {
    throw new Error("DATABASE_CONNECTION environment variable is not set");
  }
  mongoose
    .connect(dbConnection)
    .then(() => console.log("Database is ONLINE"))
    .catch((error) => {
      console.error("Database connection error:", error);
      process.exit(1);
    });
};

const initializeSocketConnection = (
  io: Server,
  handlers: SocketHandler[],
): void => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected", socket.id);

    handlers.forEach((handler) => {
      handler.registerEvents(socket);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

const initialiseControllers = (controllers: Router[]): void => {
  controllers.forEach((controller: Router) => {
    expressApp.use("/api", controller);
  });
};

const initialiseErrorHandler = (): void => {
  expressApp.use(erroMiddleware);
};

const listen = (): void => {
  server.listen(port, () => {
    console.log(`Server is ONLINE on port: ${port}`);
  });
};

const initializeApp = (controllers: Router[]): void => {
  initialiseMiddleware();
  initialiseDatabaseConnection();
  initialiseControllers(controllers);
  initializeSocketConnection(io, socketHandlers);
  initialiseErrorHandler();
};

export {
  expressApp,
  server,
  io,
  initialiseMiddleware,
  initialiseDatabaseConnection,
  initializeSocketConnection,
  initialiseControllers,
  initialiseErrorHandler,
  listen,
  initializeApp,
};
