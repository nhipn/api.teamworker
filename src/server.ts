import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import SLog, { LogType } from "./services/SLog";
import SMySQL from "./services/SMySQL";

dotenv.config(); // doc bien moi truong

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("nq");
});

app.get("/nq", (req: Request, res: Response) => {
  res.send("pn");
});
app.get("/LeMinhTri", (req: Request, res: Response) => {
  res.send("LeVietKhanh");
});

app.listen(port, () => {
  SLog.log(
    LogType.Info,
    "Listen",
    "server is running at http://localhost",
    port
  );
});
// goi mysql server de chay na
SMySQL.connect();
