import express, { Request, Response } from "express";
const router = express.Router();
const leaderboardController = require("../controllers/leaderboardController");

router.get("/", leaderboardController.leaderboard_get);

router.post("/", leaderboardController.leaderboard_post);

module.exports = router;
