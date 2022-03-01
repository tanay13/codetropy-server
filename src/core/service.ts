import { IConfig, IReturnObject } from "../interface";
import RedisSetup from "../redis";

class Service {
  redisInit: RedisSetup;

  constructor(config: IConfig) {
    this.redisInit = new RedisSetup(config.dbConfig);
  }

  async setStat(filename: string, value: number): Promise<IReturnObject> {
    // DB call
    let prevVal = await this.redisInit.getValue(filename);
    let prevTotal = await this.redisInit.getValue("total");
    let prevValInt;
    let prevTotalInt = 0;

    let totalData: string;

    if (prevVal != null) {
      prevValInt = parseInt(prevVal);
    } else {
      prevValInt = 0;
    }

    if (prevTotal != null) prevTotalInt = parseInt(prevTotal);

    if (prevValInt < value) {
      let increament = value - prevValInt;
      totalData = await this.redisInit.setValue(
        "total",
        prevTotalInt + increament
      );
    } else {
      let decreament = prevValInt - value;
      totalData = await this.redisInit.setValue(
        "total",
        prevTotalInt - decreament
      );
    }

    console.log("Values written in key ['Total']");

    const response = await this.redisInit.setValue(filename, value);

    console.log(`Values written in key[${filename}]`);

    return {
      total: totalData,
      fileName: filename,
      value: value,
    };
  }

  getStat(fileName: string): Promise<string | null> {
    return this.redisInit.getValue(fileName);
  }
}

export default Service;
