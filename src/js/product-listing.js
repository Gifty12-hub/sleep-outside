import "../css/style.css";
import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";
import { loadHeaderFooter, getParam, qs } from "./utils.mjs";

// Load header and footer
loadHeaderFooter();

// Get URL params
const searchTerm = getParam("q")?.trim(); // Trim whitespace
const category = getParam("category") || "tents"; // Default category

const dataSource = new ProductData();
const listElement = qs(".product-list");

// We instantiate ProductList mainly to reuse its renderList method
const myList = new ProductList(category, dataSource, listElement);

async function loadProducts() {
  let products = [];
  let pageTitle = "Top Products";

  if (searchTerm) {
    // Searching — fetch and filter all products
    products = await dataSource.searchProducts(searchTerm);
    pageTitle = products.length
      ? `Search Results for "${searchTerm}" (${products.length} found)`
      : `No results found for "${searchTerm}"`;
  } else {
    // Normal category view
    products = await dataSource.getData(category);
    const formattedCategory =
      category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ");
    pageTitle = `Top Products: ${formattedCategory}`;
  }

  // Update page title
  const titleElement = qs("#category-title");
  if (titleElement) {
    titleElement.textContent = pageTitle;
  }

  // Render or show message
  if (products.length === 0) {
    listElement.innerHTML = searchTerm
      ? `<p>No products found matching "${searchTerm}". Try different keywords.</p>`
      : `<p>No products available in this category.</p>`;
  } else {
    // Reuse ProductList's renderList (it clears and renders with template)
    myList.renderList(products);
  }
}
// Load products on page load
loadProducts();
