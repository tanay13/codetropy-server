import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

import RedisSetup from "./redis";
import { IReturnObject } from "./interface";
import Service from "./core/service";

const dbConfig = {
  host: "127.0.0.1",
  port: 6379,
};

const service = new Service({
  dbConfig,
});

app.get("/", (_, res: Response) => {
  res.json({
    message: "Alive",
  });
});

app.post("/data", async (req: Request, res: Response) => {
  const data: IReturnObject = req.body;
  const dataToSend = await service.setStat(data.fileName, data.value);
});

app.listen(8080, () => {
  console.log("Server running");
});
