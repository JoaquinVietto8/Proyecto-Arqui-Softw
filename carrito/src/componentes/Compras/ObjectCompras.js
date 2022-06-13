import React from "react";

export const ObjectCompras = (
    { id,
        total,
        id_user,
        fecha,
    }) => {
    return (
        <div>
            {id}
            {total}
            {id_user}
            {fecha}
        </div>
    )
}