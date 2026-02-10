import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

async function initCartPage() {
  try {
    // Load shared header & footer first
    await loadHeaderFooter();

    // Get the container where products should be rendered
    const listElement = document.querySelector(".product-list");

    if (!listElement) {
      console.error("Cart product list container (.product-list) not found");
      return;
    }
    // Initialize the cart
    const cart = new ShoppingCart("so-cart", listElement);
    await cart.init();

    console.log("Cart page initialized");
  } catch (error) {
    console.error("Failed to initialize cart page:", error);
  }
}

// Run when the page is ready
initCartPage();
