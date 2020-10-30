import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react/';
import Blog from './Blog';

let component;

beforeEach(() => {
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
	component = render(<Blog blog={blog} />);
});

test('shows title and author', () => {
	const div = component.container.querySelector('.blog');

	expect(div).toHaveTextContent('Test Josh');
});

test('url and number of likes', () => {
	const button = component.getByText('view');
	fireEvent.click(button);
	const bloginfo = component.container.querySelector('.bloginfo');

	expect(bloginfo).toHaveTextContent('www.test.com150');
});
