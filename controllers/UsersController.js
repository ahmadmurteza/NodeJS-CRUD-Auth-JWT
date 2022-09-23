const User = require("./../models/User");
const { sign } = require("./../helpers/jwt");

class UserController {
	static register(req, res) {
		const { email, password } = req.body;
		User.register(email, password)
			.then((data) => {
				res.json(data);
			})
			.catch((error) => {
				if (error.name == "EmailAlreadyExists") {
					res.json({ message: "Email already taken" });
				} else if (error.code == "23505") {
					res.json({ message: "User already exists" });
				} else {
					res.json(error);
				}
			});
	}

	static login(req, res) {
		const { email, password } = req.body;
		User.login(email, password)
			.then((user) => {
				const accessToken = sign({
					id: user.id,
					email: user.email,
					password: user.password,
				});
				res.json({ message: "Login success", accessToken });
			})
			.catch((err) => {
				if (err.name == "UserNameNotFound" || err.name == "PasswordInvalid") {
					res.json({
						message: "Wrong email or password",
					});
				} else {
					res.json(error);
				}
			});
	}
}

module.exports = UserController;
