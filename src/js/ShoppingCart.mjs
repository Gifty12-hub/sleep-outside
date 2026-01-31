import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

function ShoppingCartTemplate(product) {
    const imageSrc = product.Images?.PrimaryMedium || product.Image || "";
    const productName = product.NameWithoutBrand || product.Name || "Unknown Product";

    return `<li class="cart-card divider">
    <span class="cart-card__remove" data-id="${product.Id}">X</span>
    <a href="/product_pages/index.html?product=${product.Id}" class="cart-card__image">
      <img src="${imageSrc}" alt="Image of ${productName}" />
    </a>
    <a href="#">
      <h2 class="card__name">${productName}</h2>
    </a>
    <p class="cart-card__color">${product.Colors?.[0]?.ColorName || ""}</p>
    <p class="cart-card__quantity">qty: ${product.Quantity || 1}</p>
    <p class="cart-card__price">$${product.FinalPrice?.toFixed(2) || "N/A"}</p>
  </li>`;
}

export default class ShoppingCart {
    constructor(key, listElement) {
        this.key = key;
        this.listElement = listElement;
    }

    async init() {
        const list = getLocalStorage(this.key);

        if (list && list.length > 0) {
            this.renderList(list);
            this.calculateCartTotal(list);

            // Add listener to the parent container (Event Delegation)
            this.listElement.addEventListener("click", (e) => {
                if (e.target.classList.contains("cart-card__remove")) {
                    const id = e.target.dataset.id;
                    this.removeItem(id);
                }
            });
        } else {
            this.showEmptyMessage();
        }
    }

    removeItem(id) {
        // 1. Get the current cart items
        let list = getLocalStorage(this.key);

        // 2. Find the index of the first matching item
        const index = list.findIndex(item => item.Id === id);

        if (index > -1) {
            // 3. Remove that one item
            list.splice(index, 1);

            // 4. Update local storage
            setLocalStorage(this.key, list);

            // 5. Re-render the cart
            // We call init() again to refresh the list and recalculate the total
            this.init();
        }
    }

    showEmptyMessage() {
        this.listElement.innerHTML = "<li>Your Cart Is Empty</li>";
        const footer = document.querySelector(".cart-footer");
        if (footer) footer.classList.add("hide");
    }

    renderList(list) {
        renderListWithTemplate(ShoppingCartTemplate, this.listElement, list, "afterbegin", true);
    }

    calculateCartTotal(list) {
        // Updated to account for Quantity if you are using it
        const total = list.reduce((sum, item) => sum + (item.FinalPrice * (item.Quantity || 1)), 0);

        const cartFooter = document.querySelector(".cart-footer");
        const totalElement = document.querySelector(".cart-total");

        if (cartFooter && totalElement) {
            totalElement.innerText = `Total: $${total.toFixed(2)}`;
            cartFooter.classList.remove("hide");
        }
    }
}