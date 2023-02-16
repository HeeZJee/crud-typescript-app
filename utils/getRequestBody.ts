import { IncomingMessage } from "http";
import { ICat } from "../src/cats/cats";

export const getRequestBody = (req: IncomingMessage) => {
  return new Promise((resolve) => {
    let data: string = "";
    req.on("data", (chunk) => {
      data = chunk
    });
    req.on("end", () => {
      return resolve(JSON.parse(data));
    });
    req.on("error", (err) => {
      return resolve(err);
    });
  }); 
};
