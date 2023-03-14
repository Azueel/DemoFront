import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBarShop = () => {
	return (
		<div className="bg-dark">
			<ul>
				<li>
					<NavLink className="text-white" to="/home">
						home
					</NavLink>
				</li>
				<li>
					<NavLink className="text-white" to="/pedido">
						PEDIDO
					</NavLink>
				</li>
				<li>
					<NavLink className="text-white" to="/admin">
						ADMIN
					</NavLink>
				</li>
				<li>
					<NavLink className="text-white" to="/login">
						login
					</NavLink>
				</li>
			</ul>
		</div>
	);
};
