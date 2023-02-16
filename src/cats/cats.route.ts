import { IncomingMessage, ServerResponse } from "http";
import { CatsController } from "./cats.controller";
import { ICat } from "./cats";

export const CatsRoute = async function (
  req: IncomingMessage,
  body: ICat,
  data: string
) {
  const catsInstance = new CatsController(data);
  const id: number = body.id as number;

  if (req.url == "/cats") {
    switch (req.method) {
      case "GET":
        return catsInstance.getCats();
      case "POST":
        return catsInstance.addCat(body);
      case "PUT":
        return catsInstance.updateCat(id, body);
      case "DELETE":
        return catsInstance.deleteCat(id);
      default:
        return { message: "Not Found" };
    }
  } else {
    return { message: "Not Found" };
  }
};
