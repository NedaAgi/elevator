import express, { Request, Response } from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected to WebSocket");

  ws.on("message", (message: string) => {
    console.log(`Received: ${message}`);
    ws.send(`You sent: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected from WebSocket");
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, WebSocket!");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
