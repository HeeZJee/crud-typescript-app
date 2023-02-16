import { IncomingMessage, ServerResponse } from "http";
import { CatsController } from "./cats.controller";

export const CatsRoute = async function (
  url: string | undefined,
  data: string
) {
  const catsInstance = new CatsController(data);
  switch (url) {
    case "/cats":
      return catsInstance.getCats();
    case "/cats/add":
        // return catsInstance.addCat();
    default:
      return `<h1>${JSON.stringify({ message: "Hello World!" })}</h1>`;
      break;
  }
};
