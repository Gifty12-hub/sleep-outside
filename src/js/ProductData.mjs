
async function convertToJson(res) {
  const jsonResponse = await res.json();

const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  
  if (res.ok) {
    return jsonResponse;
  } else {
    throw {
      name: 'servicesError',
      message: jsonResponse
    };
  }
}

export default class ProductData {

  constructor(category = "tents") {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);

  constructor() { }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;  // API wraps products in .Result array

  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data;  // Detail endpoint returns single product directly
  }

  // NEW: Search across ALL categories (client-side filter)
  async searchProducts(term) {
    // List all known categories (add/remove if new ones appear)
    const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];

    let allProducts = [];

    // Fetch all categories in parallel for speed
    const promises = categories.map(async (cat) => {
      try {
        return await this.getData(cat);
      } catch (err) {
        console.warn(`Failed to load category ${cat}:`, err);
        return []; // Skip failed category
      }
    });

    const results = await Promise.all(promises);

    // Flatten the arrays
    results.forEach((categoryProducts) => {
      allProducts = allProducts.concat(categoryProducts);
    });

    // Filter case-insensitive by name/brand
    const lowerTerm = term.toLowerCase().trim();
    if (!lowerTerm) return allProducts; // Empty search = show all

    return allProducts.filter((product) => {
      const name = (product.NameWithoutBrand || product.Name || "").toLowerCase();
      const brand = (product.Brand?.Name || "").toLowerCase();
      return name.includes(lowerTerm) || brand.includes(lowerTerm);
    });
  }
}