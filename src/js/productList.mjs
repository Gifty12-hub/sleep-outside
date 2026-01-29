import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    const imageSrc = product.Images?.PrimaryMedium || product.Images?.PrimaryLarge || product.Image || "";
    const productName = product.NameWithoutBrand || product.Name || "Unknown Product";

    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${imageSrc}" alt="Image of ${productName}" />
      <h2 class="card__brand">${product.Brand?.Name || product.Name}</h2>
      <h3 class="card__name">${productName}</h3>
      <p class="product-card__price">$${product.FinalPrice?.toFixed(2) || "N/A"}</p>
    </a>
  </li>`;
}

//adding the product list class
export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        // after switching to API, fetch data from API, the getData function needs "this.category" as parameter
        this.list = await this.dataSource.getData(this.category);
        this.renderList(this.list);
    }
    renderList(list) {
        //reuseable utility function
        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    }
}
