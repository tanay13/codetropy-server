export interface IRedisObject {
  host: string;
  port: number;
}

export interface IReturnObject {
  total: string;
  fileName: string;
  value: number;
}

export interface IConfig {
  dbConfig: IRedisObject;
}

export interface ITeam {
  name: string;
}
