export async function fetchProducts() {
  try {
    const res = await axios.get("http://localhost:3000/productos/");
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function createProduct(product) {
  try {
    const response = await axios.post(
      `http://localhost:3000/productos/`,
      product
    );
    console.log("response create", response.data);
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    alert("Hubo un error al crear el producto. Por favor, inténtalo de nuevo.");
  }
}

export async function saveProduct(productid) {
  try {
    const response = await axios.put(
      `http://localhost:3000/productos/${productid.id}`,
      {
        ...productid,
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    alert(
      "Hubo un error al actualizar el producto. Por favor, inténtalo de nuevo."
    );
  }
}

export async function deleteProduct(deleteId) {
  try {
    await axios.delete(`http://localhost:3000/productos/${deleteId}`);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    alert(
      "Hubo un error al eliminar el producto. Por favor, inténtalo de nuevo."
    );
  }
}
