import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../../api/authApi';

export const Pedido = () => {
	const [productosSeleccionado, setProductosSeleccionado] = useState([]);
	const [precioFinal, setPrecioFinal] = useState(0);
	const navigate = useNavigate();

	const cargarPedidosUsuarioDB = async () => {
		try {
			const { data } = await authApi.get('/home');
			setProductosSeleccionado(data.cargarProducto);
		} catch (error) {
			console.log(error);
		}
	};

	const precioTotal = () => {
		let total = 0;
		const sumaProductos = productosSeleccionado.map((precio) => {
			return (total = total + parseInt(precio.price));
		});

		setPrecioFinal(sumaProductos.pop());
	};

	const sacarPedido = async ({ _id }) => {
		try {
			const resp = await authApi.delete(`/home/${_id}`);

			console.log(resp);
		} catch (error) {
			console.log(error);
		}
	};

	const confirmarPedido = async () => {
		try {
			const resp = await authApi.post('/home/pedido', {
				menu: productosSeleccionado,
			});

			setProductosSeleccionado([]);

			//mostrar alerta de producto fue solicitado te avisaremos cuando este confirmado

			//eliminar de la base de datos

			const res = await authApi.delete(
				`/home/eliminar/${productosSeleccionado[0].user}`
			);
			console.log(res);
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
		precioTotal();
		console.log();
	}, [cargarPedidosUsuarioDB]);

	useEffect(() => {
		cargarPedidosUsuarioDB();
	}, []);

	return (
		<div>
			{productosSeleccionado.map((producto) => {
				return (
					<div key={producto._id} className="card">
						<h2>{producto.name}</h2>
						<p>Precio: ${producto.price}</p>
						<p>Cantidad: {producto.quantity}</p>
						<p>descripcion: {producto.description}</p>

						<button
							onClick={() => sacarPedido(producto)}
							className="w-25 bg-danger text-white"
						>
							x
						</button>
					</div>
				);
			})}

			<hr />
			<div>
				<p>
					Total: <span>{precioFinal}</span>
				</p>
				{productosSeleccionado == '' ? (
					''
				) : (
					<button onClick={confirmarPedido}>Confirmar Pedido</button>
				)}
			</div>
		</div>
	);
};
