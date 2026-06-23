let allProducts = [];
let selectedCategory = "Semua";
let selectedSubcategory = "Semua";

const API_URL = "https://script.google.com/macros/s/AKfycbxoMJM3jTKO_ro-1YO9ekSye_Kvpi0TFibdcdjO0cIkUiG7J7IlO5sKzA0BTCGYiKH2/exec?api=true";

// Toast Notification System
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  toastMsg.innerText = message;
  
  // Show
  toast.classList.remove('opacity-0', 'translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');
  
  // Hide after 3s
  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4');
  }, 3000);
}

// Custom Copy Function without Alert
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("Link produk berhasil disalin!");
  }).catch(err => {
    console.error('Gagal menyalin: ', err);
    showToast("Gagal menyalin link.");
  });
}

// Navigation & Section Management
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu.classList.contains('opacity-0')) {
    // Open
    menu.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    menu.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
  } else {
    // Close
    menu.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
    menu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
  }
}

function showSection(sectionId) {
  document.querySelectorAll('.section-content').forEach(sec => sec.classList.remove('active'));
  
  // Reset desktop nav buttons
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('bg-white', 'text-slate-900', 'shadow-sm');
    link.classList.add('text-slate-500', 'hover:text-slate-800');
  });
  
  // Activate section
  document.getElementById(sectionId).classList.add('active');
  
  // Activate desktop link styling
  const desktopNav = document.getElementById('nav-desktop-' + sectionId);
  if(desktopNav) {
    desktopNav.classList.remove('text-slate-500', 'hover:text-slate-800');
    desktopNav.classList.add('bg-white', 'text-slate-900', 'shadow-sm');
  }

  window.scrollTo({top: 0, behavior: 'smooth'});
}

// Map Category logic (Simplified Icons for cleanliness)
function getHeroIcon(name) {
   return `<svg class="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>`;
}

async function loadProducts() {
  const container = document.getElementById('products-container');
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Connection failed");
    const data = await response.json();
    allProducts = data;
    displayProducts(data);
    generateCategoryButtons();
    updateDashboard(data);
  } catch (error) {
    console.error("Load failed:", error);
    container.innerHTML = `<div class="col-span-full py-10 text-center text-red-500 font-medium bg-red-50 rounded-2xl border border-red-100">Gagal memuat produk. Cek koneksi Anda.</div>`;
  }
}

function updateDashboard(products) {
  if (!products || products.length === 0) return;
  const totalLikes = products.reduce((sum, p) => sum + (parseInt(p.likes) || 0), 0);
  document.getElementById('total-produk').innerText = products.length;
  document.getElementById('total-likes').innerText = totalLikes.toLocaleString('id-ID'); 
}

// Figma Style Product Cards
function displayProducts(products) {
  const container = document.getElementById('products-container');
  if (products.length === 0) {
    container.innerHTML = `<div class="col-span-full py-20 text-center text-slate-400 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-300 font-medium text-lg">Katalog kosong atau tidak ditemukan.</div>`;
    return;
  }

  container.innerHTML = products.map((p) => `
    <div class="bg-white rounded-[1.5rem] p-5 shadow-figma hover:shadow-figma-hover transition-all duration-300 flex flex-col group relative border border-slate-100/80">
      
      <div class="flex flex-wrap gap-2 mb-4">
        <span class="text-[11px] font-extrabold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">${p.kategori || 'Produk'}</span>
        ${p.subkategori ? `<span class="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">${p.subkategori}</span>` : ''}
      </div>
      
      <h3 class="font-extrabold text-slate-900 text-lg leading-snug mb-6 group-hover:text-brand-500 transition-colors line-clamp-2">${p.nama}</h3>

      <div class="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-4">
        
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <button onclick="likeProduct(this, '${p.nama}')" class="text-slate-400 hover:text-red-500 transition-colors focus:outline-none btn-spring">
              <svg class="w-5 h-5 like-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </button>
            <span class="text-xs text-slate-600 font-bold like-count">${p.likes || 0}</span>
          </div>
          
          <button onclick="copyToClipboard('${p.link}')" class="text-slate-400 hover:text-slate-900 hover:bg-slate-100 p-2 rounded-full transition-colors btn-spring" title="Salin Link">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
          </button>
        </div>

        <button onclick="window.open('${p.link}', '_blank')" class="w-full bg-slate-900 text-white text-sm font-bold py-3 rounded-xl hover:bg-brand-500 transition-colors flex items-center justify-center gap-2 btn-spring">
          Beli Sekarang <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

async function likeProduct(btn, namaProduk) {
  const svgIcon = btn.querySelector('.like-icon');
  const span = btn.nextElementSibling;
  let count = parseInt(span.innerText);
  const isLiked = svgIcon.classList.contains('fill-red-500');

  if (!isLiked) {
    count++;
    svgIcon.classList.add('fill-red-500', 'text-red-500');
    svgIcon.classList.remove('text-slate-400');
  } else {
    count--;
    svgIcon.classList.remove('fill-red-500', 'text-red-500');
    svgIcon.classList.add('text-slate-400');
  }
  span.innerText = count;

  const likesEl = document.getElementById('total-likes');
  let currentTotal = parseInt(likesEl.innerText.replace(/\./g, '')) || 0;
  likesEl.innerText = (!isLiked ? currentTotal + 1 : currentTotal - 1).toLocaleString('id-ID');

  try {
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ action: "addLike", nama: namaProduk, type: !isLiked ? 'add' : 'remove' })
    });
  } catch (error) { console.error(error); }
}

// Pill Style Categories
function generateCategoryButtons() {
  const catContainer = document.getElementById('category-container');
  const categories = ['Semua', ...new Set(allProducts.map(p => p.kategori).filter(Boolean))];
  
  catContainer.innerHTML = categories.map(cat => {
    const isActive = cat === 'Semua';
    const activeClass = isActive ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:text-brand-600';
    return `
      <button onclick="filterCategory('${cat}')" id="btn-cat-${cat.replace(/\s+/g, '')}" class="cat-btn snap-start whitespace-nowrap px-6 py-3 rounded-full border font-bold text-sm transition-all btn-spring ${activeClass}">
        ${cat}
      </button>
    `;
  }).join('');
}

function filterCategory(category) {
  selectedCategory = category;
  selectedSubcategory = "Semua";
  document.getElementById('search-input').value = ""; 

  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.classList.remove('bg-slate-900', 'text-white', 'shadow-md');
    btn.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
  });
  const activeBtn = document.getElementById('btn-cat-' + category.replace(/\s+/g, ''));
  activeBtn.classList.add('bg-slate-900', 'text-white', 'shadow-md');
  activeBtn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');

  const subContainer = document.getElementById('subcategory-container');
  const subWrapper = document.getElementById('subcategory-wrapper');

  if (category === 'Semua') {
    subContainer.classList.add('hidden');
    displayProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.kategori === category);
    const subcats = [...new Set(filtered.map(p => p.subkategori).filter(Boolean))];

    if (subcats.length > 0) {
      subContainer.classList.remove('hidden');
      subWrapper.innerHTML = `
        <button onclick="filterSubcategory('Semua')" id="btn-sub-Semua" class="sub-cat-btn px-5 py-2 rounded-full text-xs font-bold transition-all bg-brand-100 text-brand-700 btn-spring">
          Semua ${category}
        </button>
      ` + subcats.map(sub => `
        <button onclick="filterSubcategory('${sub}')" id="btn-sub-${sub.replace(/\s+/g, '')}" class="sub-cat-btn px-5 py-2 rounded-full text-xs font-bold transition-all bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 btn-spring">
          ${sub}
        </button>
      `).join('');
    } else {
      subContainer.classList.add('hidden');
    }
    displayProducts(filtered);
  }
}

function filterSubcategory(subcategory) {
  selectedSubcategory = subcategory;

  document.querySelectorAll('.sub-cat-btn').forEach(btn => {
    btn.classList.remove('bg-brand-100', 'text-brand-700');
    btn.classList.add('bg-white', 'border-slate-200', 'text-slate-500');
  });
  const activeBtn = document.getElementById('btn-sub-' + subcategory.replace(/\s+/g, ''));
  activeBtn.classList.add('bg-brand-100', 'text-brand-700');
  activeBtn.classList.remove('bg-white', 'border-slate-200', 'text-slate-500');

  let filtered = allProducts.filter(p => p.kategori === selectedCategory);
  if (subcategory !== 'Semua') filtered = filtered.filter(p => p.subkategori === subcategory);
  displayProducts(filtered);
}

function searchProducts() {
  const kw = document.getElementById("search-input").value.toLowerCase().trim();
  if (kw === "") {
    if (selectedSubcategory !== "Semua") filterSubcategory(selectedSubcategory);
    else filterCategory(selectedCategory);
    return;
  }
  const filtered = allProducts.filter(p => 
    (p.nama && p.nama.toLowerCase().includes(kw)) || 
    (p.kategori && p.kategori.toLowerCase().includes(kw)) || 
    (p.subkategori && p.subkategori.toLowerCase().includes(kw))
  );
  displayProducts(filtered);
}

window.addEventListener('DOMContentLoaded', () => {
  // Set Init state
  const homeLink = document.getElementById('nav-desktop-home');
  homeLink.classList.remove('text-slate-500', 'hover:text-slate-800');
  homeLink.classList.add('bg-white', 'text-slate-900', 'shadow-sm');
  loadProducts();
});
