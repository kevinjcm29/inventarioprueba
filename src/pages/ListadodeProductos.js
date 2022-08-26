import React, { useEffect } from 'react'
import { useState } from 'react'

const ListadoDeProductos = () => {
    const [product, productos] = useState([])
    const [detailProduct, setProductDetail] = useState()
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

    const borrar = (id) => {
        deleteProduct(id);
    }

    const masInfo = (id) => {
        loadDetailProduct(id)
        productos([]);
    }

    const verListado = () => {
        populateQuote();
        setProductDetail(undefined)
    }
    useEffect(() => {
        populateQuote()
    }, [])


    console.log(detailProduct)

    return (
        <div>
            {product.length > 0 && detailProduct === undefined ? <><h1>Listado de Productos</h1>
                {product.map(e => {
                    let imagen = e.image;
                    return <div className="product-container">
                        <div className="reporting-container-item">
                            <div className="title-container">
                                <img alt='desceiptio' src={imagen} />
                                <div className="container-information-title">
                                    <div className="title-data">
                                        <h1 className="eventName">Nombre: {e.name}</h1>
                                        <h1 className="eventName">Precio: {e.price}$</h1>
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
                                masInfo(e._id);
                            }}>Detalles</button>
                        </div>
                    </div>
                })}</> : ''}


            {detailProduct ? <> 
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
        </div >
    )
}

export default ListadoDeProductos
