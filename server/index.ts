import express from "express";
import compression from "compression";
import { renderPage } from "vite-plugin-ssr";

const isProduction = process.env.NODE_ENV === "production";
const root = `${__dirname}/..`;

startServer();

async function startServer() {
  const app = express();

  app.use(compression());

  if (isProduction) {
    const sirv = require("sirv");
    app.use(sirv(`${root}/dist/client`));
  } else {
    const vite = require("vite");
    const { middlewares } = await vite.createServer({
      root,
      server: { middlewareMode: true },
    });
    app.use(middlewares);
  }

  app.get("*", async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) return next();
    const { body, statusCode, contentType } = httpResponse;
    res.status(statusCode).type(contentType).send(body);
  });

  const port = process.env.PORT || 3030;
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
