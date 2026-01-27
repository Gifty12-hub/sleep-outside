import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Load Header/footer
loadHeaderFooter();

// Getting the category from the URL
const category = getParam("category") || "tents";

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, listElement);

myList.init();