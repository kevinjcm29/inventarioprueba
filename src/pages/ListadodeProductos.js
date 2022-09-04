import React, { useEffect } from 'react'
import { useState } from 'react'
import Select from 'react-select'

const ListadoDeProductos = () => {
    const [product, productos] = useState([])
    const [detailProduct, setProductDetail] = useState()
    const [editarProduct, editProduct] = useState(false)
    const [category, categories] = useState()
    const [nameproduct, setNameProduct] = useState('')
	const [descproduct, setDescProduct] = useState('')
	const [precio, setPrecio] = useState('')
	const [categoryS, setCategory] = useState('')
    const [stock, setStock] = useState('')
    const [productID, setProductID] = useState();


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
        const data = await req.json()
        if (data.status === true) {
            alert('Producto eliminado correctamente');
            window.location.reload();
        }
    }

    async function loadDetailProduct(productID) {
        const req = await fetch(`http://localhost:1337/api/getProduct/${productID}`)


        const data = await req.json()
        setProductDetail(data.product)
    }


    async function setCategories() {
        const req = await fetch('http://localhost:1337/api/getCategories')

        const data = await req.json()
        categories(data.category)
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


		const response = await fetch('http://localhost:1337/api/updateProduct', {
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
            console.log('nofunca')
        }

	}

    const borrar = (id) => {
        deleteProduct(id);
    }

    const handleSelectCategory = ( {name} ) => {
		setCategory(name);
	}

    const masInfo = (id) => {
        loadDetailProduct(id)
        editProduct(false);
        productos([]);
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
    }, [])

    return (
        <div>
            {product.length > 0 && detailProduct === undefined && editarProduct === false ? <><h1>Listado de Productos</h1>
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


            {detailProduct && !editarProduct ? <> 
                <div className="container-detailproduct" style={{backgroundImage: "url(https://ipmark.com/wp-content/uploads/2016/12/Bodeg%C3%B3n-Productos-del-A%C3%B1o-2017.jpg)"}}>
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
                <div className="container-detailproduct" style={{backgroundImage: "url(https://ipmark.com/wp-content/uploads/2016/12/Bodeg%C3%B3n-Productos-del-A%C3%B1o-2017.jpg)"}}>
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
						options = {category}
                        onChange = {handleSelectCategory}
                        placeholder= {detailProduct.category}
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
