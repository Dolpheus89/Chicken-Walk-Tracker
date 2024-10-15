import { db } from "../utils/db";

export interface Chicken {
	id?: number;
	name: string;
	age: number;
	breed: string;
	chicken_image: string;
	user_id?: number;
}

export const Chicken = {
	create: (chicken: Chicken): Promise<void> => {
		const query =
			"INSERT INTO chickens ( name , age, breed, chicken_image, user_id) VALUES ( ? , ? , ? , ?, ?)";
		const params = [
			chicken.name,
			chicken.age,
			chicken.breed,
			chicken.chicken_image,
			chicken.user_id,
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

	findChickensByuserId: (user_id: number): Promise<Chicken[]> => {
		const query = "SELECT * from chickens WHERE user_id = ?";
		const params = [user_id];

		return new Promise((resolve, reject) => {
			db.all(query, params, (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows as Chicken[]);
				}
			});
		});
	},

	update: (chicken: Chicken): Promise<void> => {
		const query =
			"UPDATE chickens SET name = ?, age = ? , breed = ? , chicken_image = ? WHERE id = ?";
		const params = [
			chicken.name,
			chicken.age,
			chicken.breed,
			chicken.chicken_image,
			chicken.id,
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

	delete: (id: number): Promise<void> => {
		const query = "DELETE FROM chickens WHERE id = ?";
		const params = [id];

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
};
