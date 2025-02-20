// Reducer
export function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      // Verificar si el producto ya está en el carrito
      // Si ya está se suma uno a su cantidad
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Si no está, agregarlo al carrito
      return [
        ...state, 
        { ...action.payload, quantity: 1 }
    ];

    case "delete":
      // Filtrar el producto que se quiere eliminar
      return state.filter(item => item.id !== action.payload.id);

    case "update":
      // Actualizar la cantidad de un producto
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
  }
}