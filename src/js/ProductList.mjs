import { renderListWithTemplate } from "./utils/rendering.mjs";
function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.id}" class="product-card__link">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}" class="product-card__image"/>
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`
}
//adding the product list class
export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        this.list = await this.dataSource.getProductList(this.category);
        this.renderList(this.list);
    }
    renderList(list) {
        //reuseable utility function
        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    }
}
