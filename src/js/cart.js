// cart.js
import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

// Load header and footer
loadHeaderFooter();

const productList = document.querySelector(".products");

// Render cart items dynamically
function renderCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  productList.innerHTML = "<h2>My Cart</h2>"; // reset section

  if (cartItems.length === 0) {
    productList.innerHTML += "<p>Your cart is empty.</p>";
    document.querySelector(".list-total").textContent = "Total: €0.00";
    return;
  }

  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "cart-item";
    li.dataset.index = index;

    li.innerHTML = `
      <img src="${item.Image}" alt="${item.Name}" />
      <div class="cart-item-info">
        <h4>${item.Name}</h4>
        <p>Color: ${item.selectedColor?.ColorName || 'default'}</p>
        <p>Unit Price: €${item.FinalPrice.toFixed(2)}</p>
        <div class="cart-item-quantity">
          <input type="number" class="quantity-input" value="${item.quantity || 1}" min="1" />
        </div>
        <p>Total: €<span class="item-total">${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</span></p>
      </div>
    `;

    productList.appendChild(li);
  });

  updateTotals();
}

// Handle manual input changes
productList.addEventListener("input", (e) => {
  if (!e.target.classList.contains("quantity-input")) return;

  const cartItems = getLocalStorage("so-cart") || [];
  const li = e.target.closest(".cart-item");
  const index = li.dataset.index;
  let value = parseInt(e.target.value);
  if (isNaN(value) || value < 1) value = 1;

  cartItems[index].quantity = value;
  setLocalStorage("so-cart", cartItems);
  renderCart();
});

// Update total cart price
function updateTotals() {
  const cartItems = getLocalStorage("so-cart") || [];
  const total = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
    0
  );
  document.querySelector(".list-total").textContent = `Total: €${total.toFixed(2)}`;
}

// Initial render
renderCart();
