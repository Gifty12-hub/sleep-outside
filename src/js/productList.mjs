import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">  <!-- Uppercase Id, leading / for consistency -->
      <img src="${product.Images?.PrimaryMedium || ''}" alt="Image of ${product.Name}" />  <!-- Fixed to Images.PrimaryMedium -->
      <h2 class="card__brand">${product.Brand?.Name || 'Unknown'}</h2>
      <h3 class="card__name">${product.NameWithoutBrand || product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice?.toFixed(2) || 'N/A'}</p>
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
        this.list = await this.dataSource.getData(this.category); // Added this.category
        this.renderList(this.list);
    }
    renderList(list) {
        //reuseable utility function
        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    }
}