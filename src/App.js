import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AgregarProducto from './pages/agregarProducto'
import ListadoDeProductos from './pages/ListadodeProductos'
import Categorias from './pages/categorias'

const App = () => {
	let token = localStorage.getItem('token')

	const logout = () => {
		localStorage.clear();
		token = null;
		window.location.href = 'http://localhost:3000';
	}
 
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<button
						className="navbar-toggler"
						type="button"
						data-mdb-toggle="collapse"
						data-mdb-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<i className="fas fa-bars"></i>
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<a className="navbar-brand mt-2 mt-lg-0" href="/">
							<img
								src="https://cdn-icons-png.flaticon.com/512/2897/2897785.png"
								height="15"
								alt="MDB Logo"
								loading="lazy"
							/>
						</a>
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							{	token ?
								<li className="nav-item">
								<a className="nav-link" href="/dashboard">Dashboard</a>
							</li> : null}
							{ !token ? <li className="nav-item">
								<a className="nav-link" href="/login">Login</a>
							</li> : null}
						
							{ !token ? <li className="nav-item">
								<a className="nav-link" href="/register">Register</a>
							</li> : null}

							{ token ? <li className="nav-item" onClickCapture={logout}>
								<a className="nav-link" href='/'>Logout</a>
							</li> : null}

							{ token ? <li className="nav-item">
								<a className="nav-link" href='/categorias'>Crear Categorias</a>
							</li> : null }

							{ token ? <li className="nav-item">
								<a className="nav-link" href='/agregarproducto'>agregar producto</a>
							</li> : null }

							{ token ? <li className="nav-item">
								<a className="nav-link" href='/productos'>Listado de Produuctos</a>
							</li> : null }
						</ul>
					</div>
					<div className="d-flex align-items-center">
						<a className="text-reset me-3" href="/">
							<i className="fas fa-shopping-cart"></i>
						</a>
						{/* <div className="dropdown">
							<a
								className="dropdown-toggle d-flex align-items-center hidden-arrow"
								href="/"
								id="navbarDropdownMenuAvatar"
								role="button"
								data-mdb-toggle="dropdown"
								aria-expanded="false"
							>
								<img
									src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
									className="rounded-circle"
									height="25"
									alt="Black and White Portrait of a Man"
									loading="lazy"
								/>
							</a>
							<ul
								className="dropdown-menu dropdown-menu-end"
								aria-labelledby="navbarDropdownMenuAvatar"
							>
								<li>
									<a className="dropdown-item" href="/">My profile</a>
								</li>
								<li>
									<a className="dropdown-item" href="/">Settings</a>
								</li>
								<li>
									<a className="dropdown-item" href="/">Logout</a>
								</li>
							</ul>
						</div> */}
					</div>
				</div>
			</nav>
			<BrowserRouter>
				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Register} />
				<Route path="/dashboard" exact component={Dashboard} />
				<Route path="/categorias" exact component={Categorias} />
				<Route path="/agregarproducto" exact component={AgregarProducto} />
				<Route path="/productos" exact component={ListadoDeProductos} />
			</BrowserRouter>
		</div>
	)
}

export default App
