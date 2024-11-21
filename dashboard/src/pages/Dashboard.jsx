import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Table from "../components/Table";
import CategoryPieChart from "../components/CategoryPieChart"; // Importar la gráfica
import "../styles/dashboard.css";
import { fetchUsers, fetchProducts } from "../services/api";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [lastUser, setLastUser] = useState(null);
  const [lastProduct, setLastProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetchUsers();
        setTotalUsers(userResponse.count);
        if (userResponse.users.length > 0) {
          setLastUser(userResponse.users[userResponse.users.length - 1]);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error.message);
      }

      try {
        const productResponse = await fetchProducts();
        setTotalProducts(productResponse.count);
        setCategories(productResponse.countByCategory);
        setProducts(productResponse.products);
        if (productResponse.products.length > 0) {
          setLastProduct(
            productResponse.products[productResponse.products.length - 1]
          );
        }
      } catch (error) {
        console.error("Error al obtener productos:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(products.filter((prod) => prod.id !== id));
        alert("Producto eliminado con éxito");
      } else {
        console.error("Error al eliminar el producto");
        alert("No se pudo eliminar el producto.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    }
  };

  return (
    <div className="dashboard">
      {/* Paneles principales */}
      <div className="cards-container">
        <Card title="Total de Usuarios" value={totalUsers} />
        <Card title="Total de Productos" value={totalProducts} />
        <Card
          title="Total de Categorías"
          value={Object.keys(categories).length}
        />
      </div>

      {/* Paneles de detalle */}
      <div className="detail-panels">
        {lastUser && (
          <Card
            title="Último Usuario Creado"
            value={`Nombre: ${lastUser.name}, Email: ${lastUser.email}`}
          />
        )}
        {lastProduct && (
          <Card
            title="Último Producto Creado"
            value={`Nombre: ${lastProduct.name}, Descripción: ${lastProduct.description}`}
          />
        )}
      </div>

      {/* Tabla de Categorías */}
      <div className="details-container">
        <h2>Categorías y Productos</h2>
        <Table
          headers={["Categoría", "Total de Productos"]}
          data={Object.entries(categories).map(([category, total]) => ({
            Categoría: category,
            Total: total,
          }))}
        />
        <CategoryPieChart categories={categories} /> {/* Gráfica */}
      </div>

      {/* Tabla de Productos con eliminar */}
      <div className="list-container">
        <h2>Listado de Productos</h2>
        <Table
          headers={["ID", "Nombre", "Descripción", "Acciones"]}
          data={products.map((prod) => ({
            ID: prod.id,
            Nombre: prod.name,
            Descripción: prod.description,
            Acciones: (
              <button
                onClick={() => handleDelete(prod.id)}
                className="delete-button"
              >
                Eliminar
              </button>
            ),
          }))}
        />
      </div>
    </div>
  );
};

export default Dashboard;
