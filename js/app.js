/* ==========================================================================
   Remi Dee Gadgets — Store App
   Vanilla JS, hash-based single-page routing. No backend yet: the cart and
   checkout flow run entirely in memory for this preview. When the admin
   backend is ready, replace PRODUCTS (data.js) with a fetch() call and wire
   the checkout submit handler to a real orders endpoint — the render
   functions below don't need to change.
   ========================================================================== */

const STORE = {
  name: 'Remi Dee Gadgets',
  phones: ['+234 808 290 5631', '+234 906 379 4038'],
  whatsapp: '2348082905631',
  address: 'No 47, Plaza Penninah, Shop A03, Oron Road, Uyo, Akwa Ibom State',
  social: { facebook: '#', instagram: '#', whatsapp: '#' },
};

let cart = [];        // [{ id, qty }]
let shopFilters = { category: 'all', brands: [], maxPrice: 2500000, query: '', sort: 'featured' };

/* ---------------------------------------------------------------------- */
/* Utilities                                                               */
/* ---------------------------------------------------------------------- */
function $(sel, root = document) { return root.querySelector(sel); }
function $all(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

function cartCount() { return cart.reduce((n, l) => n + l.qty, 0); }
function cartLines() {
  return cart
    .map((l) => ({ ...l, product: findProduct(l.id) }))
    .filter((l) => l.product);
}
function cartTotal() {
  return cartLines().reduce((sum, l) => sum + l.product.price * l.qty, 0);
}

function addToCart(id, qty = 1) {
  const existing = cart.find((l) => l.id === id);
  if (existing) existing.qty += qty;
  else cart.push({ id, qty });
  updateCartBadge();
  const p = findProduct(id);
  toast(`${p.name} added to cart`);
}
function setQty(id, qty) {
  const line = cart.find((l) => l.id === id);
  if (!line) return;
  line.qty = Math.max(1, qty);
  updateCartBadge();
  renderRoute();
}
function removeFromCart(id) {
  cart = cart.filter((l) => l.id !== id);
  updateCartBadge();
  renderRoute();
}
function updateCartBadge() {
  $all('.cart-count').forEach((el) => {
    const n = cartCount();
    el.textContent = n;
    el.hidden = n === 0;
  });
}

function toast(message) {
  const el = $('#toast');
  el.innerHTML = ICONS.check + `<span>${message}</span>`;
  el.classList.add('is-visible');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('is-visible'), 2600);
}

/* ---------------------------------------------------------------------- */
/* Loader                                                                  */
/* ---------------------------------------------------------------------- */
function hideInitialLoader() {
  setTimeout(() => $('#loader').classList.add('is-hidden'), 500);
}
function playRouteTransition(cb) {
  const bar = $('#route-bar');
  bar.style.width = '0%';
  bar.classList.add('is-active');
  requestAnimationFrame(() => { bar.style.width = '70%'; });
  setTimeout(() => {
    cb();
    bar.style.width = '100%';
    setTimeout(() => {
      bar.classList.remove('is-active');
      bar.style.width = '0%';
    }, 200);
  }, 180);
}

/* ---------------------------------------------------------------------- */
/* Shared chrome: header + footer                                          */
/* ---------------------------------------------------------------------- */
function renderChrome() {
  $('#header-slot').innerHTML = `
    <header class="site-header">
      <div class="container">
        <a href="#/" class="brand" aria-label="${STORE.name} home">
          <img src="assets/logo-full.png" alt="${STORE.name} logo" />
        </a>
        <nav class="main-nav" data-nav>
          <a href="#/" data-route="/">Home</a>
          <a href="#/shop" data-route="/shop">Shop</a>
          <a href="#/shop?category=smartphones" data-route="/shop">Smartphones</a>
          <a href="#/shop?category=laptops" data-route="/shop">Laptops</a>
          <a href="#/shop?category=audio" data-route="/shop">Audio</a>
        </nav>
        <div class="header-actions">
          <button class="icon-btn" id="search-toggle" aria-label="Search products">${ICONS.search}</button>
          <a href="#/cart" class="icon-btn" aria-label="View cart">
            ${ICONS.cart}
            <span class="cart-count" hidden>0</span>
          </a>
          <button class="nav-toggle" id="nav-toggle" aria-label="Open menu">${ICONS.menu}</button>
        </div>
      </div>
    </header>
    <div class="mobile-nav" id="mobile-nav">
      <a href="#/" data-route="/">Home</a>
      <a href="#/shop" data-route="/shop">Shop all</a>
      <a href="#/shop?category=smartphones" data-route="/shop">Smartphones</a>
      <a href="#/shop?category=laptops" data-route="/shop">Laptops</a>
      <a href="#/shop?category=wearables" data-route="/shop">Watches</a>
      <a href="#/shop?category=audio" data-route="/shop">Audio</a>
      <a href="#/shop?category=accessories" data-route="/shop">Accessories</a>
      <a href="#/cart" data-route="/cart">Cart</a>
    </div>
  `;

  $('#footer-slot').innerHTML = `
    <section class="contact-strip">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-card">
            <div class="icon-wrap">${ICONS.location}</div>
            <div><h4>Visit the shop</h4><p>${STORE.address}</p></div>
          </div>
          <div class="contact-card">
            <div class="icon-wrap">${ICONS.phoneCall}</div>
            <div><h4>Call or WhatsApp</h4><p>${STORE.phones.join(' \u00b7 ')}</p></div>
          </div>
          <div class="contact-card">
            <div class="icon-wrap">${ICONS.support}</div>
            <div><h4>Reliable support</h4><p>Real answers from a real team, every day of the week.</p></div>
          </div>
        </div>
      </div>
    </section>
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="assets/logo-full.png" alt="${STORE.name} logo" />
            <p>Quality gadgets, best prices and reliable service in Uyo, Akwa Ibom State.</p>
            <div class="footer-socials">
              <a href="${STORE.social.facebook}" aria-label="Facebook">${ICONS.facebook}</a>
              <a href="${STORE.social.instagram}" aria-label="Instagram">${ICONS.instagram}</a>
              <a href="https://wa.me/${STORE.whatsapp}" aria-label="WhatsApp" style="color:var(--whatsapp)">${ICONS.whatsapp}</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Shop</h4>
            <a href="#/shop?category=smartphones" data-route="/shop">Smartphones</a>
            <a href="#/shop?category=laptops" data-route="/shop">Laptops</a>
            <a href="#/shop?category=wearables" data-route="/shop">Watches</a>
            <a href="#/shop?category=audio" data-route="/shop">Audio</a>
          </div>
          <div class="footer-col">
            <h4>Store</h4>
            <a href="#/" data-route="/">Home</a>
            <a href="#/cart" data-route="/cart">Cart</a>
            <li>${STORE.address}</li>
          </div>
          <div class="footer-col">
            <h4>Get in touch</h4>
            <a href="tel:${STORE.phones[0].replace(/\s/g, '')}">${STORE.phones[0]}</a>
            <a href="https://wa.me/${STORE.whatsapp}">Chat on WhatsApp</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} ${STORE.name}. All rights reserved.</span>
          <span>Built by Merit_Up</span>
        </div>
      </div>
    </footer>
  `;

  bindChromeEvents();
  updateCartBadge();
}

function bindChromeEvents() {
  $('#nav-toggle').addEventListener('click', () => {
    $('#mobile-nav').classList.toggle('is-open');
  });
  $all('#mobile-nav a').forEach((a) => a.addEventListener('click', () => {
    $('#mobile-nav').classList.remove('is-open');
  }));
  $('#search-toggle').addEventListener('click', () => {
    location.hash = '#/shop';
  });
}

function markActiveNav(path) {
  $all('[data-nav] a, .mobile-nav a').forEach((a) => {
    a.classList.toggle('is-active', a.dataset.route === path);
  });
}

/* ---------------------------------------------------------------------- */
/* Page: Home                                                              */
/* ---------------------------------------------------------------------- */
function pageHome() {
  const featured = PRODUCTS.filter((p) => p.stock > 0).slice(0, 8);
  return `
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow-tag"><span class="dot"></span> Shop is open in Uyo</span>
          <h1>Your trusted <span class="accent">gadget partner</span></h1>
          <p class="lede">Genuine smartphones, laptops and accessories at honest prices, backed by a team that actually picks up the phone.</p>
          <div class="hero-ctas">
            <a href="#/shop" class="btn btn-primary">Browse the shop ${ICONS.arrowRight}</a>
            <a href="https://wa.me/${STORE.whatsapp}" class="btn btn-outline">${ICONS.whatsapp} Chat on WhatsApp</a>
          </div>
          <div class="hero-stats">
            <div class="stat"><b>${PRODUCTS.length}+</b><span>products listed</span></div>
            <div class="stat"><b>100%</b><span>genuine products</span></div>
            <div class="stat"><b>5</b><span>categories to explore</span></div>
          </div>
        </div>
        <div class="hero-panel">
          <div class="device-row">
            <span style="width:64px;color:var(--gold)">${ICONS.devicePhone}</span>
            <span style="width:88px;color:var(--ink)">${ICONS.deviceLaptop}</span>
            <span style="width:56px;color:var(--gold)">${ICONS.deviceWatch}</span>
            <span style="width:60px;color:var(--ink)">${ICONS.deviceEarbuds}</span>
          </div>
          <div class="panel-caption">
            <h3>What are you buying today?</h3>
            <p>Smartphones, gadgets and accessories &mdash; all in one place.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="trust-strip">
      <div class="container trust-grid">
        <div class="trust-item"><div class="icon-wrap">${ICONS.shield}</div><div><h4>100% Original</h4><p>Genuine products only</p></div></div>
        <div class="trust-item"><div class="icon-wrap">${ICONS.badge}</div><div><h4>Best prices</h4><p>Unbeatable deals</p></div></div>
        <div class="trust-item"><div class="icon-wrap">${ICONS.support}</div><div><h4>Reliable support</h4><p>We're here for you</p></div></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div><h2>Shop by category</h2><p>Find exactly what you're looking for, fast.</p></div>
        </div>
        <div class="category-grid">
          ${CATEGORIES.map((c) => `
            <a href="#/shop?category=${c.id}" class="category-card" data-route="/shop">
              <div class="cat-icon">${c.icon}</div>
              <h4>${c.name}</h4>
              <span>${PRODUCTS.filter((p) => p.category === c.id).length} items</span>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head">
          <div><h2>Popular right now</h2><p>A quick look at what's moving fastest in the shop.</p></div>
          <a href="#/shop" class="btn btn-ghost" data-route="/shop">View all ${ICONS.chevronRight}</a>
        </div>
        <div class="product-grid">
          ${featured.map(productCard).join('')}
        </div>
      </div>
    </section>
  `;
}

/* ---------------------------------------------------------------------- */
/* Shared: product card                                                    */
/* ---------------------------------------------------------------------- */
function productCard(p) {
  const badge = brandBadge(p.brand);
  return `
    <div class="product-card">
      <a href="#/product/${p.id}" data-route="/product" style="display:contents">
        <div class="product-media">
          ${p.stock === 0 ? '<span class="product-badge out">Sold out</span>' : (p.wasPrice ? '<span class="product-badge">Sale</span>' : '')}
          ${badge ? `<span class="brand-tag" title="${p.brand}">${badge}</span>` : ''}
          ${p.icon}
        </div>
      </a>
      <div class="product-body">
        <span class="product-cat">${CATEGORIES.find((c) => c.id === p.category)?.name || ''}</span>
        <a href="#/product/${p.id}" data-route="/product" class="product-title">${p.name}</a>
        <div class="product-foot">
          <span class="price">${formatNaira(p.price)}${p.wasPrice ? `<span class="was">${formatNaira(p.wasPrice)}</span>` : ''}</span>
          <button class="add-btn" data-add="${p.id}" ${p.stock === 0 ? 'disabled' : ''} aria-label="Add ${p.name} to cart">${ICONS.plus}</button>
        </div>
      </div>
    </div>
  `;
}

/* ---------------------------------------------------------------------- */
/* Page: Shop                                                              */
/* ---------------------------------------------------------------------- */
function pageShop(params) {
  if (params.get('category')) shopFilters.category = params.get('category');

  const brands = [...new Set(PRODUCTS.map((p) => p.brand))];

  return `
    <section class="section">
      <div class="container">
        <div class="breadcrumb"><a href="#/" data-route="/">Home</a> / <span>Shop</span></div>
        <div class="section-head">
          <div><h2>Shop all products</h2><p>Filter by category, brand or price to find the right device.</p></div>
        </div>
        <div class="shop-layout">
          <aside class="filters-panel">
            <div class="filter-group">
              <h4>Category</h4>
              <label class="filter-option"><input type="radio" name="cat" value="all" ${shopFilters.category === 'all' ? 'checked' : ''}> All categories</label>
              ${CATEGORIES.map((c) => `<label class="filter-option"><input type="radio" name="cat" value="${c.id}" ${shopFilters.category === c.id ? 'checked' : ''}> ${c.name}</label>`).join('')}
            </div>
            <div class="filter-group">
              <h4>Brand</h4>
              ${brands.map((b) => `<label class="filter-option"><input type="checkbox" value="${b}" data-brand-filter ${shopFilters.brands.includes(b) ? 'checked' : ''}> ${b}</label>`).join('')}
            </div>
            <div class="filter-group price-range">
              <h4>Max price</h4>
              <input type="range" min="10000" max="2500000" step="10000" value="${shopFilters.maxPrice}" id="price-range">
              <div class="range-values"><span>\u20a610,000</span><span id="price-range-value">${formatNaira(shopFilters.maxPrice)}</span></div>
            </div>
          </aside>
          <div>
            <div class="shop-toolbar">
              <div class="search-input-wrap">
                ${ICONS.search}
                <input type="text" id="shop-search" placeholder="Search products..." value="${shopFilters.query}">
              </div>
              <select class="sort-select" id="sort-select">
                <option value="featured" ${shopFilters.sort === 'featured' ? 'selected' : ''}>Featured</option>
                <option value="price-asc" ${shopFilters.sort === 'price-asc' ? 'selected' : ''}>Price: low to high</option>
                <option value="price-desc" ${shopFilters.sort === 'price-desc' ? 'selected' : ''}>Price: high to low</option>
                <option value="name" ${shopFilters.sort === 'name' ? 'selected' : ''}>Name: A to Z</option>
              </select>
            </div>
            <div id="shop-grid"></div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function filteredProducts() {
  let list = PRODUCTS.slice();
  if (shopFilters.category !== 'all') list = list.filter((p) => p.category === shopFilters.category);
  if (shopFilters.brands.length) list = list.filter((p) => shopFilters.brands.includes(p.brand));
  list = list.filter((p) => p.price <= shopFilters.maxPrice);
  if (shopFilters.query.trim()) {
    const q = shopFilters.query.trim().toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  }
  switch (shopFilters.sort) {
    case 'price-asc': list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'name': list.sort((a, b) => a.name.localeCompare(b.name)); break;
  }
  return list;
}

function renderShopGrid() {
  const grid = $('#shop-grid');
  if (!grid) return;
  const list = filteredProducts();
  $('#price-range-value') && ($('#price-range-value').textContent = formatNaira(shopFilters.maxPrice));
  if (!list.length) {
    grid.innerHTML = `<div class="empty-state"><h3>No products match those filters</h3><p>Try widening your price range or clearing a filter.</p></div>`;
    return;
  }
  grid.innerHTML = `<p class="result-count" style="margin-bottom:16px">${list.length} product${list.length === 1 ? '' : 's'}</p><div class="product-grid">${list.map(productCard).join('')}</div>`;
}

function bindShopEvents() {
  $all('input[name="cat"]').forEach((r) => r.addEventListener('change', (e) => {
    shopFilters.category = e.target.value;
    renderShopGrid();
  }));
  $all('[data-brand-filter]').forEach((cb) => cb.addEventListener('change', () => {
    shopFilters.brands = $all('[data-brand-filter]:checked').map((c) => c.value);
    renderShopGrid();
  }));
  const range = $('#price-range');
  if (range) range.addEventListener('input', (e) => {
    shopFilters.maxPrice = Number(e.target.value);
    renderShopGrid();
  });
  const search = $('#shop-search');
  if (search) search.addEventListener('input', (e) => {
    shopFilters.query = e.target.value;
    renderShopGrid();
  });
  const sort = $('#sort-select');
  if (sort) sort.addEventListener('change', (e) => {
    shopFilters.sort = e.target.value;
    renderShopGrid();
  });
}

/* ---------------------------------------------------------------------- */
/* Page: Product detail                                                    */
/* ---------------------------------------------------------------------- */
let pdQty = 1;

function pageProduct(id) {
  const p = findProduct(id);
  if (!p) return page404();
  pdQty = 1;
  const badge = brandBadge(p.brand);
  const related = PRODUCTS.filter((r) => r.category === p.category && r.id !== p.id).slice(0, 4);

  return `
    <section class="section">
      <div class="container">
        <div class="breadcrumb">
          <a href="#/" data-route="/">Home</a> / <a href="#/shop?category=${p.category}" data-route="/shop">${CATEGORIES.find((c) => c.id === p.category)?.name}</a> / <span>${p.name}</span>
        </div>
        <div class="pd-layout">
          <div class="pd-gallery">
            <div class="pd-main-media">${p.icon}</div>
            <div class="pd-thumbs">
              <div class="pd-thumb is-active">${p.icon}</div>
            </div>
          </div>
          <div class="pd-info">
            <div class="pd-brand-row">
              ${badge ? `<span class="brand-tag">${badge}</span>` : ''}
              <span>${p.brand}</span>
            </div>
            <h1 class="pd-title">${p.name}</h1>
            <div class="pd-price-row">
              <span class="price">${formatNaira(p.price)}</span>
              ${p.wasPrice ? `<span class="was" style="font-size:0.95rem;color:var(--ink-faint);text-decoration:line-through">${formatNaira(p.wasPrice)}</span>` : ''}
            </div>
            <p class="stock-note ${p.stock > 0 ? 'in' : 'out'}">${p.stock > 0 ? `In stock \u2014 ${p.stock} available` : 'Currently sold out'}</p>
            <p class="pd-desc">${p.blurb}</p>

            <div class="spec-table">
              ${p.specs.map(([k, v]) => `<div class="spec-row"><span>${k}</span><span>${v}</span></div>`).join('')}
            </div>

            <div class="qty-row">
              <span style="font-size:0.9rem;color:var(--ink-dim)">Quantity</span>
              <div class="qty-stepper">
                <button id="qty-minus" ${p.stock === 0 ? 'disabled' : ''}>${ICONS.minus}</button>
                <span id="qty-value">1</span>
                <button id="qty-plus" ${p.stock === 0 ? 'disabled' : ''}>${ICONS.plus}</button>
              </div>
            </div>

            <div class="pd-actions">
              <button class="btn btn-outline" id="add-cart-btn" ${p.stock === 0 ? 'disabled' : ''}>${ICONS.cart} Add to cart</button>
              <button class="btn btn-primary" id="buy-now-btn" ${p.stock === 0 ? 'disabled' : ''}>Buy now</button>
            </div>

            <div class="assurance-row">
              <div class="trust-item"><div class="icon-wrap">${ICONS.shield}</div><div><h4>100% Original</h4><p>Genuine, sealed unit</p></div></div>
              <div class="trust-item"><div class="icon-wrap">${ICONS.support}</div><div><h4>Reliable support</h4><p>We're here for you</p></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${related.length ? `
    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head"><div><h2>You may also like</h2></div></div>
        <div class="product-grid">${related.map(productCard).join('')}</div>
      </div>
    </section>` : ''}
  `;
}

function bindProductEvents(id) {
  const p = findProduct(id);
  if (!p) return;
  const qtyVal = $('#qty-value');
  $('#qty-minus')?.addEventListener('click', () => { pdQty = Math.max(1, pdQty - 1); qtyVal.textContent = pdQty; });
  $('#qty-plus')?.addEventListener('click', () => { pdQty = Math.min(p.stock, pdQty + 1); qtyVal.textContent = pdQty; });
  $('#add-cart-btn')?.addEventListener('click', () => addToCart(p.id, pdQty));
  $('#buy-now-btn')?.addEventListener('click', () => { addToCart(p.id, pdQty); location.hash = '#/cart'; });
}

/* ---------------------------------------------------------------------- */
/* Page: Cart                                                              */
/* ---------------------------------------------------------------------- */
function pageCart() {
  const lines = cartLines();
  if (!lines.length) {
    return `
      <section class="section">
        <div class="container">
          <div class="empty-cart">
            ${ICONS.cart}
            <h3>Your cart is empty</h3>
            <p>Browse the shop and add a gadget to get started.</p>
            <a href="#/shop" class="btn btn-primary" data-route="/shop">Start shopping</a>
          </div>
        </div>
      </section>
    `;
  }
  return `
    <section class="section">
      <div class="container">
        <div class="section-head"><div><h2>Your cart</h2><p>${cartCount()} item${cartCount() === 1 ? '' : 's'} in your cart</p></div></div>
        <div class="cart-layout">
          <div class="cart-list">
            ${lines.map((l) => `
              <div class="cart-row" data-line="${l.id}">
                <div class="thumb">${l.product.icon}</div>
                <div class="info">
                  <h4>${l.product.name}</h4>
                  <p>${formatNaira(l.product.price)} each</p>
                </div>
                <div class="side">
                  <div class="qty-stepper">
                    <button data-qty-minus="${l.id}">${ICONS.minus}</button>
                    <span>${l.qty}</span>
                    <button data-qty-plus="${l.id}">${ICONS.plus}</button>
                  </div>
                  <span class="price">${formatNaira(l.product.price * l.qty)}</span>
                  <span class="remove-link" data-remove="${l.id}">${ICONS.trash} Remove</span>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="summary-card">
            <h3>Order summary</h3>
            <div class="summary-line"><span>Subtotal</span><span>${formatNaira(cartTotal())}</span></div>
            <div class="summary-line"><span>Delivery</span><span>Calculated at checkout</span></div>
            <div class="promo-row">
              <input type="text" placeholder="Promo code">
              <button class="btn btn-outline btn-sm">Apply</button>
            </div>
            <div class="summary-line total"><span>Estimated total</span><span>${formatNaira(cartTotal())}</span></div>
            <a href="#/checkout" class="btn btn-primary btn-block" data-route="/checkout" style="margin-top:16px">Proceed to checkout</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function bindCartEvents() {
  $all('[data-qty-minus]').forEach((b) => b.addEventListener('click', () => {
    const line = cart.find((l) => l.id === b.dataset.qtyMinus);
    if (line) setQty(line.id, line.qty - 1);
  }));
  $all('[data-qty-plus]').forEach((b) => b.addEventListener('click', () => {
    const line = cart.find((l) => l.id === b.dataset.qtyPlus);
    if (line) setQty(line.id, line.qty + 1);
  }));
  $all('[data-remove]').forEach((b) => b.addEventListener('click', () => removeFromCart(b.dataset.remove)));
}

/* ---------------------------------------------------------------------- */
/* Page: Checkout                                                          */
/* ---------------------------------------------------------------------- */
function pageCheckout() {
  const lines = cartLines();
  if (!lines.length) {
    return `<section class="section"><div class="container"><div class="empty-cart"><h3>Nothing to check out yet</h3><p>Add a product to your cart first.</p><a href="#/shop" class="btn btn-primary" data-route="/shop">Go to shop</a></div></div></section>`;
  }
  return `
    <section class="section">
      <div class="container">
        <div class="breadcrumb"><a href="#/cart" data-route="/cart">Cart</a> / <span>Checkout</span></div>
        <div class="section-head"><div><h2>Checkout</h2><p>Fill in your details so we can prepare and deliver your order.</p></div></div>
        <form class="checkout-layout" id="checkout-form">
          <div>
            <div class="form-card">
              <h3>Contact & delivery details</h3>
              <div class="field-grid">
                <div class="field"><label>Full name</label><input type="text" required placeholder="e.g. Imo-Obong Eshiet"></div>
                <div class="field"><label>Phone number</label><input type="tel" required placeholder="e.g. 0803 000 0000"></div>
                <div class="field full"><label>Email (optional)</label><input type="email" placeholder="you@example.com"></div>
                <div class="field full"><label>Delivery address</label><textarea required placeholder="Street, area, city"></textarea></div>
                <div class="field"><label>State</label><input type="text" required value="Akwa Ibom"></div>
                <div class="field"><label>Delivery method</label>
                  <select>
                    <option>Pickup at shop \u2014 Oron Road, Uyo</option>
                    <option>Delivery within Uyo</option>
                    <option>Delivery outside Uyo</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-card">
              <h3>Payment method</h3>
              <label class="pay-option is-active">
                <input type="radio" name="pay" checked>
                <div><h4>Pay on pickup / delivery</h4><p>Settle in cash or transfer when your order arrives or when you collect it in-store.</p></div>
              </label>
              <label class="pay-option" style="opacity:0.6">
                <input type="radio" name="pay" disabled>
                <div><h4>Direct bank transfer <span class="soon-tag">Coming soon</span></h4><p>Automated transfer payment is being set up and will be enabled shortly.</p></div>
              </label>
            </div>
          </div>

          <div class="summary-card">
            <h3>Order summary</h3>
            ${lines.map((l) => `<div class="order-item-row"><span>${l.product.name} \u00d7 ${l.qty}</span><span>${formatNaira(l.product.price * l.qty)}</span></div>`).join('')}
            <div class="summary-line total"><span>Total</span><span>${formatNaira(cartTotal())}</span></div>
            <button type="submit" class="btn btn-primary btn-block" style="margin-top:16px">Place order</button>
            <p style="font-size:0.78rem;margin-top:12px;color:var(--ink-faint)">By placing this order you agree to be contacted by ${STORE.name} to confirm delivery details.</p>
          </div>
        </form>
      </div>
    </section>

    <div class="modal-overlay" id="order-modal" hidden>
      <div class="modal-card">
        <div class="modal-check">${ICONS.check}</div>
        <h3>Order received</h3>
        <p>Thanks &mdash; your order <span class="modal-order-id" id="order-id"></span> has been received. Our team will call or WhatsApp you shortly to confirm delivery.</p>
        <a href="#/" class="btn btn-primary btn-block" data-route="/" id="modal-close">Back to home</a>
      </div>
    </div>
  `;
}

function bindCheckoutEvents() {
  const form = $('#checkout-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const orderId = 'RDG-' + Math.floor(100000 + Math.random() * 900000);
    $('#order-id').textContent = orderId;
    $('#order-modal').hidden = false;
    cart = [];
    updateCartBadge();
  });
  $('#modal-close')?.addEventListener('click', () => { $('#order-modal').hidden = true; });
}

/* ---------------------------------------------------------------------- */
/* Page: 404                                                                */
/* ---------------------------------------------------------------------- */
function page404() {
  return `
    <section class="section">
      <div class="container">
        <div class="empty-state">
          <h3>Page not found</h3>
          <p>The page you're looking for doesn't exist.</p>
          <a href="#/" class="btn btn-primary" data-route="/" style="margin-top:20px;display:inline-flex">Back to home</a>
        </div>
      </div>
    </section>
  `;
}

/* ---------------------------------------------------------------------- */
/* Router                                                                   */
/* ---------------------------------------------------------------------- */
function parseHash() {
  const raw = location.hash.replace(/^#/, '') || '/';
  const [pathPart, queryPart] = raw.split('?');
  return { path: pathPart, params: new URLSearchParams(queryPart || '') };
}

function renderRoute() {
  const { path, params } = parseHash();
  const app = $('#app');
  const segs = path.split('/').filter(Boolean);

  if (segs.length === 0) {
    app.innerHTML = pageHome();
    markActiveNav('/');
  } else if (segs[0] === 'shop') {
    app.innerHTML = pageShop(params);
    bindShopEvents();
    renderShopGrid();
    markActiveNav('/shop');
  } else if (segs[0] === 'product' && segs[1]) {
    app.innerHTML = pageProduct(segs[1]);
    bindProductEvents(segs[1]);
    markActiveNav('/product');
  } else if (segs[0] === 'cart') {
    app.innerHTML = pageCart();
    bindCartEvents();
    markActiveNav('/cart');
  } else if (segs[0] === 'checkout') {
    app.innerHTML = pageCheckout();
    bindCheckoutEvents();
    markActiveNav('/checkout');
  } else {
    app.innerHTML = page404();
  }

  bindGlobalAddButtons();
  window.scrollTo(0, 0);
}

function bindGlobalAddButtons() {
  $all('[data-add]').forEach((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    addToCart(btn.dataset.add, 1);
  }));
}

function onRouteChange() {
  playRouteTransition(renderRoute);
}

/* ---------------------------------------------------------------------- */
/* Init                                                                     */
/* ---------------------------------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
  renderChrome();
  renderRoute();
  hideInitialLoader();
});
window.addEventListener('hashchange', onRouteChange);
