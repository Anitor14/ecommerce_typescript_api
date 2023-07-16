import express, { NextFunction, Request, Response, Express } from "express";
import http from "http";
import Logging from "./src/library/logging";
import cors from "cors";
import dotenv from "dotenv";
import { DataSource } from "typeorm";

const app: Express = express();

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: 5432,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  entities: [],
  synchronize: true,
});

const port = process.env.PORT || 8000;

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

  // Cors
  app.use(cors());

  // Routes

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
