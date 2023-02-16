import { createServer, IncomingMessage, ServerResponse, request } from "http";
import { CatsRoute as Cats } from "./src/cats";
import { getRequestBody } from "./utils/getRequestBody";
import { ICat } from "./src/cats/cats";

const host: string = "localhost";
const port: number = 3000;
const filePath: string = __dirname + "/utils/data/cats.json";

const requestListener = async function (
  req: IncomingMessage,
  res: ServerResponse
) {
  console.log(req.method, req.url);

  const body: ICat = (await getRequestBody(req)) as ICat;
  const data = Cats(req, body, filePath);

  data.then((result) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(result));
    res.end();
  });
};

const server = createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
