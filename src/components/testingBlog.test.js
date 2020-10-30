import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestingBlog from './testingBlog';

test('button twice', () => {
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

	const mockHandler = jest.fn();

	const { getByText } = render(
		<TestingBlog blog={blog} click={mockHandler} />
	);

	const button = getByText('like');
	fireEvent.click(button);
	fireEvent.click(button);

	expect(mockHandler.mock.calls.length).toBe(2);
});
