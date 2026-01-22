import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");

// Testing if the getParam function is running successfully
const productId = getParam("product");

// to check if there is a product id in the URL
if (productId) {
  const productDetails = new ProductDetails(productId, dataSource);
  productDetails.init();
} else {
  document.querySelector(".product-detail").innerHTML =
    "<p>Product Not Found. Missing or Invalid Product found in the URL</p>"
}

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