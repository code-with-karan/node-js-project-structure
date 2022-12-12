import express from "express";
import PostController from '../controllers/post.controller';

export default class PostRouter {
  public router = express.Router();
  get controller() {
    return new PostController();
  }

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/", async (_req, res) => {
      const controller = new PostController();
      const response = await controller.getPosts();
      return res.send(response);
    });

    this.router.post("/", async (req, res) => {
      const controller = new PostController();
      const response = await controller.createPost(req.body);
      return res.send(response);
    });

    this.router.get("/:id", async (req, res) => {
      const controller = new PostController();
      const response = await controller.getPost(req.params.id);
      if (!response) res.status(404).send({ message: "No post found" })
      return res.send(response);
    });
  }
}

