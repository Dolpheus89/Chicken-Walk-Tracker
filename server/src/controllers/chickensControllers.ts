import type { Request, Response } from "express";
import { Chicken } from "../models/chickensModels";

export const create = async (req: Request, res: Response): Promise<void> => {
	const { name, age, breed } = req.body;
	const { user_id } = req.params;
	const fileUpload = req.file
		? `/images/${req.file.filename}`
		: "/images/default.jpg";

	if (!name) {
		res.status(400).json({ message: "Name is required" });
		return;
	}

	try {
		await Chicken.create({
			name: name,
			age: age,
			breed: breed,
			user_id: Number.parseInt(user_id),
			chicken_image: fileUpload,
		});
		res.status(201).json({ message: "Chicken added" });
	} catch (error) {
		console.error("Error adding chicken:", error);
		res
			.status(500)
			.json({ message: "An error occurred while adding the chicken" });
	}
};

export const getChickensByUserID = async (
	req: Request,
	res: Response,
): Promise<void> => {
	const { user_id } = req.params;

	if (Number.isNaN(Number.parseInt(user_id))) {
		res.status(400).json({ message: "Invalid ID" });
		return;
	}

	try {
		const chickens = await Chicken.findChickensByuserId(
			Number.parseInt(user_id),
		);
		res.status(200).json(chickens);
	} catch (error) {
		console.error("Error fetching chickens:", error);
		res
			.status(500)
			.json({ message: "An error occurred while fetching the chickens" });
	}
};

export const update = async (req: Request, res: Response): Promise<void> => {
	const { name, age, breed } = req.body;
	const { id } = req.params;
	const fileUpload = req.file
		? `/images/${req.file.filename}`
		: "/images/default.jpg";

	try {
		await Chicken.update({
			name: name,
			age: Number.parseInt(age),
			breed: breed,
			id: Number.parseInt(id),
			chicken_image: fileUpload,
		});
		res.status(202).json({ message: "Chicken updated" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

export const deleteChicken = async (
	req: Request,
	res: Response,
): Promise<void> => {
	const { id } = req.params;

	try {
		await Chicken.delete(Number.parseInt(id));
		res.status(202).json({ message: "Chicken deleted" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};
