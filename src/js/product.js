import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
// Testing if the getParam function is running successfully
const productId = getParam("product");

const product = ProductDetails(productId, dataSource);
product.init();

// add to cart button event handler
//async function addToCartHandler(e) {
// const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
// console.log(dataSource.findProductById(productId));
