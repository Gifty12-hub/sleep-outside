import { getLocalStorage, setLocalStorage } from "./utils.mjs";
export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        // Get the product details from the data source
        this.product = await this.dataSource.findProductById(this.productId);
        // To render the product details into the page
        this.renderProductDetails();
        //Adding a click listener to the "add to cart" button
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }
    addProductToCart() {
        // Get current cart
        let cart = getLocalStorage("so-cart") || [];
        // Check if there is a product on the cart
        const existingItem = cart.find((item) => item.Id === this.product.Id);
        if (existingItem) {
            // If the item exist it should increase the quantity
            existingItem.Quantity += 1;

        }
        else {
            // If the item does not exist, it should add from 1
            cart.push({ ...this.product, Quantity: 1 });

        }
        setLocalStorage("so-cart", cart);
    }
    renderProductDetails() {
        // Update the browser tab title
        document.title = `${this.product.Brand.Name} ${this.product.NameWithoutBrand} | Sleep Outside`;
        //  The brand name
        document.querySelector(".product-detail h3").textContent = this.product.Brand.Name;
        // The product name
        document.querySelector(".product-detail h2.divider").textContent = this.product.NameWithoutBrand;
        //Image
        const img = document.querySelector(".product-detail img.divider");
        img.src = this.product.Images.PrimaryLarge;
        img.alt = this.product.NameWithoutBrand;
        // Color
        document.querySelector(".product__color").textContent = this.product.Colors[0].ColorName;
        // Description
        document.querySelector(".product__description").innerHTML = this.product.DescriptionHtmlSimple;
        // Update button
        document.querySelector("#addToCart").dataset.id = this.product.Id;
        //  Price and discount handling
        const priceElement = document.querySelector(".product-card__price");
        const section = document.querySelector(".product-detail");
        // Remove old discount element to prevent duplicate
        const existingBadge = section.querySelector(".discoount-badge");
        if (existingBadge) existingBadge.remove();
        const existingOldPrice = section.querySelector(".product-detail__old-price");
        if (existingOldPrice) existingOldPrice.remove();


        // Calculate discount percentage
        let discountPercent = 0;
        if (this.product.SuggestedRetailPrice > this.product.FinalPrice) {
            discountPercent = Math.round(((this.product.SuggestedRetailPrice - this.product.FinalPrice) / this.product.SuggestedRetailPrice) * 100);

        }
        if (discountPercent > 0) {
            // Add a discount badge
            const badge = document.createElement("span");
            badge.className = "dicount-badge";
            badge.textContent = `${discountPercent}% off`;
            section.prepend(badge);

            const oldPrice = document.createElement("p");
            oldPrice.className = "product-detail__old-price";
            oldPrice.innerHTML = `<s>$${this.product.SuggestedRetailPrice.toFixed(2)}</s>`;

            // Shoe discounted price
            priceElement.textContent = `$${this.product.FinalPrice.toFixed(2)}`;
        }
        else {
            // If there is no discounted price, show normal price
            priceElement.textContent = `$${this.product.FinalPrice.toFixed(2)}`;
        }
    }

}
