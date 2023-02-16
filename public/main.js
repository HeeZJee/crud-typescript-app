"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const cats_1 = require("./src/cats");
const getRequestBody_1 = require("./utils/getRequestBody");
const host = "localhost";
const port = 3000;
const filePath = __dirname + "/utils/data/cats.json";
const requestListener = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield getRequestBody_1.getRequestBody(req);
        const data = cats_1.CatsRoute(req, body, filePath);
        data.then((result) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify(result));
            res.end();
        });
    });
};
const server = http_1.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
