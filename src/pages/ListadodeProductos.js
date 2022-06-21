import React, { useEffect } from 'react'
import { useState } from 'react'

const ListadoDeProductos = () => {
    const [product, productos] = useState()
    async function populateQuote() {
        const req = await fetch('http://localhost:1337/api/getProducts')

        const data = await req.json()
        productos(data.products)
    }

    async function deleteProduct(productID) {
        const req = await fetch('http://localhost:1337/api/deleteProduct', {
            method: 'DELETE',
            headers: {
				'Content-Type': 'application/json',
			},
            body: JSON.stringify({
				productID,
			}),
        })
        
        debugger
            const data = await req.json()

            console.log(data)
    }

    const borrar = (id) => {
        debugger
        deleteProduct(id);
    }
    useEffect(() => {
        populateQuote()
    }, [])

    return (
        <div>
            <h1>Listado de Productos</h1>

            {!product ? 'cargando...' :
                product.map(e => {
                    let imagen = e.image;
                    return <div>
                        <div className="reporting-container-item">
                            <div className="title-container">
                                <img alt='desceiptio' src={imagen} />
                                <div className="container-information-title">
                                    <div className="title-data">
                                        <h1 className="eventName">Nombre: {e.name}</h1>
                                        <h1 className="eventName">Descripcion: {e.description}</h1>
                                        <h1 className="eventName">Precio: {e.price}$</h1>
                                        <h1 className="eventName">Cantidad en Stock: {e.stock}</h1>
                                    </div>
                                </div>
                            </div >
                        </div >
                        <button onClick={() => {
                            borrar(e._id);
                        }}>Borrar Producto</button>
                    </div>
                })
            }
        </div >
    )
}

export default ListadoDeProductos
