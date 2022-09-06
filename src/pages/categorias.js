import React from 'react'
import { useState } from 'react'

const Categorias = () => {
	let token = localStorage.getItem('token')
	const [namecategory, setNameCategory] = useState('');;

	if (token === null) {
		window.location.href = '/login';
	}

	async function addProduct(event) {
		event.preventDefault();
		const formdata = new FormData()
		formdata.append('name', namecategory)

		const response = await fetch('https://inventariobackend-production.up.railway.app/api/createCategory', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: namecategory,
			}),
		})

		const data = await response.json()
		if (data.status) {
			alert('Categoria creada correctamente');
			window.location.reload()
		} else {
			alert(data.message);
		}

	}

	return (
		<div>
			<h1>Crear Categorias</h1>
			<form onSubmit={addProduct}>
				<input
					value={namecategory}
					onChange={(e) => setNameCategory(e.target.value)}
					type="text"
					placeholder="Nombre de la Categoria"
				/>
				<br />
				<input type="submit" value="Crear Categoria" />
			</form>
		</div>
	)
}

export default Categorias