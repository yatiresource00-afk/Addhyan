import { createServer } from "node:http";
import { parse } from "node:url";
import next from "next";

const port = Number.parseInt(process.env.PORT ?? "43123", 10);
const hostname = process.env.HOST ?? "0.0.0.0";
const dev = process.env.NODE_ENV === "development";

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

await app.prepare();

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url ?? "/", true);
  handle(req, res, parsedUrl).catch((error) => {
    console.error(error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  });
});

server.listen(port, hostname, () => {
  console.log(
    `Addhyan Academy ready on http://${hostname === "0.0.0.0" ? "127.0.0.1" : hostname}:${port}`
  );
});
