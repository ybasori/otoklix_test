import { Router } from "express";

import Blog from "./controllers/BlogController";

const web = (app: Router) => {
  app.get("/", Blog.index);
  app.post("/create", Blog.store);
  app.get("/:id", Blog.show);
  app.delete("/:id", Blog.delete);
  app.put("/:id/edit", Blog.update);

  return app;
};

export default web;
