// main.js
import "../css/style.css";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./productList.mjs";
import Alert from "./alerts.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// External Services Initialization (API handler)
const services = new ExternalServices();

// Shopping Cart Initialization
// Using 'services' now instead of the old ProductData
const cartElement = document.querySelector("#shopping-cart-list");
const shoppingCart = new ShoppingCart("so-cart", services, cartElement);
shoppingCart.init();

// Helper class to accept full path and normalize data (Result array vs direct array)
// This is used for your local JSON files
class FixedProductData {
    constructor(path) {
        this.path = path;
    }
    async getData() {
        const response = await fetch(this.path);
        if (!response.ok) throw new Error("Bad Response");
        const data = await response.json();
        return "Result" in data ? data.Result : data; // Handles backpacks/sleeping-bags vs tents
    }
    async findProductById(id) {
        const products = await this.getData();
        return products.find((item) => item.Id === id);
    }
}

// Tents
const tentsData = new FixedProductData("/json/tents.json");
const tentsElement = document.querySelector("#tents-list");
const tentList = new ProductList("tents", tentsData, tentsElement);
if (tentsElement) tentList.init();

// Sleeping Bags
const bagsData = new FixedProductData("/json/sleeping-bags.json");
const bagsElement = document.querySelector("#bags-list");
const bagList = new ProductList("sleeping-bags", bagsData, bagsElement);
if (bagsElement) bagList.init();

// Backpacks
const packsData = new FixedProductData("/json/backpacks.json");
const packsElement = document.querySelector("#packs-list");
const packList = new ProductList("backpacks", packsData, packsElement);
if (packsElement) packList.init();

// Load header and footer
loadHeaderFooter();

// creating the alert instance
const alerts = new Alert();
// Initializing alerts
alerts.init();