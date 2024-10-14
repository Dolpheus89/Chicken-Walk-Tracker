import { Request, Response } from "express";
import { User } from "../models/usersModels";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const register = async (req: Request, res: Response): Promise<void> => {
	const { name, email, password } = req.body;
	const fileUpload = req.file
		? `/images/${req.file.filename}`
		: "/images/default.jpg";
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	if (!name || !password || !email) {
		res.status(400).json({ message: "Username, email, and password required" });
		return;
	}

	if (!emailRegex.test(email)) {
		res.status(400).json({ message: "Invalid email format" });
		return;
	}

	try {
		const existingUser = await User.findUserByEmail(email);

		if (existingUser) {
			res.status(400).json({ message: "User already exists" });
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		await User.create({
			name,
			email,
			password: hashedPassword,
			profile_image: fileUpload,
		});

		res.status(201).json({ message: "User registered" });
	} catch (error) {
		console.error("Error during registration:", error);
		res
			.status(500)
			.json({ message: "An error occurred while registering the user" });
	}
};

export const login = async (req: Request, res: Response): Promise<void> => {
	const { email, password } = req.body;

	try {
		const user = await User.findUserByEmail(email);

		if (!user || !(await bcrypt.compare(password, user.password))) {
			res.status(400).json({ message: "Invalid credentials" });
			return;
		}

		const secretKey = process.env.SECRET_KEY;

		if (!secretKey) {
			console.error("JWT secret key is missing in the environment variables");
			res.status(500).json({ message: "An unexpected error occurred" });
			return;
		}

		const token = jwt.sign({ email: user.email }, secretKey, {
			expiresIn: "24h",
		});

		const { password: _, ...userData } = user;

		res.status(200).json({ token, userData });
	} catch (error) {
		console.error("Error during login:", error);
		res.status(500).json({ message: "An error occurred while logging in" });
	}
};

export const logout = (req: Request, res: Response): void => {
	res.status(200).json({ message: "Logged out successfully" });
};

export const updateProfileImg = async (
	req: Request,
	res: Response,
): Promise<void> => {
	const { id } = req.params;
	const fileUpload = req.file
		? `/images/${req.file.filename}`
		: "/images/default.jpg";

	console.log(fileUpload);

	try {
		await User.updateProfileImage(parseInt(id), fileUpload);
		console.log("Profile image updated successfully");

		res.status(200).json({
			message: "Profile image updated successfully",
			profile_image: fileUpload,
		});
	} catch (error) {
		console.error("Error updating profile image:", error);

		if (error instanceof Error) {
			res.status(500).json({
				message: "Error updating profile image",
				error: error.message,
			});
		} else {
			res.status(500).json({
				message: "Error updating profile image",
				error: "An unknown error occurred",
			});
		}
	}
};
