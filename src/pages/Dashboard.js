import React, { useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'

const Dashboard = () => {
	const history = useHistory()
	let userName = localStorage.getItem('user')
	async function populateQuote() {
		const req = await fetch('http://localhost:1337/api/authenticate', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === true) {
			// isLogged(data.quote)
		} else {
			alert(data.error)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				history.replace('/login')
			} else {
				populateQuote()
			}
		} else {
		}

		if (token === null) {
			window.location.href = 'http://localhost:3000/login';
		}
	}, [populateQuote])  // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div>
			<h1>Bienvenido {userName}</h1>
		</div>
	)
}

export default Dashboard
