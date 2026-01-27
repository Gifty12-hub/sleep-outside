import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Loads the header and footer
loadHeaderFooter();

// 1. Use the standard ProductData
const dataSource = new ProductData();
const productId = getParam("product");

if (productId) {
  // 2. Initializing the product details logic
  const productDetails = new ProductDetails(productId, dataSource);
  productDetails.init();
} else {
  document.querySelector("main").innerHTML =
    "<h2 style='text-align:center;color:red;'>No product ID provided.</h2>";
}