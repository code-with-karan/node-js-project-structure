import express from "express";
import CommentController from '../controllers/comment.controller';

export default class CommentRouter {
    public router = express.Router();
    get controller() {
        return new CommentController();
    }

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get("/", async (_req, res) => {
            const controller = new CommentController();
            const response = await controller.getComments();
            return res.send(response);
        });

        this.router.post("/", async (req, res) => {
            const controller = new CommentController();
            const response = await controller.createComment(req.body);
            return res.send(response);
        });

        this.router.get("/:id", async (req, res) => {
            const controller = new CommentController();
            const response = await controller.getComment(req.params.id);
            if (!response) res.status(404).send({ message: "No comment found" })
            return res.send(response);
        });
    }
}
