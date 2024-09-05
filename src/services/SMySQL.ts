import * as mysql from "mysql2";
import dotenv from "dotenv";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import SLog, { LogType } from "./SLog";

export default class SMySQL {
  private static connection: Connection;

  private static init() {
    if (!this.connection) {
      dotenv.config();
      const port: number = +(process.env.MYSQL_PORT || 3306);
      const user = process.env.MYSQL_USER || "root";
      const password = process.env.MYSQL_PASSWORD || "";
      const database = process.env.MYSQL_DATABASE || "teamworker";

      this.connection = mysql.createConnection({
        user: user,
        password: password,
        database: database,
        port: port,
      });

      // SLog.log(LogType.Info, "init sql", "check parameters", {
      //   user: user,
      //   password: password,
      //   database: database,
      //   port: port,
      // });
    }
  }

  public static connect(
    onSuccess: () => void = () => {},
    onFailure: () => void = () => {},
    onComplete: () => void = () => {}
  ) {
    this.init();
    this.connection.connect((err) => {
      if (!err) {
        onSuccess();
        onComplete();

        SLog.log(LogType.Info, "connect", "connected to mysql");
      } else {
        onFailure();
        onComplete();

        SLog.log(LogType.Error, "connect", "can not connect to mysql", err);
      }
    });
  }
}
