import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import Blog from './Blog';

test('shows title and author', () => {
	const blog = {
		title: 'Test',
		author: 'Josh',
		url: 'www.test.com',
		likes: 150,
		user: {
			username: 'root',
			name: 'Superuser',
			id: '123',
		},
		id: '1234',
	};

	const component = render(<Blog blog={blog} />);
	const div = component.container.querySelector('.blog');

	expect(div).toHaveTextContent('Test Josh');
});
