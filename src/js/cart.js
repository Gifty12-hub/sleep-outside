import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// loads the header and footer 
loadHeaderFooter();

// Initialize the ShoppingCart class
// "so-cart" is the localStorage key, "product-list" is the <ul> in the html 
const cart = new ShoppingCart("so-cart", document.querySelector(".product-list"));

cart.init();