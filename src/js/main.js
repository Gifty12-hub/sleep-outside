
// main.js
import "../css/style.css";
import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";

// Tents
const tentsData = new ProductData("/json/tents.json");

const tentsElement = document.querySelector("#tents-list");
const tentList = new ProductList("tents", tentsData, tentsElement);
tentList.init();

// Sleeping Bags
const bagsData = new ProductData("/json/sleeping-bags.json");
const bagsElement = document.querySelector("#bags-list");
const bagList = new ProductList("sleeping-bags", bagsData, bagsElement);
bagList.init();

// Backpacks
const packsData = new ProductData("/json/backpacks.json");
const packsElement = document.querySelector("#packs-list");
const packList = new ProductList("backpacks", packsData, packsElement);
packList.init();
import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";
import Alert from "./alerts.mjs";

//creating an instance of ProductData class
const dataSource = new ProductData("tents");

//creating an instance of ProductList class
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, listElement);

//initializing the product list
productList.init();

// creating the alert instance
const alerts = new Alert();
// Initializing alerts
alerts.init();
