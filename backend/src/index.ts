// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const leaderboardRouter = require("./routes/leaderboard");
const bodyParser = require("body-parser");
const cors = require("cors");
const app: Express = express();
const port = process.env.PORT || 3000;
dotenv.config();
const corsOptions = {
	origin: process.env.FRONTEND_URL,
	optionsSuccessStatus: 200,
	methods: ["GET", "POST"],
	allowedHeaders: ["Origin"],
	// some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use("/leaderboard", leaderboardRouter);

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
