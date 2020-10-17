import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Login from './components/Login';
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem(
			'loggedUser'
		);
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	return (
		<div>
		<Notification errorMessage={errorMessage}/>
			{user === null ? (
				<Login
					username={username}
					password={password}
					setUsername={setUsername}
					setPassword={setPassword}
					setUser={setUser}
					setErrorMessage={setErrorMessage}
				/>
			) : (
				<div>
					<p>{user.name} logged-in</p>
					<button
						onClick={() => {
							setUser(null);
							window.localStorage.removeItem(
								'loggedUser'
							);
						}}>
						Log Out
					</button>
					<NewBlogForm setBlogs={setBlogs} blogs={blogs} setErrorMessage={setErrorMessage}/>
				</div>
			)}
			<h2>blogs</h2>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
