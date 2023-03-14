import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../../api/authApi';
import '../css/card.css';

export const HomeScreen = () => {
	const [productosCargado, setProductosCargado] = useState([]);
	const navigate = useNavigate();

	const cargarProductoDB = async () => {
		// Código para cargar los datos de los productos
		try {
			const { data } = await authApi.get('/product');

			setProductosCargado(data.productos);
		} catch (error) {
			console.log(error);
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login', {
					replace: true,
				});
			}
		}
	};

	const agregarProducto = async ({ name, price, quantity, description }) => {
		try {
			const resp = await authApi.post('/home', {
				name,
				price,
				quantity,
				description,
			});

			console.log(resp);
		} catch (error) {
			console.log(error);

			if (error.response.status === 401) {
				navigate('/login', {
					replace: true,
				});
			}
		}
	};

	useEffect(() => {
		cargarProductoDB();
	}, []);

	return (
		<div>
			{productosCargado.map((producto) => {
				return (
					<div key={producto._id} className="card">
						<h2>{producto.name}</h2>
						<p>Precio: ${producto.price}</p>
						<p>Cantidad: {producto.quantity}</p>
						<p>descripcion: {producto.description}</p>

						<button onClick={() => agregarProducto(producto)}>Agregar</button>
					</div>
				);
			})}
		</div>
	);
};
