import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import authApi from '../../api/authApi';
import './css/login.css';

export const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const [msgError, setMsgError] = useState('');
	const navigate = useNavigate();

	const startLogin = async (email, password) => {
		try {
			const { data } = await authApi.post('/auth', {
				email,
				password,
			});

			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());

			if (data.rol === 'admin') {
				navigate('/admin');
			} else {
				navigate('/home');
			}
		} catch (error) {
			setError(true);

			setMsgError(error.response.data.msg);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		startLogin(email, password);
	};

	return (
		<div className="login-container">
			<form onSubmit={handleSubmit} className="form-container">
				<h1>Login</h1>

				{error ? <h3 className="errorStyle">{msgError}</h3> : ''}
				<div className="input-container">
					<label htmlFor="username">email:</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="input-container">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit">Log in</button>
			</form>
		</div>
	);
};
