const mongoose = require('mongoose');

const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

const {
	initialBlogs,
	newBlog,
	newBlogNoLikes,
} = require('../utils/list_helper');

const auth =
	'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjVmODVkNTNkMzNkYmM1MTNiYWE1YzY4MiIsImlhdCI6MTYwMjY3MTI5M30.oRkOPudehDbay-lFCj_r1NS1B_X2yzN0UQGOaU8cXTg';

beforeEach(async () => {
	await Blog.deleteMany({});

	const blogObjects = initialBlogs.map((blog) => new Blog(blog));
	const promiseArray = blogObjects.map((blog) => blog.save());
	await Promise.all(promiseArray);
});

describe('json and total blogs', () => {
	test('blog returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('lenght of blogs (total blogs)', async () => {
		const response = await api.get('/api/blogs');
		expect(response.body).toHaveLength(initialBlogs.length);
	});
});

describe('step 2 identifying property is id not _id', () => {
	test('identify id', async () => {
		const response = await api.get('/api/blogs');
		expect(response.body[0].id).toBeDefined();
	});
});

describe('step 3 verifying POST request creates new blog', () => {
	test('post', async () => {
		const test = await api
			.post('/api/blogs')
			.set('Authorization', auth)
			.send(newBlog);
		console.log(test);
		const getAllBlogs = await Blog.find({});
		expect(getAllBlogs).toHaveLength(initialBlogs.length + 1);
	});
});

describe('step 4 if like is missing, set likes to zero', () => {
	test('likes', async () => {
		const response = await api
			.post('/api/blogs')
			.set('Authorization', auth)
			.send(newBlogNoLikes);
		expect(response.body.likes).toBe(0);
	});
});

describe('step 5: if title and url missing , 400', () => {
	test('title,url missing', async () => {
		const { title, url, ...blogWithoutUrlTitle } = newBlog;
		await api
			.post('/api/blogs')
			.set('Authorization', auth)
			.send(blogWithoutUrlTitle)
			.expect(400);
	});
});
afterAll(() => {
	mongoose.connection.close();
});
