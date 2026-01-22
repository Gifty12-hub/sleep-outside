import ProductDetails from "./ProductDetails.mjs";
import { getParam } from "./utils.mjs";

// Universal data source that searches across all three JSON files
class UniversalProductData {
  async findProductById(id) {
    const categories = ["tents", "sleeping-bags", "backpacks"];
    for (const cat of categories) {
      try {
        const response = await fetch(`/json/${cat}.json`);
        if (!response.ok) continue;
        let data = await response.json();
        // Normalize: backpacks/sleeping-bags have .Result array
        const products = data.Result || data;
        const product = products.find((item) => item.Id === id);
        if (product) {
          // Normalize image (backpacks use PrimaryLarge)
          product.Image = product.Images?.PrimaryLarge || product.Images?.PrimaryMedium || product.Image || "/images/placeholder.jpg";
          // Ensure Colors is array
          if (!Array.isArray(product.Colors)) product.Colors = [];
          return product;
        }
      } catch (err) {
        console.error(`Error loading ${cat}.json:`, err);
      }
    }
    return null; // Not found in any category
  }
}

const dataSource = new UniversalProductData();
const productId = getParam("product");

if (productId) {
  const productDetails = new ProductDetails(productId, dataSource);
  productDetails.init();
} else {
  document.querySelector("main").innerHTML = "<h2 style='text-align:center;color:red;'>No product ID provided.</h2>";
}