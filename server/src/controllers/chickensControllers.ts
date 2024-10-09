import { Request, Response } from "express";
import { Chicken } from "../models/chickensModels";



export const create = async (req: Request, res: Response):Promise<void> => {
    const { name, age, breed } = req.body;
    const { user_id } = req.params
	const fileUpload = req.file ? `/images/${req.file.filename}` : "/images/default.jpg";

    if (!name) {
		res.status(400).json({ message: "Name is  required " });
		return
	}

    await Chicken.create({name: name , age: age , breed: breed , user_id: parseInt(user_id) , chicken_image: fileUpload})
    
    res.status(201).json({ message: "Chicken added" });
    return
}

export const getChickensByUserID = async (req: Request, res: Response):Promise<void> => {
    const { id } = req.params

    if (isNaN(parseInt(id))) {
		res.status(400).json({ message: "invalid id" });
		return
	}

    const chickens = await Chicken.findChickensByuserId(parseInt(id))

    res.status(200).json(chickens);
}