// scripts/explore.js
import { db } from './firebase-config.js';
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Load Ads
async function loadAds() {
  const adsContainer = document.getElementById("ads-container");
  const snapshot = await getDocs(collection(db, "ads"));
  snapshot.forEach(doc => {
    const ad = doc.data();
    if (ad.active) {
      const img = document.createElement("img");
      img.src = ad.imageUrl;
      img.alt = ad.shop || "Ad Banner";
      img.className = "banner";
      img.onclick = () => {
        if (ad.redirectUrl) window.open(ad.redirectUrl, "_blank");
      };
      adsContainer.appendChild(img);
    }
  });
}

// Filter Shops
document.getElementById("filter-btn").addEventListener("click", async () => {
  const category = document.getElementById("filter-category").value.toLowerCase();
  const floor = document.getElementById("filter-floor").value.toLowerCase();
  const list = document.getElementById("filtered-shops-list");
  list.innerHTML = '';

  const snapshot = await getDocs(collection(db, "shops"));
  snapshot.forEach(doc => {
    const shop = doc.data();
    if (
      (!category || shop.category.toLowerCase().includes(category)) &&
      (!floor || shop.floor.toLowerCase().includes(floor))
    ) {
      const li = document.createElement("li");
      li.textContent = `${shop.name} (${shop.category} - Floor ${shop.floor})`;
      list.appendChild(li);
    }
  });
});

// Load Offers for Shop
document.getElementById("load-offers-btn").addEventListener("click", async () => {
  const shopName = document.getElementById("shop-offer-name").value.toLowerCase();
  const list = document.getElementById("shop-offers-list");
  list.innerHTML = '';

  const snapshot = await getDocs(collection(db, "offers"));
  snapshot.forEach(doc => {
    const offer = doc.data();
    if (offer.shop.toLowerCase() === shopName) {
      const li = document.createElement("li");
      li.textContent = `${offer.title}: ${offer.details}`;
      list.appendChild(li);
    }
  });
});

// Compare Products by Price
document.getElementById("sort-price-btn").addEventListener("click", async () => {
  const list = document.getElementById("compare-products-list");
  list.innerHTML = '';

  const snapshot = await getDocs(collection(db, "products"));
  const products = [];

  snapshot.forEach(doc => {
    products.push(doc.data());
  });

  products.sort((a, b) => a.price - b.price);

  products.forEach(product => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - ₹${product.price} - ${product.features} (${product.category} @ ${product.shop})`;
    list.appendChild(li);
  });
});

// Load everything on page load
loadAds();
