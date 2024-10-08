import { Request, Response } from "express";
import { Users } from "../models/usersModels";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response):Promise<void> => {
	const { name, email, password } = req.body;
	const fileUpload = req.file ? `/images/${req.file.filename}` : "/images/default.jpg";

	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


	if (!name || !password || !email) {
		res.status(400).json({ message: "Username, email and password required " });
			return
	}

	if (!emailRegex.test(email)) {
		res.status(400).json({ message: "Invalid email format" });
		return;
	  }
	

	const existingUser = await Users.findUserByEmail(email);

	if (existingUser) {
		res.status(400).json({ message: "User already exists" });
		return
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	await Users.create({ name: name, email: email, password: hashedPassword , profile_image: fileUpload});

	res.status(201).json({ message: "User registered" });
	return
};
