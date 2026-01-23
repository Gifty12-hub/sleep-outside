import { renderListWithTemplate } from "./utils.mjs";

function ShoppingCartTemplate(product) {
    const imageSrc = product.Images?.PrimaryLarge || product.Image || "";
    const productName = product.NameWithoutBrand || product.Name || "Unknown Product";

    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${imageSrc}" alt="Image of ${productName}" />
      <h2 class="card__brand">${product.Brand?.Name || "Unknown Brand"}</h2>
      <h3 class="card__name">${productName}</h3>
      <p class="product-card__price">$${product.FinalPrice?.toFixed(2) || "N/A"}</p>
    </a>
  </li>`;
}

//adding the shopping cart class
export default class ShoppingCart {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        this.list = await this.dataSource.getData();
        this.renderList(this.list);
    }
    renderList(list) {
        //reuseable utility function
        renderListWithTemplate(ShoppingCartTemplate, this.listElement, list, "afterbegin", true);
    }
}
