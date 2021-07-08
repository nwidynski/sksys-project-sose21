import express from "express";
import FeedController from "@server/controller/feed";

const router = express.Router();
router.use(express.json());

router.get("/", FeedController.list);

export default router;
