import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();
const productID = getParam("product");

if (productID) {
  const product = new ProductDetails(productID, dataSource);
  product.init();
} else {
  // Optionally, show error message in UI
  console.error("No product ID found in URL");
}
