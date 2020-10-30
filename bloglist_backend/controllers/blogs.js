const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { blogs: 0 });
	response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
	const { body } = request;
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!request.token || !decodedToken.id) {
		return response
			.status(401)
			.json({ error: 'Invalid / missing token' });
	}
	const user = await User.findById(decodedToken.id);

	const blog = new Blog({
		...body,
		likes: body.likes ?? 0,
		user: user._id,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog);
	await user.save();

	response.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!request.token || !decodedToken.id) {
		return response
			.status(401)
			.json({ error: 'Invalid / missing token' });
	}
	const blog = await Blog.findById(request.params.id);
	if (blog.user.toString() === decodedToken.id.toString()) {
		await Blog.deleteOne(blog);
		response.status(204).end();
	} else {
		response.status(401).json({ error: 'Invalid user' });
	}
});

blogRouter.put('/:id', async (request, response) => {
	const blog = {
		likes: request.body.likes,
	};
	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		blog,
		{ new: true }
	);
	response.json(updatedBlog.toJSON());
});

module.exports = blogRouter;
