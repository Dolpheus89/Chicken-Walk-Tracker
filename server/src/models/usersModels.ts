import { db } from "../utils/db";

export interface User {
	name: string;
	email: string;
	password: string;
	profile_image: string;
}

export const User = {
	create: (credential: User): Promise<void> => {
		const query =
			"INSERT INTO users ( name , email, password , profile_image) VALUES ( ? , ? , ? , ?)";
		const params = [
			credential.name,
			credential.email,
			credential.password,
			credential.profile_image,
		];

		return new Promise((resolve, reject) => {
			db.run(query, params, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	},

	findUserByEmail: (email: string): Promise<User> => {
		const query = "SELECT * FROM users WHERE email = ?";
		const params = [email];

		return new Promise((resolve, reject) => {
			db.get(query, params, (err, row) => {
				if (err) {
					reject(err);
				} else {
					resolve(row as User);
				}
			});
		});
	},

	updateProfileImage: (id: number, newProfileImage: string): Promise<void> => {
		const query = "UPDATE users SET profile_image = ? WHERE id = ?";
		const params = [newProfileImage, id];

		return new Promise((resolve, reject) => {
			db.run(query, params, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}
};
