import { Response, Request } from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import reactRenderer from "../../common/_utils/ReactRenderer";
import axios from "axios";
import pretty from "pretty";
import Posts from "../../common/pages/Home/Posts";
import Post from "../../common/pages/Detail/Post";

const BlogController = {
  index: async (req: Request, res: Response) => {
    const $ = reactRenderer(req.url);

    try {
      const resData = await axios.get(
        "https://limitless-forest-49003.herokuapp.com/posts"
      );
      const data = resData.data;

      if (req.xhr) {
        return res.status(200).json({
          msg: "Data found",
          data,
        });
      } else {
        const html = ReactDOMServer.renderToString(<Posts data={data} />);

        $(".posts-data").html(html);
        return res.send(pretty($.html()));
      }
    } catch (err) {
      if (req.xhr) {
        return res.status(400).json({
          msg: "Something went wrong!",
        });
      } else {
        return res.send(pretty($.html()));
      }
    }
  },
  show: async (req: Request, res: Response) => {
    const $ = reactRenderer(req.url);
    try {
      const { id } = req.params;
      const resData = await axios.get(
        `https://limitless-forest-49003.herokuapp.com/posts/${id}`
      );
      const data = resData.data;
      if (req.xhr) {
        return res.status(200).json({
          msg: "Data found",
          data: data,
        });
      } else {
        $("title").text(data.title);
        const html = ReactDOMServer.renderToString(<Post data={data} />);

        $(".post-data").html(html);
        return res.send(pretty($.html()));
      }
    } catch (err) {
      if (req.xhr) {
        return res.status(400).json({
          msg: "Something went wrong!",
        });
      } else {
        return res.send(pretty($.html()));
      }
    }
  },
  store: async (req: Request, res: Response) => {
    try {
      const resData = await axios.post(
        `https://limitless-forest-49003.herokuapp.com/posts`,
        req.body
      );
      return res.status(200).json({
        msg: "Success",
        data: resData.data,
      });
    } catch (err) {
      return res.status(400).json({
        msg: "Something went wrong!",
      });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const resData = await axios.put(
        `https://limitless-forest-49003.herokuapp.com/posts/${id}`,
        req.body
      );
      return res.status(200).json({
        msg: "Success",
        data: resData.data,
      });
    } catch (err) {
      return res.status(400).json({
        msg: "Something went wrong!",
      });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await axios.delete(
        `https://limitless-forest-49003.herokuapp.com/posts/${id}`
      );
      return res.status(200).json({
        msg: "Success",
      });
    } catch (err) {
      return res.status(400).json({
        msg: "Something went wrong!",
      });
    }
  },
};

export default BlogController;
