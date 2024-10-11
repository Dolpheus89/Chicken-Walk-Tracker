import { Request, Response } from "express";
import { Walk } from "../models/walksModels";

export const create = async (req: Request, res: Response): Promise<void> => {
	const { title, location, duration, notes, distance, user_id, chicken_id } =
		req.body;

	try {
		await Walk.create({
			title: title,
			location: location,
			duration: duration,
			notes: notes,
			distance: distance,
			user_id: parseInt(user_id),
			chicken_id: chicken_id,
		});
		res.status(201).json({ message: "walk added" });
	} catch (error) {
		console.error("Error adding walks:", error);
		res
			.status(500)
			.json({ message: "An error occurred while adding the walk" });
	}
};
