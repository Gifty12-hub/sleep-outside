import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

console.log("Checkpoint 1: Script Loaded");

try {
    loadHeaderFooter();
    const myCheckout = new CheckoutProcess("so-cart", "#orderSummary");
    myCheckout.init();
    console.log("Checkpoint 2: Checkout Class Initialized");

    const zipInput = document.querySelector("#zip");
    if (zipInput) {
        zipInput.addEventListener("blur", myCheckout.calculateOrderTotal.bind(myCheckout));
        console.log("Checkpoint 3: Zip listener attached");
    }

    const submitBtn = document.querySelector("#checkoutSubmit");
    if (submitBtn) {
        submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Checkpoint 4: Button Clicked!");
            myCheckout.checkout();
        });
    } else {
        console.error("Error: Could not find button with ID #checkoutSubmit");
    }
} catch (err) {
    console.error("Checkpoint Error:", err);
}