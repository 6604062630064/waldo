import { Request, Response } from "express";
import { validationResult, body, header } from "express-validator";
import sql from "../db";
const asyncHandler = require("express-async-handler");
import dotenv from "dotenv";
dotenv.config();

exports.leaderboard_get = [
	header("Origin").custom((v) => {
		if (v !== process.env.FRONTEND_URL) {
			throw new Error("Forbbiden domain");
		} else {
			return true;
		}
	}),
	asyncHandler(async (req: Request, res: Response) => {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res.status(403).json(result.array());
		}

		try {
			const dbResult =
				await sql`select * from Leaderboard order by time_spent asc`;
			res.json(dbResult);
		} catch (err) {
			res.sendStatus(404);
		}
	}),
];

exports.leaderboard_post = [
	header("Origin").custom((v) => {
		if (v !== process.env.FRONTEND_URL) {
			throw new Error("Forbbiden domain");
		} else {
			return true;
		}
	}),
	body("name")
		.escape()
		.isLength({ min: 4, max: 13 })
		.withMessage("Invalid length"),
	body("time_spent").escape().isDecimal().withMessage("Invalid format"),
	asyncHandler(async (req: Request, res: Response) => {
		const result = validationResult(req);

		if (!result.isEmpty()) {
			return res.status(401).json(result.array());
		}
		try {
			const dbResult = await sql`insert into Leaderboard ${sql({
				name: req.body.name,
				time_spent: req.body.time_spent,
				timestamp: Date.now(),
			})}`;

			res.sendStatus(200);
		} catch (error) {
			console.log(error);
			res.sendStatus(404);
		}
	}),
];
