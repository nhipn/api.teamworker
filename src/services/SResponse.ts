import  {Response } from "express";
import Constant from "../constants/Constant";
export enum ReponseStatus {
  "OK",
  "Forbidden",
  "Not_Found",
  "Internal_Server_Error",
  "Unauthorized",
}
const statuses = [200, 403, 404, 500, 401];
type ResponseType={
    status:string;
    status_code:number;
    message:string;
    language:string;
    language_code:number;
    data:object;
}
export default class SResponse {
  public static getResponse(
    status: ReponseStatus = ReponseStatus.OK,
    data: unknown,
    message:string="",
    language:number=0,
    res:Response
  ) {
    const re:ResponseType={
        status:ReponseStatus[status].replace('_',' '),
        status_code: statuses[status],
        message:message,
        language:Constant.languages[language>2||language<0?0:language].name,
        language_code:language>2||language<0?0:language,
        data:data?data as object: {}
    }
    res.status(statuses[status]).json(re);
  }
}
