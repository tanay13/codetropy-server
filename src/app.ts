import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { IReturnObject } from "./interface";
import Service from "./core/service";
import sendData from "./utility";
const app = express();

import { run } from "./core/database/";
import { ifTeam, saveTeam } from "./core/database/service";

run()
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

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

app.get("/stream/:teamname", (req, res: Response) => {
  const teamname = req.params.teamname;

  sendData(teamname, res, service);
});

app.post("/data/:teamName", async (req: Request, res: Response) => {
  const data: IReturnObject = req.body;
  const teamname = req.params.teamName;
  const dataToSend = await service.setStat(teamname, data.fileName, data.value);
  console.log(data);
  console.log(dataToSend);
});

app.get("/findTeam/:teamName", async (req, res) => {
  const teamName = req.params.teamName;

  const response = await ifTeam(teamName);

  res.json({
    response,
  });
});

app.post("/saveTeam", async (req, res) => {
  const teamName = req.body.team;

  await saveTeam(teamName);

  res.json({
    response: "success",
  });
});

app.listen(8080, () => {
  console.log("Server running");
});
