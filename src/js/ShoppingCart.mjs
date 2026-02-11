import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

function ShoppingCartTemplate(product) {
    const imageSrc = product.Images?.PrimaryMedium || product.Image || "";
    const name = product.NameWithoutBrand || product.Name || "Unknown Product";
    const brand = product.Brand?.Name || "Unknown";
    const price = Number(product.FinalPrice) || 0;
    const qty = Number(product.quantity) || 1;
    const lineTotal = (price * qty).toFixed(2);

    return `
        <li class="product-card cart-item" data-id="${product.Id}">
            <div class="cart-item-image">
                <a href="/product_pages/index.html?product=${product.Id}">
                    <img src="${imageSrc}" alt="${name}" />
                </a>
            </div>
            
            <div class="cart-item-details">
                <h2 class="card__brand">${brand}</h2>
                <h3 class="card__name">${name}</h3>
                <p class="product-card__price">$${price.toFixed(2)}</p>
                
                <div class="quantity-controls">
                    <button class="qty-btn decrease" data-id="${product.Id}">-</button>
                    <span class="qty-display">${qty}</span>
                    <button class="qty-btn increase" data-id="${product.Id}">+</button>
                </div>
                
                <p class="line-total"><strong>Subtotal:</strong> $${lineTotal}</p>
            </div>
        </li>
    `;
}

export default class ShoppingCart {
    constructor(key, listElement) {
        this.key = key;
        this.listElement = listElement;
        this.cartData = [];
    }

    async init() {
        this.cartData = getLocalStorage(this.key) || [];

        this.render();
        this.attachQuantityListeners();

        if (this.cartData.length === 0) {
            this.listElement.innerHTML = '<li class="empty-message">Your cart is empty.</li>';
            document.querySelector(".cart-footer")?.classList.add("hide");
        } else {
            document.querySelector(".cart-footer")?.classList.remove("hide");
        }
    }

    render() {
        renderListWithTemplate(ShoppingCartTemplate, this.listElement, this.cartData, "afterbegin", true);
        this.calculateAndDisplayTotal();
    }

    calculateAndDisplayTotal() {
        const total = this.cartData.reduce((sum, item) => {
            return sum + (Number(item.FinalPrice) || 0) * (Number(item.quantity) || 1);
        }, 0);

        const totalEl = document.querySelector(".cart-total");
        if (totalEl) {
            totalEl.textContent = `$${total.toFixed(2)}`;
        }
    }

    attachQuantityListeners() {
        this.listElement.addEventListener("click", (e) => {
            const btn = e.target.closest(".qty-btn");
            if (!btn) return;

            const id = btn.dataset.id;
            const isIncrease = btn.classList.contains("increase");

            this.updateQuantity(id, isIncrease);
        });
    }

    updateQuantity(productId, increase = true) {
        const item = this.cartData.find(i => i.Id === productId);
        if (!item) return;

        let newQty = Number(item.quantity) || 1;

        if (increase) {
            newQty += 1;
        } else {
            newQty = Math.max(1, newQty - 1); // minimum 1
        }

        item.quantity = newQty;

        // Save and re-render
        setLocalStorage(this.key, this.cartData);
        this.render();
    }
}