import { Response } from "express";
import Service from "../core/service";

export default function sendData(
  teamname: string,
  res: Response,
  service: Service
) {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  setInterval(async () => {
    const dataToSend = await service.getStat(teamname, "total");
    const data = `data: ${dataToSend[0]}\n\n`;
    res.write(data);
  }, 3000);
}
