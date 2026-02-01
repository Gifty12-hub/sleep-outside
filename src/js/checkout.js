import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

document
    .querySelector("#zip")
    .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));


document.forms["checkout"].addEventListener("submit", (e) => {
    e.preventDefault();
    const myForm = e.target;
    const isValid = myForm.checkValidity();
    myForm.reportValidity();
    if (isValid) {
        myCheckout.checkout();
    }
});

