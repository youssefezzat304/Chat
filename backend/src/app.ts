import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import Controller from "../utils/interfaces/controller.interface";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { erroMiddleware } from "../middlewares/errorHandler.middleware";
import deserializeUser from "../middlewares/deserializeUser.middleware";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
  methods: "GET,POST,PUT,DELETE,PATCH",
};

class App {
  public express: Application;
  public port: number;
  // public server: http.Server<
  //   typeof http.IncomingMessage,
  //   typeof http.ServerResponse
  // >;
  // public io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

  constructor(port: number, controllers: Controller[]) {
    this.express = express();
    this.port = port;
    // this.server = http.createServer(this.express);
    // this.io = new Server(this.server);
    
    this.initialiseMiddleware();
    this.initialiseDatabaseConnection();
    this.initialiseControllers(controllers);
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
  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
  }
  private initialiseErrorHandler(): void {
    this.express.use(erroMiddleware);
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Server is ONLINE on port: ${this.port}`);
    });
  }
}

export default App;
