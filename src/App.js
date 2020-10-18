import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Login from './components/Login';
import Notification from './components/Notification';
import NewBlogForm from './components/NewBlogForm';
import Togglable from './components/Togglable';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [updateBlogList, setUpdateBlogList] = useState('');
	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, [updateBlogList]);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	return (
		<div>
			<Notification errorMessage={errorMessage} />
			{user === null ? (
				<Togglable buttonLabel='login'>
					<Login
						username={username}
						password={password}
						setUsername={setUsername}
						setPassword={setPassword}
						setUser={setUser}
						setErrorMessage={setErrorMessage}
					/>
				</Togglable>
			) : (
				<div>
					<p>
						{user.name} logged-in{' '}
						<button
							onClick={() => {
								setUser(null);
								window.localStorage.removeItem('loggedUser');
							}}
						>
							Log Out
						</button>
					</p>

					<Togglable buttonLabel='New blog'>
						<NewBlogForm
							setUpdateBlogList={setUpdateBlogList}
							setErrorMessage={setErrorMessage}
						/>
					</Togglable>
				</div>
			)}
			<h2>blogs</h2>
			{blogs.map((blog) => (
				<Blog
					setUpdateBlogList={setUpdateBlogList}
					key={blog.id}
					blog={blog}
				/>
			))}
		</div>
	);
};

export default App;
