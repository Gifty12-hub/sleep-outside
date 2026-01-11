import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Retrieve the current cart from localStorage
  let cart = JSON.parse(localStorage.getItem("so-cart"));

  // If cart is missing or not an array, reset it
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Add the new product
  cart.push(product);

  // Save the updated cart back to localStorage
  setLocalStorage("so-cart", cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
