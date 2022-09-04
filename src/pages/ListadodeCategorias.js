import React, { useEffect }from 'react'
import { useState } from 'react'

const ListadoDeCategorias = () => {
    const [category, categories] = useState()
    async function populateQuote() {
        const req = await fetch('http://localhost:1337/api/getCategories')

        const data = await req.json()
        categories(data.category)
    }

    async function deleteCategory(categoryID) {
        const req = await fetch('http://localhost:1337/api/deleteCategory', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                categoryID,
            }),
        })
        const data = await req.json()
        if (data.status === true) {
            alert('Categoria eliminada correctamente');
            window.location.reload();
        }
    }


    const borrar = (id) => {
        deleteCategory(id);
    }

    const editar = (e) => {
        
    }

    const masInfo = (e) => {
        
    }

    console.log(category)

    useEffect(() => {
        populateQuote()
    }, [])

    return (
        <div>
            { category !== undefined && category.length > 0 ? <><h1>Listado de Categorias</h1>
                {category.map((e, i) => {
                    return <div key={i} className="product-container">
                        <div className="reporting-container-item">
                            <div className="title-container">
                                <div className="container-information-title">
                                    <div className="title-data">
                                        <h1 className="eventName">Nombre: {e.name}</h1>
                                    </div>
                                </div>
                            </div >
                        </div >
                        <div className="button-container">
                            <button onClick={() => {
                                borrar(e._id);
                            }}>Borrar Categoria</button>
                            <button onClick={() => {
                                editar(e._id);
                            }}>Editar Categoria</button>
                            <button onClick={() => {
                                masInfo(e._id);
                            }}>Detalle Categoria</button>
                        </div>
                    </div>
                })}</> : ''}
        </div>
    )
}

export default ListadoDeCategorias