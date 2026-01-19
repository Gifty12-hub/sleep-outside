import ProductData from './ProductData.mjs';
import ProductList from './productList.mjs';

// 1. Create data source
const dataSource = new ProductData('tents');

// 2. Select the HTML element where the list should go
const listElement = document.querySelector('.product-list');

// 3. Create the ProductList instance
const myList = new ProductList('tents', dataSource, listElement);

// 4. Run the init method to fetch data and render
myList.init();