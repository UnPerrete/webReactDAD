import React, { useReducer } from "react";
import { cartReducer } from "./cartReducer";

// Estado inicial
const initialState = [];

// Productos de ejemplo
const products = [
    { id: 1, name: "Fuet", price: 10 },
    { id: 2, name: "Cepillo de dientes", price: 3 },
    { id: 3, name: "El Mal Querer", price: 22 },
    { id: 4, name: "Pajitas de plástico para matar tortugas", price: 1 },
];

// Componente principal
export function ShoppingCart() {
    const [cart, dispatch] = useReducer(cartReducer, initialState);

    // Handlers para las acciones
    const addItem = product => {
        const action = {
            type: "add",
            payload: product
        }
        dispatch(action);
    };

    const removeItem = productId => {
        const action = {
            type: "delete",
            payload: {id : productId}
        }
        dispatch(action);
    };

    const updateQuantity = (productId, quantity) => {
        const action = {
            type: "update",
            payload: {id: productId, quantity}
        }
        dispatch(action);
    };

    return (
        <div className="text-start">
            <h1>Carrito de Compras</h1>

            {/* Lista de productos */}
            <h2>Productos</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {/*"Nombre" - "Precio" x "Cantidad"*/}
                        {product.name} - {product.price}€{" "}
                        {/*
                        Cada elemento tiene un botón agregar, que llama a addItem enviandole el producto,
                        addItem agrega el producto al carrito.
                        */}
                        <button onClick={() => addItem(product)}>Agregar</button>
                    </li>
                ))}
            </ul>

            {/* Carrito */}
            <h2>Carrito</h2>
            {cart.length === 0 ? (
                <p>Agrega un producto</p>
            ) : (
                <ul>
                    {cart.map(item => (
                        <li key={item.id}>
                            {item.name} - {item.price}€ x {item.quantity}
                            <button onClick={() => removeItem(item.id)}>Eliminar</button>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                +
                            </button>
                            <button
                                onClick={() =>
                                    updateQuantity(item.id, item.quantity > 1 ? item.quantity - 1 : 1)
                                }
                            >
                                -
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Total */}
            <h2>
                {/*0 es el valor predeterminado asignado a la variable total (que se crea aquí)*/}
                Total: {cart.reduce((total, item) => total + item.price * item.quantity, 0)}€
            </h2>
           
        </div>
        
    );
}

export default ShoppingCart;
