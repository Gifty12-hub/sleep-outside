import "../css/style.css";
import ProductList from "./productList.mjs";
import ProductData from "./ProductData.mjs"; // uses API now
import { loadHeaderFooter } from "./utils.mjs";

// 1. Get category from URL (default to tents)
const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "tents";

// 2. Select container (matches productList.mjs template)
const productElement = document.querySelector(".product-list");

// 3. Create ProductData instance (fetches from API)
const dataSource = new ProductData();

// 4. Create ProductList instance and initialize
const productList = new ProductList(category, dataSource, productElement);
productList.init();

// 5. Load header and footer
loadHeaderFooter();
