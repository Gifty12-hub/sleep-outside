const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    // No longer need to set this.path here!
  }

  async getData(category) {
    // Fetch from the API using the category passed in
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    // The API returns an object with a 'Result' property containing the array
    return data.Result;
  }

  async findProductById(id) {
    // The API has a specific endpoint for single products
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}