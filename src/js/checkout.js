<<<<<<< HEAD
async function processCheckout() {
    try {
        // Your checkout logic here
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ /* data */ })
        });
        const data = await response.json();
    }
    catch (err) {
        console.log(err.name);
        console.log(err.message);
    }
};
=======
import { loadHeaderFooter } from "./utils.mjs";
import { CheckoutProcess } from "./CheckoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document
    .querySelector("#zip")
    .addEventListener("blur", order.calculateOrderTotal.bind(order));

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    order.checkout();
});
>>>>>>> 6d3ef369f83928d4b560877e02def73aaef3d1c5
