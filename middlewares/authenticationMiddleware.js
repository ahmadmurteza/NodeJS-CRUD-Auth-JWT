const { verify } = require("./../helpers/jwt");

async function authenticationMiddleware(req, res, next) {
	try {
		const { authorization } = req.headers;
		const token = authorization.split("Bearer ");
		if (token.length !== 2) throw { name: "InvalidToken" };
		const { id, email } = verify(token[1]);
		req.user = { id, email };
		next();
	} catch (error) {
		res.json({ message: "Unauthorized" });
	}
}

module.exports = authenticationMiddleware;
