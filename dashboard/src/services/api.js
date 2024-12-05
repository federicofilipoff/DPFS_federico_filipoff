// Puerto del Back-end
const BASE_URL = "http://localhost:3000";

// Configuración base para solicitudes protegidas
const fetchWithCredentials = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("Acceso denegado: permisos insuficientes");
    } else if (response.status === 401) {
      throw new Error("No autenticado: inicie sesión");
    }
    throw new Error("Error al realizar la solicitud");
  }
  return await response.json();
};

// Servicios para la API de Usuarios
export const fetchUsers = async () => {
  return await fetchWithCredentials(`${BASE_URL}/api/users/`);
};

// Servicios para la API de Productos
export const fetchProducts = async () => {
  return await fetchWithCredentials(`${BASE_URL}/api/products/`);
};

// export const fetchUserDetail = async (id) => {
//   return await fetchWithCredentials(`${BASE_URL}/api/users/${id}`);
// };

// export const fetchProductDetail = async (id) => {
//   return await fetchWithCredentials(`${BASE_URL}/api/products/${id}`);
// };
