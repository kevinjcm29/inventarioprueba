import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const AgregarProducto = () => {
	let token = localStorage.getItem('token')
	const history = useHistory()
	const [nameproduct, setNameProduct] = useState('')
	const [descproduct, setDescProduct] = useState('')
	const [precio, setPrecio] = useState('')
	const [stock, setStock] = useState('')

	if (token === null) {
		window.location.href = 'http://localhost:3000/login';
	}

	async function addProduct(event) {
		event.preventDefault()


		const response = await fetch('http://localhost:1337/api/createProduct', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: nameproduct,
				description: descproduct,
				price: precio,
				stock: stock
			}),
		})


		const data = await response.json()

		if (data.status === 'ok') {
			history.push('/login')
		}

	}

	return (
		<div>
			<h1>Crear Producto</h1>
			<form onSubmit={addProduct}>
				<input
					value={nameproduct}
					onChange={(e) => setNameProduct(e.target.value)}
					type="text"
					placeholder="Nombre del Producto"
				/>
				<br />
				<input
					value={descproduct}
					onChange={(e) => setDescProduct(e.target.value)}
					type="text"
					placeholder="Descripcion del Producto"
				/>
				<br />
				<input
					value={precio}
					onChange={(e) => setPrecio(e.target.value)}
					type="number"
					placeholder="Precio"
				/>
				<br />
				<input
					value={stock}
					onChange={(e) => setStock(e.target.value)}
					type="number"
					placeholder="Stock"
				/>
				<br />
				<input type="submit" value="Crear Producto" />
			</form>
		</div>
	)
}

export default AgregarProducto