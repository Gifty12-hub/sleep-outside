
import "../css/style.css"; 
import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";
import { loadHeaderFooter, getParam, qs } from "./utils.mjs";

// Load header and footer
loadHeaderFooter();

// this js file will display product lists dynamically with API not json data anymore

// Use the getParam function to get the category from the URL

const category = getParam("category") || "tents"; // default to "tents" if no category is provided

const dataSource = new ProductData(); //ensures no product data if API is changed

const listElement = qs(".product-list");

const myList = new ProductList(category, dataSource, listElement);

// initializing the product list
myList.init();

// updating product titles with "Top Products | category name"

const titleElement = qs("#category-title");

if (titleElement && category) {
    const formattedCategory =
        category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ");

    titleElement.textContent = `Top Products: ${formattedCategory}`;
}


