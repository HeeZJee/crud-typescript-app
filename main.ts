import { createServer, IncomingMessage, ServerResponse, request } from "http";
import { CatsRoute as Cats } from "./src/cats";

const host: string = "localhost";
const port: number = 3000;
const filePath: string = __dirname + "/utils/cats.json";

const requestListener = function (req: IncomingMessage, res: ServerResponse) {
  console.log("url", req.url);

  const data = Cats(req.url, filePath);

    data.then((result) => {
      console.log("result", result);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(JSON.stringify(result));
      res.end();
    });
};

const server = createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
