import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../../api/authApi';

import './css/register.css';

export const RegisterScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const [msgError, setMsgError] = useState('');
	const navigate = useNavigate();

	const startRegister = async (name, email, password) => {
		try {
			const { data } = await authApi.post('/auth/new', {
				name,
				email,
				password,
			});
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			console.log(data.rol);
			if (data.rol === 'usuario') {
				navigate('/home');
			} else {
				navigate('/admin');
			}

			setError(false);
		} catch ({ response }) {
			console.log(response);
			setError(true);
			setMsgError(response.data.msg);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validaciones de campos
		if (!name) {
			setError(true);
			setMsgError('Por favor, introduce tu nombre');
			return;
		}
		if (!email) {
			setError(true);
			setMsgError('Por favor, introduce tu correo electrónico');
			return;
		}
		if (!password) {
			setError(true);
			setMsgError('Por favor, introduce tu contraseña');
			return;
		}

		startRegister(name, email, password);

		// Aquí iría el código para enviar los datos del formulario
	};

	return (
		<div className="register-container">
			<form className="form-container" onSubmit={handleSubmit}>
				<h1>Registro</h1>

				{error ? <h3 className="errorStyle">{msgError}</h3> : ''}

				<div className="input-container">
					<label htmlFor="name">Nombre:</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Introduce tu nombre"
					/>
				</div>
				<div className="input-container">
					<label htmlFor="email">Correo electrónico:</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Introduce tu correo electrónico"
					/>
				</div>
				<div className="input-container">
					<label htmlFor="password">Contraseña:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Introduce tu contraseña"
					/>
				</div>
				<button type="submit">Registrarse</button>
			</form>
		</div>
	);
};
