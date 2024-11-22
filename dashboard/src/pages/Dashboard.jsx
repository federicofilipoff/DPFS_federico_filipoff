import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Table from "../components/Table";
import CategoryPieChart from "../components/CategoryPieChart";
import "../styles/dashboard.css";
import { fetchUsers, fetchProducts } from "../services/api";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [lastUser, setLastUser] = useState(null);
  const [lastProduct, setLastProduct] = useState(null);
  const [latestSales, setLatestSales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [totalUnitsSold, setTotalUnitsSold] = useState(0);
  const [totalSalesAmount, setTotalSalesAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener usuarios
        const userResponse = await fetchUsers();
        setTotalUsers(userResponse.count);
        if (userResponse.users.length > 0) {
          setLastUser(userResponse.users[userResponse.users.length - 1]);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error.message);
      }

      try {
        // Obtener productos y datos relacionados
        const productResponse = await fetchProducts();
        setTotalProducts(productResponse.count);
        setCategories(productResponse.countByCategory);
        setProducts(productResponse.products);

        // Último producto creado
        if (productResponse.products.length > 0) {
          setLastProduct(
            productResponse.products[productResponse.products.length - 1]
          );
        }

        // Nuevos datos desde la API
        setTotalUnitsSold(productResponse.totalUnitsSold || 0);
        setTotalSalesAmount(productResponse.totalSalesAmount || 0);
        setLatestSales(productResponse.latestSales || []);
        setTopProducts(productResponse.topProducts || []);
      } catch (error) {
        console.error("Error al obtener productos:", error.message);
      }
    };

    fetchData();
  }, []);

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
        <Card title="Total de Unidades Vendidas" value={totalUnitsSold} />
        <Card
          title="Monto Total de Ventas"
          value={`$${totalSalesAmount.toFixed(2)}`}
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
          headers={["ID", "Nombre", "Descripción"]}
          data={products.map((prod) => ({
            ID: prod.id,
            Nombre: prod.name,
            Descripción: prod.description,
          }))}
        />
      </div>

      {/* Tabla de Últimas Ventas */}
      <div className="list-container">
        <h2>Últimas Ventas</h2>
        <Table
          headers={["Producto", "Cantidad", "Total", "Fecha"]}
          data={latestSales.map((sale) => ({
            Producto: sale.productName,
            Cantidad: sale.quantity,

            Total:
              typeof sale.total === "number"
                ? `$${sale.total.toFixed(2)}`
                : `$${sale.total}`,
            Fecha: new Date(sale.saleDate).toLocaleDateString(),
          }))}
        />
      </div>

      {/* Tabla de Top 5 Productos Vendidos (unidades) */}
      <div className="list-container">
        <h2>Top 5 Productos Más Vendidos (unidades)</h2>
        <Table
          headers={["Producto", "Unidades Vendidas"]}
          data={topProducts.map((product) => {
            return {
              Producto: product.productName,
              "Unidades Vendidas": product.totalSold,
            };
          })}
        />
      </div>
    </div>
  );
};

export default Dashboard;
