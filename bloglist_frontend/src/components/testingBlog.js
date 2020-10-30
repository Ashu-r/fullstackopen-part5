import React from 'react';

const TestingBlog = ({ blog, click }) => (
	<div>
		<div className='blog'>
			{blog.title} {blog.author}
		</div>
		<div className='like'>
			{blog.likes} likes
			<button onClick={click}>like</button>
		</div>
	</div>
);

export default TestingBlog;
