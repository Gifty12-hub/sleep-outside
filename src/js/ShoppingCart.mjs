import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function ShoppingCartTemplate(product) {
    const imageSrc = product.Images?.PrimaryMedium || product.Image || "/images/placeholder.jpg";
    const productName = product.NameWithoutBrand || product.Name || "Unknown Product";
    const price = Number(product.FinalPrice) || 0;

    return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${imageSrc}" alt="${productName}" />
        <h2 class="card__brand">${product.Brand?.Name || "Unknown Brand"}</h2>
        <h3 class="card__name">${productName}</h3>
        <p class="product-card__price">$${price.toFixed(2)}</p>
      </a>
    </li>
  `;
}

export default class ShoppingCart {
    constructor(key, listElement) {
        this.key = key;           // "so-cart"
        this.listElement = listElement;
    }

    async init() {
        const list = getLocalStorage(this.key) || [];

        console.log("Cart items loaded:", list);           // ← debug
        console.log("Number of items:", list.length);

        if (list.length > 0) {
            this.renderList(list);
            this.calculateCartTotal(list);
            document.querySelector(".cart-footer")?.classList.remove("hide");
            document.querySelector(".empty-cart-message")?.classList.add("hide");
        } else {
            this.listElement.innerHTML = '';
            document.querySelector(".cart-footer")?.classList.add("hide");
            document.querySelector(".empty-cart-message")?.classList.remove("hide");
        }
    }

    renderList(list) {
        renderListWithTemplate(ShoppingCartTemplate, this.listElement, list, "afterbegin", true);
    }

    calculateCartTotal(list) {
        const total = list.reduce((sum, item) => {
            const price = Number(item.FinalPrice) || 0;
            return sum + price;
        }, 0);

        console.log("Calculated total:", total);  // ← debug

        const totalElement = document.querySelector(".cart-total");
        if (totalElement) {
            totalElement.textContent = `$${total.toFixed(2)}`;
        }
    }
}