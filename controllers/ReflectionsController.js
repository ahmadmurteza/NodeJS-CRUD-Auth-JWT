const Reflection = require("./../models/Reflection");

class ReflectionsController {
	static getAll(req, res) {
		const { id } = req.user;
		Reflection.getAll(id)
			.then((reflection) => {
				res.json(reflection);
			})
			.catch((error) => {
				res.json(error);
			});
	}

	static create(req, res) {
		const { success, low_point, take_away } = req.body;
		const { id } = req.user;
		Reflection.create(success, low_point, take_away, id)
			.then((reflection) => {
				res.json(reflection);
			})
			.catch((error) => {
				res.json(error);
			});
	}

	static update(req, res) {
		const { success, low_point, take_away } = req.body;
		const { id } = req.params;
		Reflection.update(success, low_point, take_away, id)
			.then((reflection) => {
				res.json(reflection);
			})
			.catch((error) => {
				res.json(error);
			});
	}

	static delete(req, res) {
		const { id } = req.params;
		Reflection.delete(id)
			.then((reflection) => {
				res.json(reflection);
			})
			.catch((error) => {
				res.json(error);
			});
	}
}

module.exports = ReflectionsController;
