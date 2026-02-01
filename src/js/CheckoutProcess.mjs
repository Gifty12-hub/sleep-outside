// Import utility functions for local storage and alerts
import {
    setLocalStorage,    // Save data to local storage
    getLocalStorage,    // Retrieve data from local storage
    alertMessage,       // Show an alert message on the page
    removeAllAlerts,    // Remove all existing alerts
} from "./utils.mjs";

// Import external services (e.g., API calls)
import ExternalServices from "./ExternalServices.mjs";

// Create an instance of the ExternalServices class to handle API calls
const services = new ExternalServices();

// Convert form data to a JSON object
function formDataToJSON(formElement) {
    const formData = new FormData(formElement),  // Get all form data
        convertedJSON = {};                      // Object to store key-value pairs

    // Loop through each form entry and add it to the JSON object
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });

    return convertedJSON;  // Return the JSON representation of the form
}

// Simplify the list of items for checkout
function packageItems(items) {
    return items.map((item) => {
        console.log(item);  // Debug: log each item
        return {
            id: item.Id,             // Unique ID of the item
            price: item.FinalPrice,  // Price of the item
            name: item.Name,         // Name of the item
            quantity: 1,             // Default quantity
        };
    });
}

// Main CheckoutProcess class
export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;                     // Local storage key for cart items
        this.outputSelector = outputSelector; // Selector for the output container
        this.list = [];                     // List of items in the cart
        this.itemTotal = 0;                 // Total price of items
        this.shipping = 0;                  // Shipping cost
        this.tax = 0;                       // Tax amount
        this.orderTotal = 0;                // Total order amount
    }

    // Initialize the checkout process
    init() {
        // Get the list of items from local storage or default to empty array
        this.list = getLocalStorage(this.key) || [];
        this.calculateItemSummary();  // Update the cart summary
    }

    // Calculate the total price and number of items
    calculateItemSummary() {
        const summaryElement = document.querySelector(
            `${this.outputSelector} #cartTotal` // Element to show total price
        );
        const itemNumElement = document.querySelector(
            `${this.outputSelector} #num-items` // Element to show number of items
        );

        itemNumElement.innerText = this.list.length; // Display total items

        // Create an array of item prices
        const amounts = this.list.map((item) => item.FinalPrice);
        // Sum all item prices
        this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);

        summaryElement.innerText = "$" + this.itemTotal; // Display total price
    }

    // Calculate shipping, tax, and total order amount
    calculateOrdertotal() {
        this.shipping = 10 + (this.list.length - 1) * 2;           // Base shipping + extra per item
        this.tax = (this.itemTotal * 0.06).toFixed(2);             // 6% tax
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
        ).toFixed(2);                                              // Total amount

        this.displayOrderTotals();  // Update the totals on the page
    }

    // Update order totals in the DOM
    displayOrderTotals() {
        document.querySelector(`${this.outputSelector} #shipping`).innerText = "$" + this.shipping;
        document.querySelector(`${this.outputSelector} #tax`).innerText = "$" + this.tax;
        document.querySelector(`${this.outputSelector} #orderTotal`).innerText = "$" + this.orderTotal;
    }

    // Handle checkout process
    async checkout() {
        const formElement = document.forms["checkout"];  // Get the checkout form
        const json = formDataToJSON(formElement);        // Convert form data to JSON

        // Add order details
        json.orderDate = new Date();                    // Current date/time
        json.orderTotal = this.orderTotal;             // Total order amount
        json.tax = this.tax;                            // Tax amount
        json.shipping = this.shipping;                  // Shipping cost
        json.items = packageItems(this.list);           // Package items for checkout

        console.log(json);  // Debug: show the order JSON

        try {
            // Call API to complete checkout
            await services.checkout(json);
            setLocalStorage("so-cart", []);            // Clear cart in local storage
            location.assign("/checkout/success.html"); // Redirect to success page
        } catch (err) {
            removeAllAlerts();                          // Remove previous alerts
            // Show error messages
            if (typeof err.message === "string") {
                alertMessage(err.message);
            } else {
                for (let key in err.message) {
                    alertMessage(err.message[key]);
                }
            }
        }
    }
}
