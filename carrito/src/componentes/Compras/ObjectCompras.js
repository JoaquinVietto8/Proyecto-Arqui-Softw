import React from "react";

export const ObjectCompras = (
    { id,
        total,
        id_user,
        fecha,
        OrderDetails
    }) => {
    return (
        <div class="div-compra">
            <p>Id de compra: #{id}</p>
            <p>Fecha: {fecha}</p>
            <hr></hr>
            {
                OrderDetails.map((order_detail) => (
                    <>
                        <a href={`http://localhost:3000/producto/${order_detail.id_product}`}>{order_detail.nombre}</a>
                        <div class="padre-details">
                            <img class="imagen-compra" src={order_detail.picture_url} alt={order_detail.nombre} />
                            <div class="hijo-details">
                                <p>Precio unitario: ${order_detail.precio_unitario}</p>
                                <p>Cantidad: {order_detail.cantidad}</p>
                                <p>Precio total: ${order_detail.total}</p>
                            </div>
                        </div>
                        <hr></hr>
                    </>
                ))
            }
            <h2 id="a">Total: ${total}</h2>
        </div>
    )
}