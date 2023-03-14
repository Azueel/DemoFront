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
						home
					</NavLink>
				</li>
				<li>
					<NavLink className="text-white" to="/admin">
						home
					</NavLink>
				</li>
				<li>
					<NavLink className="text-white" to="/login">
						home
					</NavLink>
				</li>
			</ul>
		</div>
	);
};
