// scripts/admin.js

import { auth, db } from './firebase-config.js';
import {
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { logAction } from './logger.js';

// ========== AUTH CHECK ==========
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = 'login.html';
  }
});

// ========== LOGOUT ==========
document.getElementById("logout-btn").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      logAction("Admin logged out");
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
});

// ========== ADD SHOP ==========
const shopForm = document.getElementById('shop-form');
const shopList = document.getElementById('shops-list');

shopForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById("shop-name").value;
  const floor = document.getElementById("floor").value;
  const category = document.getElementById("category").value;

  try {
    await addDoc(collection(db, "shops"), {
      name,
      floor,
      category
    });

    logAction(`Shop added: ${name}`, auth.currentUser?.email || "unknown");
    alert("Shop added successfully!");
    shopForm.reset();
    loadShops();
  } catch (err) {
    console.error("Error adding shop:", err);
  }
});

async function loadShops() {
  shopList.innerHTML = '';
  const snapshot = await getDocs(collection(db, "shops"));
  snapshot.forEach(doc => {
    const shop = doc.data();
    const li = document.createElement("li");
    li.textContent = `${shop.name} - Floor: ${shop.floor}, Category: ${shop.category}`;
    shopList.appendChild(li);
  });
}

loadShops();


// ========== ADD OFFER ==========
const offerForm = document.getElementById("offer-form");
const offerList = document.getElementById("offers-list");

offerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const shop = document.getElementById("offer-shop").value;
  const title = document.getElementById("offer-title").value;
  const details = document.getElementById("offer-details").value;

  try {
    await addDoc(collection(db, "offers"), {
      shop,
      title,
      details,
      timestamp: new Date().toISOString()
    });

    logAction(`Offer added: ${title} for ${shop}`, auth.currentUser?.email || "unknown");
    alert("Offer added successfully!");
    offerForm.reset();
    loadOffers();
  } catch (err) {
    console.error("Error adding offer:", err);
  }
});

async function loadOffers() {
  offerList.innerHTML = '';
  const snapshot = await getDocs(collection(db, "offers"));
  snapshot.forEach(doc => {
    const offer = doc.data();
    const li = document.createElement("li");
    li.textContent = `${offer.shop} - ${offer.title}: ${offer.details}`;
    offerList.appendChild(li);
  });
}

loadOffers();

// ========== ADD PRODUCT ==========
const productForm = document.getElementById("product-form");
const productList = document.getElementById("product-list");

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("product-name").value;
  const price = parseFloat(document.getElementById("product-price").value);
  const features = document.getElementById("product-features").value;
  const category = document.getElementById("product-category").value;
  const shop = document.getElementById("product-shop").value;

  try {
    await addDoc(collection(db, "products"), {
      name,
      price,
      features,
      category,
      shop,
      timestamp: new Date().toISOString()
    });

    logAction(`Product added: ${name} - ₹${price}`, auth.currentUser?.email || "unknown");
    alert("Product added successfully!");
    productForm.reset();
    loadProducts();
  } catch (err) {
    console.error("Error adding product:", err);
  }
});

// ========== LOAD PRODUCTS ==========
async function loadProducts() {
  productList.innerHTML = '';
  const snapshot = await getDocs(collection(db, "products"));
  snapshot.forEach(doc => {
    const product = doc.data();
    const li = document.createElement("li");
    li.textContent = `${product.name} - ₹${product.price} - ${product.features} (${product.category} @ ${product.shop})`;
    productList.appendChild(li);
  });
}

loadProducts();
