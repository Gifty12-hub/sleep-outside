import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // the error with the broken cart is here, the syntax only adds and replaces a products,
  // but doesn't keep track of more products when added

  // to fix, we'll first try to get current cart or create an empty cart array if none exists,
  //  then push the new product to it,
  // then save the updated cart back to local storage

  let cart = getLocalStorage("so-cart") || [];

  // to check if any product is already in cart
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Strecth and core activity: same product should increase quantity instead of adding duplicate entries
  // find if product already exists in cart

  // 1. look for existing product in cart with same id
  const existingProduct = cart.find((item) => item.Id === product.Id);

  if (existingProduct) {
    // 2. if found, increase quantity
    existingProduct.quantity = (existingProduct.quantity || 1) + 1;
  } else {
    // 3. if not found, add new product with quantity 1
    product.quantity = 1;
    cart.push(product);
  }

  // set the cart in the local Storage
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
