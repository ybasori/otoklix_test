import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import cheerio from "cheerio";
import path from "path";
import fs from "fs";

import Common from "../../../common";

const reactRenderer = (url: string) => {
  const html = fs.readFileSync(path.resolve("index.html"));

  const $ = cheerio.load(html);

  $("#root").html(
    ReactDOMServer.renderToString(
      <StaticRouter location={url}>
        <Common />
      </StaticRouter>
    )
  );

  return $;
};

export default reactRenderer;
