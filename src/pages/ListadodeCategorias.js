import React, { useEffect } from 'react'
import { useState } from 'react'

const ListadoDeCategorias = () => {
    const [category, categories] = useState()
    const [detailCategory, setCategoryDetail] = useState()
    const [editarCategory, editCategory] = useState(false)
    const [namecategory, setNameCategory] = useState('')
    const [categoryID, setCategoryID] = useState();
    const [categoryNameSearch, setcategoryNameSearch] = useState('')
    async function populateQuote() {
        const req = await fetch('https://inventariobackend-production.up.railway.app/api/getCategories')

        const data = await req.json()
        if (!data.status) {
			alert(data.message);
		}
        categories(data.category)
    }

    async function filterByCategoryName() {
        const req = await fetch(`https://inventariobackend-production.up.railway.app/api/getCategorybyName/${categoryNameSearch}`)

        const data = await req.json()
        if (!data.status) {
			alert(data.message);
		}
        categories(data.category)
    }

    async function deleteCategory(categoryID) {
        const req = await fetch('https://inventariobackend-production.up.railway.app/api/deleteCategory', {
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
        } else {
                alert(data.message);
        }
    }

    async function loadCategoryDetail(categoryID) {
        const req = await fetch(`https://inventariobackend-production.up.railway.app/api/getCategory/${categoryID}`)


        const data = await req.json()
        if (!data.status) {
			alert(data.message);
		}
        setCategoryDetail(data.category)
    }

    async function editCategoryDetail(event) {
        const response = await fetch('https://inventariobackend-production.up.railway.app/api/updateCategory', {
            method: 'PUT',
            body: JSON.stringify({
                categoryID: categoryID,
                name: namecategory,
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        const data = await response.json()

        if (data.status) {
            alert('Categoria Editado Correctamente');
            window.location.href = 'http://localhost:3000/categorias';
        } else {
            alert(data.message)
        }

    }


    const borrar = (id) => {
        deleteCategory(id);
    }

    const filterbyName = (event) => {

        event.preventDefault();
        if (categoryNameSearch !== '') {
            filterByCategoryName();
        } else {
            populateQuote();
        }
    }

    const editar = (id) => {
        editCategory(true);
        loadCategoryDetail(id);
        setCategoryID(id);
        populateQuote();
    }

    const limpiarFiltros = () => {
        window.location.reload();
    }

    const masInfo = (id) => {
        loadCategoryDetail(id)
        editCategory(false);
        categories([]);
    }

    const verListado = () => {
        populateQuote();
        editCategory(false);
        setCategoryDetail(undefined)
    }

    useEffect(() => {
        populateQuote()
    }, [])

    return (
        <div>
            {category !== undefined && category.length > 0 && !editarCategory ? <><h1>Listado de Categorias</h1>
                <div>
                    <span>Filtrar por Nombre:</span>
                    <form onSubmit={filterbyName}>
                        <input
                            value={categoryNameSearch}
                            onChange={(e) => setcategoryNameSearch(e.target.value)}
                            type="text"
                            placeholder="Ingresa el Nombre" />
                        <input type="submit" value="Buscar" />
                    </form>
                </div>

                <div>
                    <button onClick={limpiarFiltros}>Limpiar filtros <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg></button>
                </div>
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

            {category !== undefined && category.length === 0 && !editarCategory && categoryNameSearch === '' ?
                <>
                    <h1>No hay categorias creadas</h1>
                </>
            :''}

            {detailCategory && !editarCategory ? <>
                <div className="container-detailproduct" style={{ backgroundImage: "url(https://ipmark.com/wp-content/uploads/2016/12/Bodeg%C3%B3n-Productos-del-A%C3%B1o-2017.jpg)" }}>
                    <div className="title-container">
                        <h1>informacion de la Categoria</h1>
                    </div>
                </div>
                <div>
                    <div className="container-information">
                        <span className="span-desc">Nombre de la Categoria:</span>
                        <p className="p-desc">{detailCategory.category.name}</p>
                        <span className="span-pre">Productos en esta categoria:</span>
                        <p className="p-pre">Cantidad = {detailCategory.cantidadDeProductos}</p>
                    </div>
                </div>

                <div className="container-buttom">
                    <button onClick={() => {
                        verListado();
                    }}>VOLVER</button>
                </div>
            </> : ''}

            {editarCategory === true && detailCategory ? <>
                <div className="container-detailproduct" style={{ backgroundImage: "url(https://ipmark.com/wp-content/uploads/2016/12/Bodeg%C3%B3n-Productos-del-A%C3%B1o-2017.jpg)" }}>
                    <div className="title-container">
                        <h1>Editar Categoria</h1>
                    </div>
                </div>

                <form onSubmit={editCategoryDetail}>
                    <input
                        value={namecategory}
                        onChange={(e) => setNameCategory(e.target.value)}
                        type="text"
                        placeholder={detailCategory.category.name}
                    />
                    <input type="submit" value="Editar Categoria" />
                </form>

                <div className="container-buttom">
                    <button onClick={() => {
                        verListado();
                    }}>VOLVER</button>
                </div>
            </> : ''}

            {category !== undefined && category.length === 0 && !editarCategory && categoryNameSearch !== '' ? <>
                <div>
                    <h1>No hay categorias por el nombre {categoryNameSearch}</h1>

                    <div>
                        <button onClick={limpiarFiltros}>Volver <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace" viewBox="0 0 16 16">
                            <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
                            <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z" />
                        </svg></button>
                    </div>
                </div>
            </> : ''}
        </div>
    )
}

export default ListadoDeCategorias