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