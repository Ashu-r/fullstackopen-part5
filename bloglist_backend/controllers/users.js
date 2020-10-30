const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', { user: 0 });
	response.json(users);
});

usersRouter.post('/', async (request, response) => {
	const { body } = request;
	const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
	if (body.password.match(passRegex)) {
		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(
			body.password,
			saltRounds
		);

		const user = new User({
			username: body.username,
			name: body.name,
			passwordHash,
		});

		const savedUser = await user.save();

		response.json(savedUser);
	} else {
		response.json({
			error:
				'Password should contain 1 uppercase, 1 lowercase, 1 digit and should be in between 8 to 20 characters long',
		});
	}
});

module.exports = usersRouter;
