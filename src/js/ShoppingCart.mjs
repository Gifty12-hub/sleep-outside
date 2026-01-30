import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

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
    constructor(key, listElement) {
        this.key = key; // "so-cart"
        this.listElement = listElement;
    }
    async init() {
        // Getting selected products from local storage
        const list = getLocalStorage(this.key);

        // Inspect if there are items in the cart
        if (list && list.length > 0) {
            this.renderList(list);
            this.calculateCartTotal(list)  // Handles the total footer
        } else {
            this.listElement.innerHTML = "<li>Your Cart Is Empty </li>";
            // Ensuring footer stays hidden if cart is empty
            document.querySelector(".cart-footer").classList.add("hide");
        }
    }
    renderList(list) {
        //reuseable utility function
        renderListWithTemplate(ShoppingCartTemplate, this.listElement, list, "afterbegin", true);
    }

    calculateCartTotal(list) {
        const total = list.reduce((sum, item) => sum + item.FinalPrice, 0);

        const cartFooter = document.querySelector(".cart-footer");
        const totalElement = document.querySelector(".cart-total");

        if (cartFooter && totalElement) {
            // Update the numbers
            totalElement.innerText = `Total: $${total.toFixed(2)}`;
            // Show the whole container
            cartFooter.classList.remove("hide");
        }
    }
};
