import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AdminScreen } from '../admin/pages/AdminScreen';
import { LoginScreen } from '../auth/pages/LoginScreen';
import { RegisterScreen } from '../auth/pages/RegisterScreen';
import { HomeScreen } from '../home/pages/HomeScreen';
import { Pedido } from '../home/pages/Pedido';

export const AppRouter = () => {
	return (
		//Router principal
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginScreen />} />

				<Route path="/register" element={<RegisterScreen />} />

				<Route path="/admin" element={<AdminScreen />} />
				{/* <Route path="/admin/edit/:id" element={<EditarProducto />} /> */}
				<Route path="/home" element={<HomeScreen />} />
				<Route path="/pedido" element={<Pedido />} />
			</Routes>
		</BrowserRouter>
	);
};
