import express, { NextFunction, Request, Response, Express } from "express";
import http from "http";
import Logging from "./src/library/logging";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { DataSource } from "typeorm";
import { User } from "./user/entity";
import { AuthRouter } from "./auth/router";
import { UserRouter } from "./user/router";

const app: Express = express();

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: 5432,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  entities: [User],
  synchronize: true,
});

const port = process.env.PORT || 3000;

const StartServer = () => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    Logging.info(
      `Incomming ==> Method : [${req.method}] - IP: [${req.socket.remoteAddress}]`
    );
    res.on("finish", () => {
      // Log the Response
      Logging.info(
        `Incomming ==> Method : [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - status: [${res.statusCode}]`
      );
    });
    next();
  });

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.JWT_SECRET)); // enables us to have access to cookies in the req.cookies.

  app.use(express.static("./public")); // this would make the public folder available.

  app.use(fileUpload());

  // Cors
  app.use(cors());

  // Routes
  app.use("/api", AuthRouter);
  app.use("/api/users", UserRouter);
  // Health check
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.json({ status: "UP 🔥🔧🎂" }).status(200);
  });

  // Invalid url error handling
  app.use((req: Request, res: Response) => {
    const _error = new Error("Url not found 😟");
    Logging.error(_error);
    return res.json({ message: _error.message }).status(400);
  });

  http
    .createServer(app)
    .listen(port, () => Logging.info(`Server is running on port ${port} 🔥🔧`));
};
app.use((req: Request, res: Response, next: NextFunction) => {
  Logging.info(
    `Incomming ==> Method : [${req.method}] - IP: [${req.socket.remoteAddress}]`
  );
  res.on("finish", () => {
    // Log the Response
    Logging.info(
      `Incomming ==> Method : [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - status: [${res.statusCode}]`
    );
  });
  next();
});

AppDataSource.initialize()
  .then(() => {
    Logging.info(`Database connected 🎂`);
    StartServer();
  })
  .catch((_error) => {
    Logging.error("Error while connecting to Database ===> ");
    Logging.error(_error);
  });
