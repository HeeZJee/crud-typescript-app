import {
  createServer,
  IncomingMessage,
  ServerResponse,
  RequestOptions,
  request,
} from "http";

export default class httpRequest {

  public async get(options: RequestOptions) {
    return this._request(options);
  }

  private _request(options: RequestOptions) {
    console.log("options", options);
    return request(options, (res: IncomingMessage) => {
      console.log(`statusCode: ${res.statusCode}`);

      res.on("data", (d) => {
        console.log("data", d);
        process.stdout.write(d);
      });

      res.on("end", () => {
        console.log("end");
      });

      res.on("error", (e) => {
        console.error(e);
      });
    });
  }
}
