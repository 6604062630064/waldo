// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const leaderboardRouter = require("../src/routes/leaderboard");
const bodyParser = require("body-parser");
const cors = require("cors");
const app: Express = express();
const port = process.env.PORT || 3000;
dotenv.config();
// const corsOptions = {
// 	credentials: true,
// 	origin: process.env.FRONTEND_URL,
// 	optionsSuccessStatus: 200,
// 	methods: ["GET", "POST"],
// 	allowedHeaders: ["Origin"],
// };

// app.use(cors(corsOptions));

app.use(bodyParser.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Methods", "GET,POST");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type"
	);
	next();
});
app.use("/leaderboard", leaderboardRouter);

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.listen(port, () => {
	console.log(`Server is running`);
});
