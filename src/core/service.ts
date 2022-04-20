import { IConfig, IReturnObject } from "../interface";
import RedisSetup from "../redis";

class Service {
  redisInit: RedisSetup;

  constructor(config: IConfig) {
    this.redisInit = new RedisSetup(config.dbConfig);
  }

  async setStat(
    teamname: string,
    filename: string,
    value: number
  ): Promise<IReturnObject> {
    // DB call
    let prevVal = await this.redisInit.getValue(teamname, filename);

    let prevTotal = await this.redisInit.getValue(teamname, "total");

    let prevValInt;
    let prevTotalInt = 0;

    let totalData: string;

    if (prevVal[0] != null) {
      prevValInt = parseInt(prevVal[0]);
    } else {
      prevValInt = 0;
    }

    if (prevTotal[0] != null) prevTotalInt = parseInt(prevTotal[0]);

    if (prevValInt < value) {
      let increament = value - prevValInt;
      totalData = await this.redisInit.setValue(
        teamname,
        "total",
        prevTotalInt + increament
      );
    } else {
      let decreament = prevValInt - value;
      totalData = await this.redisInit.setValue(
        teamname,
        "total",
        prevTotalInt - decreament
      );
    }

    console.log("Values written in key ['Total']");

    const response = await this.redisInit.setValue(teamname, filename, value);

    console.log(`Values written in key[${filename}]`);

    return {
      total: totalData,
      fileName: filename,
      value: value,
    };
  }

  getStat(teamname: string, fileName: string): Promise<string[]> {
    return this.redisInit.getValue(teamname, fileName);
  }
}

export default Service;
