// Base URL of the server API
const baseURL = "http://server-nodejs.cit.byui.edu:3000/";

// Helper function to convert a fetch response to JSON
async function convertToJson(res) {
    const data = await res.json();  // Parse the response body as JSON
    if (res.ok) {                   // If HTTP status is 200-299
        return data;                // Return the parsed data
    } else {                        // If an error occurred
        // Throw an error object with a name and the response data as the message
        throw { name: "servicesError", message: data };
    }
}

// Class to handle external API requests
export default class ExternalServices {
    constructor() {
        // No initialization needed for this class currently
    }

    // Get all products in a specific category
    async getData(category) {
        // Fetch products by category from the API
        const response = await fetch(baseURL + `products/search/${category}`);
        // Convert the response to JSON and check for errors
        const data = await convertToJson(response);
        // Return only the Result property of the API response
        return data.Result;
    }

    // Find a single product by its ID
    async findProductById(id) {
        // Fetch product details by ID
        const response = await fetch(baseURL + `product/${id}`);
        const data = await convertToJson(response); // Convert to JSON
        return data.Result;                        // Return the Result property
    }

    // Send checkout data to the server
    async checkout(payload) {
        // Options for the POST request
        const options = {
            method: "POST",                      // HTTP method
            headers: {
                "Content-Type": "application/json", // Send JSON data
            },
            body: JSON.stringify(payload),       // Convert payload to JSON string
        };

        // Send POST request to the checkout endpoint and convert response to JSON
        return await fetch(baseURL + "checkout/", options).then(convertToJson);
    }
}
