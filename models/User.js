const pool = require("../config/connection");

const { hash, compare } = require("./../helpers/hash");

class User {
	constructor(id, email, password) {
		this.id = id;
		this.email = email;
		this.password = password;
	}

	static register(email, password) {
		return new Promise((resolve, reject) => {
			const hashedPassword = hash(password);
			pool
				.query(
					`INSERT INTO users_tab (email, password) 
                    VALUES ($1, $2) 
                    RETURNING *;`,
					[email, hashedPassword]
				)
				.then(({ rows }) => {
					const user = new User(rows[0].id, rows[0].email);
					resolve(user);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	static login(email, password) {
		return new Promise((resolve, reject) => {
			pool
				.query(`SELECT id, email, password FROM users_tab WHERE email = $1;`, [
					email,
				])
				.then(({ rows }) => {
					if (!rows.length) throw { name: "UserNameNotFound" };
					if (!compare(password, rows[0].password))
						throw { name: "PasswordInvalid" };
					const user = new User(rows[0].id, rows[0].email, rows[0].password);
					resolve(user);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}

module.exports = User;
