import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const AgregarProducto = () => {
	let token = localStorage.getItem('token')
	const history = useHistory()
	const [nameproduct, setNameProduct] = useState('')
	const [descproduct, setDescProduct] = useState('')
	const [precio, setPrecio] = useState('')
	const [file, setFile] = useState(null)
	const [stock, setStock] = useState('')

	const selectedHandler = e => {
		setFile(e.target.files[0])
	}


	if (token === null) {
		window.location.href = 'http://localhost:3000/login';
	}

	async function addProduct(event) {
		event.preventDefault()

		if (!file) {
			alert('you must upload file')
			return
		}

		const formdata = new FormData()
		formdata.append('image', file)
		formdata.append('name', nameproduct)
		formdata.append('description', descproduct)
		formdata.append('price', precio)
		formdata.append('stock', stock)


		const response = await fetch('http://localhost:1337/api/createProduct', {
			method: 'POST',
			body: formdata
		})


		const data = await response.json()

		if (data.status) {
			alert('Producto Creado Correctamente');
			window.location.href = 'http://localhost:3000/productos';
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
				<input id="fileinput" onChange={selectedHandler} className="form-control" type="file" />
				<br />
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