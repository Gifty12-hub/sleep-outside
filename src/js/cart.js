import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

function renderCartContents() {
  // Get cart from localStorage, default to empty array if none exists
  const cartItems = getLocalStorage("so-cart") || [];

  const productList = document.querySelector(".product-list");
  productList.innerHTML = ""; // Clear container first

  if (cartItems.length === 0) {
    // Show message when cart is empty
    productList.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    // Render cart items
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productList.innerHTML = htmlItems.join("");
  }
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

// Run the function
renderCartContents();

// loads the header and footer 
loadHeaderFooter();

// Initialize the ShoppingCart class
// "so-cart" is the localStorage key, "product-list" is the <ul> in the html 
const cart = new ShoppingCart("so-cart", document.querySelector(".product-list"));

cart.init();
