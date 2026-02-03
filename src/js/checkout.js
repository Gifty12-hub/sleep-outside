async function checkout() {
    try {
        const order = buildOrder();
        await services.checkout(order);
        alertMessage("Order placed successfully!");
    } catch (err) {
        if (err.name === "servicesError") {
            alertMessage(err.message.message);
        } else {
            alertMessage("Unexpected error. Please try again.");
        }
    }
}

document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
    e.preventDefault();

    const myForm = document.forms[0];
    const chk_status = myForm.checkValidity();
    myForm.reportValidity();

    if (chk_status) {
        myCheckout.checkout();
    }
});
