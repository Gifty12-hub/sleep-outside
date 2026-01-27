import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails("main");

        // AddING cart listener (only if product exists)
        if (this.product) {
            document
                .getElementById("addToCart")
                .addEventListener("click", this.addProductToCart.bind(this));
        }
    }

    addProductToCart() {
        let cart = getLocalStorage("so-cart") || [];

        const existingItem = cart.find((item) => item.Id === this.product.Id);
        if (existingItem) {
            existingItem.Quantity += 1;
        } else {
            cart.push({ ...this.product, Quantity: 1 });
        }

        setLocalStorage("so-cart", cart);
    }

    renderProductDetails() {
        const detailContainer = document.querySelector(".product-detail");

        // Guard: product not found
        if (!this.product) {
            detailContainer.innerHTML =
                "<p style='text-align:center; color:red; font-size:1.5rem;'>Product not found.</p>";
            return;
        }

        // 1. Brand (the <h3>)
        detailContainer.querySelector("h3").textContent = this.product.Brand.Name;

        // 2. Name (the <h2>)
        detailContainer.querySelector("h2").textContent = this.product.NameWithoutBrand;

        // 3. Image (the <img>)
        const img = detailContainer.querySelector("img");
        img.src = this.product.Images.PrimaryLarge;
        img.alt = this.product.Name;

        // 4. Price (the <p> with class product-card__price)
        detailContainer.querySelector(".product-card__price").textContent = `$${this.product.FinalPrice}`;

        // 5. Color (the <p> with class product__color)
        detailContainer.querySelector(".product__color").textContent = this.product.Colors[0]?.ColorName || "N/A";

        // 6. Description (the <p> with class product__description)
        detailContainer.querySelector(".product__description").innerHTML = this.product.DescriptionHtmlSimple;
    }
}