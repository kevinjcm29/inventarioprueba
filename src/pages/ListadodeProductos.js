import React, { useEffect } from 'react'
import { useState } from 'react'
import Select from 'react-select'

const ListadoDeProductos = () => {
    const [product, productos] = useState([])
    const [detailProduct, setProductDetail] = useState()
    const [editarProduct, editProduct] = useState(false)
    const [category, categories] = useState()
    const [productNameSearch, setproductNameSearch] = useState('')
    const [nameproduct, setNameProduct] = useState('')
    const [descproduct, setDescProduct] = useState('')
    const [precio, setPrecio] = useState('')
    const [categoryS, setCategory] = useState('')
    const [stock, setStock] = useState('')
    const [productID, setProductID] = useState();
    const [filterNameCat, setfilterNameCat] = useState('');
    const [toggleByCategory, settoggleByCategory] = useState(false)


    async function populateQuote() {
        const req = await fetch('https://inventariobackend-production.up.railway.app/api/getProducts')

        const data = await req.json()
        if (!data.status) {
			alert(data.message);
		}

        productos(data.products)
    }

    async function filterByProductName() {
        const req = await fetch(`https://inventariobackend-production.up.railway.app/api/getProductsbyName/${productNameSearch}`)

        const data = await req.json()
        if (!data.status) {
			alert(data.message);
		}
        productos(data.products)
    }

    async function filterByCategoryandName() {
        const req = await fetch(`https://inventariobackend-production.up.railway.app/api/getProductsbyFilterandName/${filterNameCat}/${productNameSearch}`)

        const data = await req.json()
        if (data.products !== undefined && data.products.length > 0) {
            settoggleByCategory(true);
        }
        if (!data.status) {
			alert(data.message);
		}
        productos(data.products)
    }

    const filterbyName = (event) => {

        event.preventDefault();
        if (productNameSearch !== '') {
            if (toggleByCategory) {
                filterByCategoryandName();
            } else {
                filterByProductName();
            }
        } else {
            populateQuote();
        }
    }

    async function deleteProduct(productID) {
        const req = await fetch('https://inventariobackend-production.up.railway.app/api/deleteProduct', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productID,
            }),
        })
        const data = await req.json()
        if (data.status === true) {
            alert('Producto eliminado correctamente');
            window.location.reload();
        } else {
            alert(data.message)
        }
    }

    async function loadDetailProduct(productID) {
        const req = await fetch(`https://inventariobackend-production.up.railway.app/api/getProduct/${productID}`)


        const data = await req.json()
        if (!data.status) {
			alert(data.message);
		}
        setProductDetail(data.product)
    }


    async function setCategories() {
        const req = await fetch('https://inventariobackend-production.up.railway.app/api/getCategories')

        const data = await req.json()
        if (!data.status) {
			alert(data.message);
		}
        categories([...data.category, {
            name: 'Todas',
            label: 'Todas',
            value: 'Todas'
        }])
    }

    async function editProductAsync(event) {
        console.log(productID)
        const formdata = new FormData()
        formdata.append('productID', productID)
        formdata.append('name', nameproduct)
        formdata.append('description', descproduct)
        formdata.append('price', precio)
        formdata.append('category', categoryS)
        formdata.append('stock', stock)


        const response = await fetch('https://inventariobackend-production.up.railway.app/api/updateProduct', {
            method: 'PUT',
            body: JSON.stringify({
                productID: productID,
                name: nameproduct,
                category: categoryS,
                description: descproduct,
                price: precio,
                stock: stock
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        const data = await response.json()

        if (data.status) {
            alert('Producto Editado Correctamente');
            window.location.href = 'http://localhost:3000/productos';
        } else {
            alert(data.message)
        }

    }

    const borrar = (id) => {
        deleteProduct(id);
    }

    const handleSelectCategory = ({ name }) => {
        setCategory(name);
    }

    async function filterbyCategory({ name }) {
        setfilterNameCat(name);
        settoggleByCategory(true)
        const req = await fetch(`https://inventariobackend-production.up.railway.app/api/getProductsbyFilter/${name}`)

        const data = await req.json()
        if (!data.status) {
			alert(data.message);
		}
        productos(data.products)
    }

    const masInfo = (id) => {
        loadDetailProduct(id)
        editProduct(false);
        productos([]);
    }

    const limpiarFiltros = () => {
        window.location.reload();
    }

    const editar = (id) => {
        editProduct(true);
        setProductID(id);
        loadDetailProduct(id)
        setCategories();
    }

    const verListado = () => {
        populateQuote();
        editProduct(false);
        setProductDetail(undefined)
    }
    useEffect(() => {
        populateQuote()
        setCategories()
    }, [])

    return (
        <div>
            {product.length > 0 && detailProduct === undefined && editarProduct === false ? <><h1>Listado de Productos</h1>
                <div>
                    <span>Filtrar por Categorias:</span>
                    <Select
                        options={category}
                        defaultValue={{ label: "Todas", value: "Todas" }}
                        onChange={filterbyCategory}
                    />
                </div>

                <div>
                    <span>Filtrar por Nombre:</span>
                    <form onSubmit={filterbyName}>
                        <input
                            value={productNameSearch}
                            onChange={(e) => setproductNameSearch(e.target.value)}
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
                {product.map((e, i) => {
                    let imagen = e.image;
                    return <div key={i} className="product-container">
                        <div className="reporting-container-item">
                            <div className="title-container">
                                <img alt='desceiptio' src={imagen} />
                                <div className="container-information-title">
                                    <div className="title-data">
                                        <h1 className="eventName">Nombre: {e.name}</h1>
                                        <h1 className="eventName">Precio: {e.price} COP$</h1>
                                        <h1 className="eventName">Cantidad en Stock: {e.stock}</h1>
                                    </div>
                                </div>
                            </div >
                        </div >
                        <div className="button-container">
                            <button onClick={() => {
                                borrar(e._id);
                            }}>Borrar Producto</button>
                            <button onClick={() => {
                                editar(e._id);
                            }}>Editar</button>
                            <button onClick={() => {
                                masInfo(e._id);
                            }}>Detalles</button>
                        </div>
                    </div>
                })}</> : ''}

            {product !== undefined && product.length === 0 && detailProduct === undefined && editarProduct === false ?
                <>
                    <div>
                        {toggleByCategory && productNameSearch === '' ? <>
                            <h1>No hay productos en la categoria {filterNameCat}</h1>
                            <div>
                            <button onClick={limpiarFiltros}>Volver <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace" viewBox="0 0 16 16">
                                <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
                                <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z" />
                            </svg></button>
                        </div>
                        </> : ''}

                        {productNameSearch !== '' && toggleByCategory === false ? <>
                            <h1>No hay productos por el nombre {productNameSearch}</h1>
                            <div>
                            <button onClick={limpiarFiltros}>Volver <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace" viewBox="0 0 16 16">
                                <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
                                <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z" />
                            </svg></button>
                        </div>
                        </> : ''}

                        {toggleByCategory && productNameSearch !== '' ? <>
                            <h1>No hay productos en la categoria {filterNameCat} por el nombre {productNameSearch}</h1>
                            <div>
                            <button onClick={limpiarFiltros}>Volver <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace" viewBox="0 0 16 16">
                                <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
                                <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z" />
                            </svg></button>
                        </div>
                        </> : ''}
                    </div>
                </>
                : ''}
            
            {product !== undefined && product.length === 0 && detailProduct === undefined && editarProduct === false && filterNameCat === '' && productNameSearch === '' ?
                <>
                    <h1>No hay productos creados</h1>
                </>
            : ''}

            {detailProduct && !editarProduct ? <>
                <div className="container-detailproduct" style={{ backgroundImage: "url(https://ipmark.com/wp-content/uploads/2016/12/Bodeg%C3%B3n-Productos-del-A%C3%B1o-2017.jpg)" }}>
                    <div className="title-container">
                        <h1>informacion del Producto</h1>
                    </div>
                </div>
                <div>
                    <div className="container-information">
                        <span className="span-desc">Descripcion:</span>
                        <p className="p-desc">{detailProduct.description}</p>
                        <span className="span-pre">Precio:</span>
                        <p className="p-pre">$ {detailProduct.price}</p>
                        <span className="span-stc">Productos en Stock:</span>
                        <p className="p-stc">{detailProduct.stock}</p>
                        <span className="span-cat">Categoria:</span>
                        <p className="p-cat">{detailProduct.category}</p>
                    </div>
                </div>

                <div className="container-buttom">
                    <button onClick={() => {
                        verListado();
                    }}>VOLVER</button>
                </div>
            </> : ''}

            {editarProduct === true && detailProduct ? <>
                <div className="container-detailproduct" style={{ backgroundImage: "url(https://ipmark.com/wp-content/uploads/2016/12/Bodeg%C3%B3n-Productos-del-A%C3%B1o-2017.jpg)" }}>
                    <div className="title-container">
                        <h1>Editar Producto</h1>
                    </div>
                </div>

                <form onSubmit={editProductAsync}>
                    <input
                        value={nameproduct}
                        onChange={(e) => setNameProduct(e.target.value)}
                        type="text"
                        placeholder={detailProduct.name}
                    />
                    <br />
                    <input
                        value={descproduct}
                        onChange={(e) => setDescProduct(e.target.value)}
                        type="text"
                        placeholder={detailProduct.description}
                    />
                    <br />
                    <br />
                    <input
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        type="number"
                        placeholder={detailProduct.price}
                    />
                    <br />
                    <input
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        type="number"
                        placeholder={detailProduct.stock}
                    />
                    <br />
                    <div>
                        <p>Categorias</p>
                        <Select
                            options={category}
                            onChange={handleSelectCategory}
                            placeholder={detailProduct.category}
                        />
                    </div>
                    <input type="submit" value="Editar Producto" />
                </form>

                <div className="container-buttom">
                    <button onClick={() => {
                        verListado();
                    }}>VOLVER</button>
                </div>
            </> : ''}
        </div >
    )
}

export default ListadoDeProductos
