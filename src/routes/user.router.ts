import express from "express";
import UserController from "../controllers/user.controller";

export default class UserRouter {
  public router = express.Router();
  get controller() {
    return new UserController();
  }

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/", async (_req, res) => {
      const controller = new UserController();
      const response = await controller.getUsers();
      return res.send(response);
    });

    this.router.post("/", async (req, res) => {
      const controller = new UserController();
      const response = await controller.createUser(req.body);
      return res.send(response);
    });

    this.router.get("/:id", async (req, res) => {
      const controller = new UserController();
      const response = await controller.getUser(req.params.id);
      if (!response) res.status(404).send({ message: "No user found" })
      return res.send(response);
    });
  }
}
