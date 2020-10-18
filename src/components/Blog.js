import React from 'react';
import Togglable from './Togglable';
import blogService from '../services/blogs';

const Blog = ({ blog, blogChange, setBlogChange }) => {
	const blogStyle = {
		padding: '15px',
		border: '2px solid #5C6BC0',
		// display:'flex',
		// 'justify-content': 'flex-start'
	};
	const updateLike = async () => {
		await blogService.update({
			...blog,
			likes: blog.likes + 1,
		});
		setBlogChange(!blogChange);
	};
	return (
		<div style={blogStyle}>
			{blog.title}
			<Togglable buttonLabel='view' cancelLabel='hide'>
				<p>{blog.url}</p>
				<p>
					{blog.likes} likes
					<button onClick={updateLike}>like</button>
				</p>
				<p>-{blog.author}</p>
			</Togglable>
		</div>
	);
};

export default Blog;
