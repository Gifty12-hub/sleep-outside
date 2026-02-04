import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

// Helper function to convert form data to a simple JSON object
function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

// Helper function to simplify the cart items list for the server
function packageItems(items) {
    return items.map((item) => ({
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: item.Quantity || 1,
    }));
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSubtotal();
    }

    calculateItemSubtotal() {
        const subtotalElement = document.querySelector(this.outputSelector + " #subtotal");
        // Calculate the total based on price and quantity
        this.itemTotal = this.list.reduce((sum, item) => sum + (item.FinalPrice * (item.Quantity || 1)), 0);
        subtotalElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    }

    calculateOrderTotal() {
        // Shipping: $10 for the first item + $2 for each additional item
        const count = this.list.reduce((sum, item) => sum + (item.Quantity || 1), 0);
        this.shipping = 10 + (count - 1) * 2;

        // Tax: 6% of subtotal
        this.tax = this.itemTotal * 0.06;

        // Total: Subtotal + Shipping + Tax
        this.orderTotal = this.itemTotal + this.shipping + this.tax;

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const shippingE = document.querySelector(this.outputSelector + " #shipping");
        const taxE = document.querySelector(this.outputSelector + " #tax");
        const totalE = document.querySelector(this.outputSelector + " #orderTotal");

        shippingE.innerText = `$${this.shipping.toFixed(2)}`;
        taxE.innerText = `$${this.tax.toFixed(2)}`;
        totalE.innerText = `$${this.orderTotal.toFixed(2)}`;
    }


    async checkout() {
        const formElement = document.forms["checkout"];
        const json = formDataToJSON(formElement);

        json.orderDate = new Date().toISOString();
        json.orderTotal = this.orderTotal.toFixed(2);
        json.tax = this.tax.toFixed(2);
        json.shipping = this.shipping;
        json.items = packageItems(this.list);

        try {
            const res = await services.checkout(json);
            console.log("Success response:", res);

            // 1. Clear the cart from local storage
            localStorage.removeItem(this.key);

            // 2. Redirect the user to the success page
            location.assign("success.html");

        } catch (err) {
            // 3. Clear any existing alerts so they don't stack up
            const existingAlerts = document.querySelectorAll(".alert");
            existingAlerts.forEach((alert) => alert.remove());

            // 4. Loop through the error object and display each message
            // Note: The server returns errors as an object like { "message": "error here" }
            for (let message in err.message) {
                alertMessage(err.message[message]);
            }
            console.log("Checkout Error:", err);
        }
    }
    


    }
