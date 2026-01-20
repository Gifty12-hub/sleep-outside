import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
//creating an instance of ProductData class
const dataSource = new ProductData();
//creating an instance of ProductList class
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tent", dataSource, listElement);
//initializing the product list
productList.init();