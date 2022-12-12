import express from "express";
import PingController from "../controllers/ping.controller";
import PostRouter from "./post.router";
import UserRouter from "./user.router";
import ProductRouter from "./product.router";
import CommentRouter from "./comment.router";

const router = express.Router();
router.get("/", async (_req, res) => {
  return res.send("Welcome to the AV APIs!!!");
});
router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});
router.use("/users", new UserRouter().router);
router.use("/posts", new PostRouter().router);
router.use("/product", new ProductRouter().router);
router.use("/comment", new CommentRouter().router);

export default router;