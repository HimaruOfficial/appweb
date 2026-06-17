let allProducts = [];
let selectedCategory = "Semua";
let selectedSubcategory = "Semua";

// Ini link API terbaru kamu (saya tambahkan ?api=true di belakangnya agar format JSON-nya pas)
const API_URL = "https://script.google.com/macros/s/AKfycbxoMJM3jTKO_ro-1YO9ekSye_Kvpi0TFibdcdjO0cIkUiG7J7IlO5sKzA0BTCGYiKH2/exec?api=true";

// FUNGSI TOGGLE SIDEBAR MENU
function toggleMenu() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('menu-overlay').classList.toggle('open');
}

// MAPPING SVG HERO ICONS
function getHeroIcon(name) {
  const n = name.toLowerCase();
  if(n.includes('pulsa') || n.includes('telp') || n.includes('axis') || n.includes('indosat') || n.includes('telkomsel') || n.includes('tri') || n.includes('xl')) {
    return `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>`;
  }
  if(n.includes('wallet') || n.includes('dana') || n.includes('saldo')) {
    return `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H4.5A2.25 2.25 0 002.25 12v6.75A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V12z" /><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5h15M4.5 10.5V7.5a2.25 2.25 0 012.25-2.25h10.5a2.25 2.25 0 012.25 2.25v3" /></svg>`;
  }
  if(n.includes('pln') || n.includes('token') || n.includes('listrik')) {
    return `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>`;
  }
  if(n.includes('game') || n.includes('topup') || n.includes('voucher') || n.includes('digital')) {
    return `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a1.5 1.5 0 01-1.5 1.5H6a4.5 4.5 0 00-4.5 4.5v6.257c0 1.108.806 2.057 1.907 2.185a48.507 48.507 0 0011.186 0c1.1-.128 1.907-1.077 1.907-2.185V10.587a4.5 4.5 0 00-4.5-4.5h-3.375a1.5 1.5 0 01-1.5-1.5v0zM19.125 10.5h.375c1.243 0 2.25 1.007 2.25 2.25v2.25c0 1.243-1.007 2.25-2.25 2.25h-.375v-6.75zM12 12h.008v.008H12V12zm-3 0h.008v.008H9V12zm-3 0h.008v.008H6V12z" /></svg>`;
  }
  if(n.includes('wifi') || n.includes('streaming') || n.includes('internet')) {
    return `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px"><path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" /></svg>`;
  }
  if(n === 'semua') {
    return `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>`;
  }
  return `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>`;
}

function showSection(sectionId) {
  document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
  document.querySelectorAll('.sidebar a').forEach(link => link.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
  document.getElementById('nav-' + sectionId).classList.add('active');
  window.scrollTo(0,0);
  
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('menu-overlay').classList.remove('open');
}

// PERUBAHAN DI SINI: Murni mengambil data lewat Fetch API
async function loadProducts() {
  const container = document.getElementById('products-container');
  container.innerHTML = "<p style='text-align:center;'>Sedang memuat produk...</p>";

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Gagal terhubung ke server");
    
    const data = await response.json();
    allProducts = data;

    displayProducts(data);
    generateCategoryButtons();
    updateDashboard(data);
    
  } catch (error) {
    console.error("Gagal memuat produk:", error);
    container.innerHTML = `<p style="color:red; text-align:center;">Gagal memuat produk dari database. Pastikan link API benar.</p>`;
  }
}

function updateDashboard(products) {
  if (!products || products.length === 0) return;

  const totalProduk = products.length;
  const totalLikes = products.reduce((sum, p) => sum + (parseInt(p.likes) || 0), 0);

  const produkEl = document.getElementById('total-produk');
  const likesEl = document.getElementById('total-likes');

  if (produkEl) produkEl.innerText = totalProduk;
  if (likesEl) likesEl.innerText = totalLikes.toLocaleString('id-ID'); 
}

function displayProducts(products) {
  const container = document.getElementById('products-container');
  if (products.length === 0) {
    container.innerHTML = "<p style='color:#6b7280; text-align:center; grid-column: 1/-1;'>Belum ada produk di kategori ini.</p>";
    return;
  }

  container.innerHTML = products.map((p, index) => `
    <div class="product-card">
      <div>
        <h3 class="product-title">${p.nama}</h3>
        <div class="product-tags">
          <span class="product-cat">${p.kategori}</span>
          ${p.subkategori ? `<span class="product-subcat">${p.subkategori}</span>` : ''}
        </div>
      </div>

      <div style="margin: 10px 0; display: flex; align-items: center; gap: 8px;">
        <button onclick="likeProduct(this, '${p.nama}')" style="background:none; border:none; cursor:pointer; font-size: 1.2rem;">
          🤍
        </button>
        <span style="font-size: 0.8rem; color: #6b7280;">${p.likes || 0} orang suka</span>
      </div>

      <button class="buy-btn" onclick="window.open('${p.link}', '_blank')">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg> 
        Beli Sekarang
      </button>

      <button onclick="copyToClipboard('${p.link}')" class="copy-btn" title="Copy Link" style="flex: 0; padding: 12px; cursor: pointer; border-radius: 50%; border: 1px solid #ccc; background: #f3f4f6;">
        📋
      </button>
    </div>
  `).join('');
}
    
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Link produk berhasil disalin!");
  }).catch(err => {
    console.error('Gagal menyalin: ', err);
  });
}

async function likeProduct(btn, namaProduk) {
  const span = btn.nextElementSibling;
  let text = span.innerText;
  let count = parseInt(text.replace(/[^0-9]/g, ''));
  
  if (!btn.classList.contains('liked')) {
    count++;
    btn.innerText = '❤️';
    btn.classList.add('liked');
  } else {
    count--;
    btn.innerText = '🤍';
    btn.classList.remove('liked');
  }
  span.innerText = count + " orang suka";

  const likesEl = document.getElementById('total-likes');
  let currentTotal = parseInt(likesEl.innerText.replace(/\./g, '')) || 0;
  likesEl.innerText = (btn.classList.contains('liked') ? currentTotal + 1 : currentTotal - 1).toLocaleString('id-ID');

  try {
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ action: "addLike", nama: namaProduk, type: btn.classList.contains('liked') ? 'add' : 'remove' })
    });
  } catch (error) {
    console.error("Gagal update database:", error);
  }
}

function generateCategoryButtons() {
  const catContainer = document.getElementById('category-container');
  const categories = ['Semua', ...new Set(allProducts.map(p => p.kategori).filter(Boolean))];
  catContainer.innerHTML = categories.map(cat => {
    return `
      <button class="cat-btn ${cat === 'Semua' ? 'active' : ''}" onclick="filterCategory('${cat}')" id="btn-cat-${cat.replace(/\s+/g, '')}">
        <div class="cat-icon-wrapper">${getHeroIcon(cat)}</div>
        <span class="cat-text">${cat}</span>
      </button>
    `;
  }).join('');
}

function filterCategory(category) {
  selectedCategory = category;
  selectedSubcategory = "Semua";

  document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('btn-cat-' + category.replace(/\s+/g, '')).classList.add('active');

  const subContainer = document.getElementById('subcategory-container');

  if (category === 'Semua') {
    subContainer.style.display = 'none';
    displayProducts(allProducts);
  } else {
    const filteredProducts = allProducts.filter(p => p.kategori === category);
    const subcategories = [...new Set(filteredProducts.map(p => p.subkategori).filter(Boolean))];

    if (subcategories.length > 0) {
      subContainer.style.display = 'flex';
      subContainer.innerHTML = `
        <button class="sub-cat-btn active" onclick="filterSubcategory('Semua')" id="btn-sub-Semua">
          <div class="sub-cat-icon">${getHeroIcon('Semua')}</div>
          <span class="sub-cat-text">Tampilkan Semua ${category}</span>
          <svg class="sub-cat-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      ` + subcategories.map(sub => `
        <button class="sub-cat-btn" onclick="filterSubcategory('${sub}')" id="btn-sub-${sub.replace(/\s+/g, '')}">
          <div class="sub-cat-icon">${getHeroIcon(sub)}</div>
          <span class="sub-cat-text">${sub}</span>
          <svg class="sub-cat-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      `).join('');
    } else {
      subContainer.style.display = 'none';
    }
    displayProducts(filteredProducts);
  }
}

function filterSubcategory(subcategory) {
  selectedSubcategory = subcategory;

  document.querySelectorAll('.sub-cat-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('btn-sub-' + subcategory.replace(/\s+/g, '')).classList.add('active');

  let filtered = allProducts.filter(p => p.kategori === selectedCategory);
  if (subcategory !== 'Semua') {
    filtered = filtered.filter(p => p.subkategori === subcategory);
  }
  displayProducts(filtered);
}

// PERUBAHAN DI SINI: Langsung memanggil data dari API saat website dibuka
window.onload = () => {
  loadProducts();
};