// scripts/product.js
import { db } from './firebase-config.js';
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const productList = document.getElementById("product-list");

async function loadProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  const products = [];
  querySnapshot.forEach(doc => {
    products.push(doc.data());
  });

  // Sort by price
  products.sort((a, b) => a.price - b.price);

  for (const product of products) {
    const li = document.createElement("li");
    li.textContent = `${product.name} - ₹${product.price} - ${product.features}`;
    productList.appendChild(li);
  }
}

loadProducts();
