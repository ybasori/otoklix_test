import express from "express";
import path from "path";

import reactRenderer from "../common/_utils/ReactRenderer";
import routes from "./routes";
import pretty from "pretty";

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});
app.use("/assets", express.static(path.resolve("public/assets")));

app.use("/", routes(express.Router()));

app.get("**", (req, res) => {
  const $ = reactRenderer(req.url);
  res.send(pretty($.html()));
});

app.listen(port, () => {
  console.log(`> ready on http://localhost:${port}`);
});
