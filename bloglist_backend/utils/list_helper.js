const { values } = require('lodash');
const _ = require('lodash');

const dummy = () => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((sum, item) => {
		return sum + item.likes;
	}, 0);
};

const favoriteBlog = (blogs) => {
	const mostLikedBlog = blogs.reduce((acc, item) => {
		return acc.likes > item.likes ? acc : item;
	}, blogs[0]);
	return {
		title: mostLikedBlog.title,
		author: mostLikedBlog.author,
		url: mostLikedBlog.url,
		likes: mostLikedBlog.likes,
	};
};

const mostBlogs = (blogs) => {
	const authors = blogs.map((blog) => blog.author);
	const authorBlogs = _.countBy(authors);
	return _.maxBy(_.keys(authorBlogs), (o) => authorBlogs[o]);
};

const mostLikes = (blogs) => {
	const authorsWithTotalLikes = _.reduce(
		blogs,
		(result, val) => {
			if (!(val.author in result)) {
				result[val.author] = val.likes;
			} else {
				result[val.author] += val.likes;
			}
			return result;
		},
		{}
	);
	const topRatedAuthor = _.maxBy(
		_.keys(authorsWithTotalLikes),
		(o) => authorsWithTotalLikes[o]
	);
	return {
		author: topRatedAuthor,
		blogs: authorsWithTotalLikes[topRatedAuthor],
	};
};

const initialBlogs = [
	{
		title: 'How does arrow function work?',
		author: 'Juan',
		url: 'www.jsstuff.com/article/arrow_functions',
		likes: 148,
	},
	{
		title: 'How does normal function work?',
		author: 'Juan',
		url: 'www.jsstuff.com/article/normal_functions',
		likes: 120,
	},
];

const newBlog = {
	title: 'How does async await work?',
	author: 'Ash',
	url: 'www.jsstuff.com/article/async_await',
	likes: 104,
	userId: '5f85d53d33dbc513baa5c682',
};

const newBlogNoLikes = {
	title: 'How does map funcion work?',
	author: 'Ash',
	url: 'www.jsstuff.com/article/es6_map',
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	initialBlogs,
	newBlog,
	newBlogNoLikes,
	mostBlogs,
	mostLikes,
};
