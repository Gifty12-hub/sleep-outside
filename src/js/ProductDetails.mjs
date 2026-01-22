import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();

        // Add to cart listener (only if product exists)
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
        // Guard: product not found
        if (!this.product) {
            document.querySelector(".product-detail").innerHTML =
                "<p style='text-align:center; color:red; font-size:1.5rem;'>Product not found.</p>";
            document.title = "Sleep Outside | Product Not Found";
            return;
        }

        // Dynamic page title
        document.title = `${this.product.Brand?.Name || "Unknown Brand"} ${this.product.NameWithoutBrand || this.product.Name || "Product"} | Sleep Outside`;

        // Brand
        document.querySelector(".product-detail h3").textContent = this.product.Brand?.Name || "";

        // Product name
        document.querySelector(".product-detail h2.divider").textContent = this.product.NameWithoutBrand || this.product.Name || "";

        // Image (normalized in data source)
        const img = document.querySelector(".product-detail img.divider");
        img.src = this.product.Image;
        img.alt = this.product.NameWithoutBrand || this.product.Name || "Product image";

        // Color (safe access)
        document.querySelector(".product__color").textContent =
            this.product.Colors[0]?.ColorName || "See options";

        // Description
        document.querySelector(".product__description").innerHTML =
            this.product.DescriptionHtmlSimple || "No description available.";

        // REMOVE the broken button line entirely (no longer needed)

        // Price/discount code written by Gifty
    }
}