import { db } from "../utils/db";

export interface Walk {
	user_id: number;
	chicken_id: number;
	title: string;
	location: number;
	duration: number;
	notes: string;
}

export const Walk = {
	create: (walk: Walk): Promise<void> => {
		const query =
			"INSERT INTO walks ( title , location, duration, notes, user_id, chicken_id) VALUES ( ? , ? , ? , ?, ?, ?)";
		const params = [
			walk.title,
			walk.location,
			walk.duration,
			walk.notes,
			walk.user_id,
			walk.chicken_id,
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
};
