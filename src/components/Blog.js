import React from 'react';
import Togglable from './Togglable';
import blogService from '../services/blogs';

const Blog = ({ blog, blogChange, setBlogChange, user }) => {
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

	const btnStyle = {
		backgroundColor: '#f44336',
		color: 'white',
	};

	const DeleteBtn = () => {
		if (user && blog.user.username === user.username) {
			return (
				<button style={btnStyle} onClick={removeBlog}>
					Delete
				</button>
			);
		} else {
			return null;
		}
	};

	const removeBlog = async () => {
		if (window.confirm(`Delete ${blog.title} by ${blog.author}`)) {
			await blogService.remove(blog.id);
			setBlogChange(!blogChange);
		}
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
				<DeleteBtn />
			</Togglable>
		</div>
	);
};

export default Blog;
