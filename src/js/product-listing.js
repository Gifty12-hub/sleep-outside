import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./productList.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();

// Fix title and h1 with category (e.g., "Top Products: Backpacks")
if (category) {
  const capitalizedCategory = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  document.title = `Top Products: ${capitalizedCategory} | Sleep Outside`;
  const h1 = document.querySelector("main h1");
  if (h1) {
    h1.textContent = `Top Products: ${capitalizedCategory}`;
  }
}
