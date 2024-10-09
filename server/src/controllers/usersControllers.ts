import { Request, Response } from "express";
import { User } from "../models/usersModels";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import "dotenv/config"



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
	

	const existingUser = await User.findUserByEmail(email);

	if (existingUser) {
		res.status(400).json({ message: "User already exists" });
		return
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	await User.create({ name: name, email: email, password: hashedPassword , profile_image: fileUpload});

	res.status(201).json({ message: "User registered" });
	return
};

export const login = async (req: Request, res: Response):Promise<void> => {
	const { email , password } = req.body

	const user = await User.findUserByEmail(email);

	if (!user || !(await bcrypt.compare(password, user.password))) {
		res.status(400).json({ message: 'Invalid credentials' });
		return
	  }

	  const secretKey = process.env.SECRET_KEY;
	  
	  if (!secretKey) {
		console.error('JWT secret key is missing in the environment variables');
	
		res.status(500).json({ message: 'An unexpected error occurred' });
		return
	  }

	  const token = jwt.sign({ email: user.email }, secretKey, {
		expiresIn: '24h',
	  });
	
	  res.status(200).json({ token });
}


export const logout = (req: Request, res: Response) => {
	res.status(200).json({ message: 'Logged out successfully' });
}