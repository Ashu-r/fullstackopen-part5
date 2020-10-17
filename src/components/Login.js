import React from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login'

const Login = ({
	username,
	password,
	setUsername,
	setPassword,
	setUser,
	setErrorMessage
}) => {
	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});

			blogService.setToken(user.token);

			window.localStorage.setItem(
				'loggedUser',
				JSON.stringify(user)
			);

			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			setErrorMessage('Wrong credentials');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};
	return (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type='text'
					value={username}
					name='Username'
					onChange={({ target }) =>
						setUsername(target.value)
					}
				/>
			</div>
			<div>
				password
				<input
					type='password'
					value={password}
					name='Password'
					onChange={({ target }) =>
						setPassword(target.value)
					}
				/>
			</div>
			<button type='submit'>login</button>
		</form>
	);
};

export default Login;
