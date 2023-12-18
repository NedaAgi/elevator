import express, { Router, Request, Response, NextFunction } from "express";
import http from "http";
import WebSocket from "ws";
import { liftRoute } from "./routes/lift.routes";
import { LiftService } from "./services/lift.service";
import { HttpStatus } from "./enums/httpStatus.enum";
import { CustomError } from "./utils/customError.util";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// TODO: resolve Websocket connections
wss.on("connection", (ws) => {
  console.log("Client connected to WebSocket");

  ws.on("close", () => {
    console.log("Client disconnected from WebSocket");
  });
});

const broadcast = (data: any) => {
  wss.clients.forEach((client) => client.send(data));
};

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, WebSocket!");
});

const liftService = new LiftService(broadcast);

const router = Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", liftRoute(router, liftService));

app.use((_req: Request, res: Response) => {
  throw new CustomError(HttpStatus.NOT_FOUND, "Not Found: Endpoint not found");
});

// Error handler for bad requests
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof CustomError) {
    return res.status(error.status).send(error.message);
  }

  res.status(HttpStatus.INTERNAL_SERVER).send(error.message);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
