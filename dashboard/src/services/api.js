// Puerto del Back-end
const BASE_URL = "http://localhost:3000";

// Servicios para la API de Usuarios
export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/api/users/`);
  if (!response.ok) throw new Error("Error al obtener usuarios");
  return await response.json();
};

export const fetchUserDetail = async (id) => {
  const response = await fetch(`${BASE_URL}/api/users/${id}`);
  if (!response.ok) throw new Error("Error al obtener el detalle del usuario");
  return await response.json();
};

// Servicios para la API de Productos
export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/api/products/`);
  if (!response.ok) throw new Error("Error al obtener productos");
  return await response.json();
};

export const fetchProductDetail = async (id) => {
  const response = await fetch(`${BASE_URL}/api/products/${id}`);
  if (!response.ok) throw new Error("Error al obtener el detalle del producto");
  return await response.json();
};
