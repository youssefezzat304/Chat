import express, { Application } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { Controller, SocketHandler } from "../utils/interfaces/interface";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { erroMiddleware } from "../middlewares/errorHandler.middleware";
import deserializeUser from "../middlewares/deserializeUser.middleware";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { MessageSocket } from "../routes/message/message.socket";

const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
  methods: "GET,POST,PUT,DELETE,PATCH",
};

class App {
  public express: Application;
  public port: number;
  public server: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;
  public io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

  constructor(port: number, controllers: Controller[]) {
    this.express = express();
    this.port = port;
    this.server = http.createServer(this.express);
    this.io = new Server(this.server, {
      cors: corsOptions,
      // cors: {
      //   origin: "http://localhost:8080",
      //   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      //   allowedHeaders: ["my-custom-header"],
      //   credentials: true,
      // },
    });

    const messageSocket = new MessageSocket(this.io);

    this.initialiseMiddleware();
    this.initialiseDatabaseConnection();
    this.initialiseControllers(controllers);
    this.initializeSocketConnection([messageSocket]);
    this.initialiseErrorHandler();
  }

  private initialiseMiddleware(): void {
    this.express.use(cors(corsOptions));
    this.express.use(express.json());
    this.express.use(cookieParser());
    this.express.use(helmet());
    this.express.use(compression());
    this.express.use(morgan("dev"));
    this.express.use(deserializeUser);
  }
  private initialiseDatabaseConnection(): void {
    mongoose
      .connect(
        "mongodb+srv://joussef3044:17100772@chatapp.idrqc.mongodb.net/?retryWrites=true&w=majority&appName=Chatapp"
      )
      .then(() => console.log("Database is ONLINE"));
  }
  private initializeSocketConnection(socketHandlers: SocketHandler[]) {
    this.io.on("connection", (socket: Socket) => {
      console.log("A user connected", socket.id);

      socketHandlers.forEach((handler) => {
        handler.registerEvents(socket);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }
  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
  }
  private initialiseErrorHandler(): void {
    this.express.use(erroMiddleware);
  }

  public listen(): void {
    this.server.listen(this.port, () => {
      console.log(`Server is ONLINE on port: ${this.port}`);
    });
  }
}

export default App;
