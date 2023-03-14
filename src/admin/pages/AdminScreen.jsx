import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import authApi from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

export const AdminScreen = () => {
	// Estado para controlar la apertura y cierre del modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalOpenEditar, setIsModalOpenEditar] = useState(false);

	// Estado para guardar los datos del formulario
	const [formData, setFormData] = useState([
		{
			name: '',
			price: '',
			quantity: '',
			description: '',
		},
	]);

	const [productoEditar, setProductoEditar] = useState({});
	const [cargarProducto, setCargarProducto] = useState([]);
	const [cargarUsuario, setCargarUsuario] = useState([]);
	const [cargarPedidos, setCargarPedidos] = useState([]);
	const navigate = useNavigate();

	// Función para cargar los datos de los usuarios
	const loadUsersData = async () => {
		// Código para cargar los datos de los usuarios

		try {
			const { data } = await authApi.get('/product/user');

			setCargarUsuario(data.usuarios);
		} catch (error) {
			console.log(error);
		}
	};

	// Función para cargar los datos de los productos
	const loadProductsData = async () => {
		// Código para cargar los datos de los productos
		try {
			const { data } = await authApi.get('/product');

			setCargarProducto(data.productos);
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

	// Función para manejar el cambio de los campos del formulario
	const handleFormChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleFormChangeEditar = (event) => {
		setProductoEditar({
			...productoEditar,
			[event.target.name]: event.target.value,
		});
	};

	//funcion para mandar el producto a la base de datos
	const guardarProductoDB = async (name, price, quantity, description) => {
		try {
			const resp = await authApi.post('/product', {
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

	// Función para manejar el envío del formulario
	const handleFormSubmit = (event) => {
		event.preventDefault();

		const { name, price, quantity, description } = formData;

		if (
			name.length === 0 ||
			price.length === 0 ||
			quantity.length === 0 ||
			description.length === 0
		) {
			return console.log('todos los campos son obligatorio');
		} else if (price <= 0 || quantity <= 0) {
			return console.log('el numero ingresado debe ser mayor a 0');
		}

		// Cerrar el modal y limpiar los datos del formulario
		setIsModalOpen(false);
		setFormData({
			name: '',
			price: '',
			quantity: '',
			description: '',
		});

		guardarProductoDB(name, price, quantity, description);
	};

	const editarProductoDB = async (_id, name, price, quantity, description) => {
		try {
			const resp = await authApi.put('product/editar', {
				_id,
				name,
				price,
				quantity,
				description,
			});

			console.log(resp);
		} catch (error) {
			console.log(error);
		}
	};

	const handleFormSubmitEditar = (event) => {
		event.preventDefault();

		console.log(productoEditar);

		const { _id, name, price, quantity, description } = productoEditar;

		if (
			name.length === 0 ||
			price.length === 0 ||
			quantity.length === 0 ||
			description.length === 0
		) {
			return console.log('todos los campos son obligatorio');
		} else if (price <= 0 || quantity <= 0) {
			return console.log('el numero ingresado debe ser mayor a 0');
		}
		// Cerrar el modal y limpiar los datos del formulario
		setIsModalOpenEditar(false);

		editarProductoDB(_id, name, price, quantity, description);
	};

	const handleClickEditar = (producto) => {
		setProductoEditar(producto);

		setIsModalOpenEditar(true);
	};

	const handleClickDelete = async ({ _id }) => {
		console.log(_id);

		try {
			const resp = await authApi.delete(`/product/eliminar/${_id}`);

			console.log(resp);
		} catch (error) {
			console.log(error);
		}
	};

	// Función para cargar los productos pendientes
	const cargarPedidosDB = async () => {
		// Código para cargar los datos de los productos
		try {
			const { data } = await authApi.get('/product//pedido');

			setCargarPedidos(data.pedido);
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

	const handleClickConfirmarPedido = async ({ _id }) => {
		try {
			const resp = await authApi.put('product/confirmar', {
				_id,
			});

			console.log(resp);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		loadUsersData();
		loadProductsData();
		cargarPedidosDB();
	}, []);

	return (
		<>
			<h1 className="text-center p-3">Admin Page</h1>

			<h3>Usuarios</h3>
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Username</th>
					</tr>
				</thead>
				{cargarUsuario.map((usuario, i) => {
					return (
						<tbody key={usuario._id}>
							<tr>
								<td>{i}</td>
								<td>{usuario._id}</td>
								<td>{usuario.name}</td>
								<td>{usuario.email}</td>
							</tr>
						</tbody>
					);
				})}
			</Table>
			<hr />
			<h3 className="mt-5">Productos</h3>

			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Username</th>
						<th>description</th>
						<th></th>
					</tr>
				</thead>

				{cargarProducto.map((producto, i) => {
					return (
						<tbody key={producto._id}>
							<tr>
								<td>{i}</td>
								<td className="text-white">{producto.name}</td>
								<td>{producto.price}</td>
								<td>{producto.quantity}</td>
								<td>{producto.description}</td>
								<td>
									<button onClick={() => handleClickEditar(producto)}>Editar</button>
									<button onClick={() => handleClickDelete(producto)}>
										Eliminar
									</button>
								</td>
							</tr>
						</tbody>
					);
				})}
			</Table>

			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Username</th>
						<th>description</th>
						<th></th>
					</tr>
				</thead>

				{cargarPedidos.map((pedido, i) => {
					return (
						<tbody key={pedido._id}>
							<tr>
								<td>{i}</td>
								<td className="text-white">{pedido.user}</td>
								<td>
									{pedido.menu.map((menus, i) => {
										return <div key={i}>{menus.name} / </div>;
									})}
								</td>
								<td>{pedido.fecha}</td>
								<td>{pedido.estado}</td>
								<td>
									<button onClick={() => handleClickConfirmarPedido(pedido)}>
										Confirmar
									</button>
								</td>
							</tr>
						</tbody>
					);
				})}
			</Table>
			{/* Botón con icono "+" */}
			<div className="d-flex justify-content-end me-5">
				<button
					className="add-product-button border rounded-circle p-3 bg-dark "
					onClick={() => setIsModalOpen(true)}
				>
					<FaPlus className="add-product-icon text-white" />
				</button>
			</div>

			{/* Modal para agregar producto */}
			<Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
				<h2>Agregar producto</h2>
				<Form onSubmit={handleFormSubmit}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Nombre</Form.Label>
						<Form.Control
							type="text"
							name="name"
							value={formData.name}
							onChange={handleFormChange}
							placeholder="Enter email"
							className="w-50"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>precio</Form.Label>
						<Form.Control
							type="number"
							name="price"
							value={formData.price}
							onChange={handleFormChange}
							className="w-50"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>cantidad</Form.Label>
						<Form.Control
							type="number"
							name="quantity"
							value={formData.quantity}
							onChange={handleFormChange}
							className="w-50"
						/>
					</Form.Group>
					<Form.Group className="mb-3 d-flex flex-column" controlId="formBasicEmail">
						<Form.Label>Descripcion</Form.Label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleFormChange}
							className="w-50"
						></textarea>
					</Form.Group>
					<Button type="submit">Agregar</Button>
				</Form>
			</Modal>

			{/* Modal para editar producto */}
			<Modal
				isOpen={isModalOpenEditar}
				onRequestClose={() => setIsModalOpenEditar(false)}
			>
				<h2>Editar producto</h2>
				<Form onSubmit={handleFormSubmitEditar}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Nombre</Form.Label>
						<Form.Control
							type="text"
							name="name"
							value={productoEditar.name}
							onChange={handleFormChangeEditar}
							placeholder="Enter email"
							className="w-50"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>precio</Form.Label>
						<Form.Control
							type="number"
							name="price"
							value={productoEditar.price}
							onChange={handleFormChangeEditar}
							className="w-50"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>cantidad</Form.Label>
						<Form.Control
							type="number"
							name="quantity"
							value={productoEditar.quantity}
							onChange={handleFormChangeEditar}
							className="w-50"
						/>
					</Form.Group>
					<Form.Group className="mb-3 d-flex flex-column" controlId="formBasicEmail">
						<Form.Label>Descripcion</Form.Label>
						<textarea
							name="description"
							value={productoEditar.description}
							onChange={handleFormChangeEditar}
							className="w-50"
						></textarea>
					</Form.Group>
					<Button type="submit">Agregar</Button>
				</Form>
			</Modal>
		</>
	);
};
