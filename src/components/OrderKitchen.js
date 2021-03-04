import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '../components/Button/Button';
import InnerHeader from './InnerHeader';
import { Link } from 'react-router-dom'

const OrderKitchen = () => {
    const professional = localStorage.getItem("name")
    const token = localStorage.getItem("token")
    const [order, setOrder] = useState('')
    const ordersList = useRef(false);

    const handleSubmit = (itemId) => {
        fetch(`https://lab-api-bq.herokuapp.com/orders/${itemId}`, {
            method: "PUT",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
            body: JSON.stringify({
                "status": `Entregue`
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
            })
    }

    const getOrders = useCallback(async () => {
        fetch("https://lab-api-bq.herokuapp.com/orders", {
            headers: {
                "accept": "application/json",
                "Authorization": `${token}`
            },
        })
            .then((response) => response.json())
            .then((json) => {
                const order = json.filter(item => item.status === `pronto`)
                setOrder(order)
            })
            // eslint-disable-next-line
    }, [ order, token])

    useEffect(() => {
        if (!ordersList.current) {
            getOrders();
            ordersList.current = true;
        }
        return () => { ordersList.current = false }
    }, [getOrders]);

    return (
        <>

            <Link to = './hall'>
            <Button type="submit">Home</Button>
            </Link>
            <InnerHeader professional={professional}/>
            <div className="kitchen">
                <div className="ordersList">
                    {order && order.map(function (item) {
                        return (
                            <div className="EachOrder" key={item.id}>
                                <p>Status: {item.status}</p>
                                <p>Cliente: {item.client_name} Mesa: {item.table}</p>
                                <p>Data e hora: {item.createdAt}</p>
                                <div>Produtos: {item.Products.map(function (product) {
                                    return (
                                        <div>
                                            <p>{product.name} {product.flavor} {product.complement} - Quantidade: {product.qtd}</p>
                                        </div>
                                    )
                                })}
                                </div>
                                <button className="Button" onClick={() => handleSubmit(item.id)}>Pedido Entregue</button>
                                ______________________________________________________
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </>
    )
}

export default OrderKitchen;