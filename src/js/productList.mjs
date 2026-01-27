import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    const imageSrc = product.Images?.PrimaryMedium || product.Image || "";
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

//adding the product list class
export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        this.list = await this.dataSource.getData(this.category);

        // Updating the page title
        this.updateTitle();
        this.renderList(this.list);
    }

    updateTitle() {
        // Find the title element and update it
        const titleElement = document.querySelector(".title");
        if (titleElement) {
            // Capitalize the first letter of the category for a cleaner look
            const categoryName = this.category.charAt(0).toUpperCase() + this.category.slice(1);
            titleElement.innerHTML = `Top Products: ${categoryName.replace("-", " ")}`;
        }
    }
    renderList(list) {
        //reuseable utility function
        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    }
}
