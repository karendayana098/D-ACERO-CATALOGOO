/* INICIO DE DATOS DEL CATÁLOGO */
const products = [
  {
    id: 1,
    name: 'Tubería PVC de 1/2 pulgada x 6 m',
    category: 'Tuberías',
    description: 'Tubería para instalaciones hidráulicas en viviendas y proyectos de construcción.',
    price: 18000,
    image: 'images/daceroalmacen.png',
    fallback: 'images/daceroalmacen.png',
    tag: 'Destacado'
  },
  {
    id: 2,
    name: 'Varilla corrugada de 3/8 pulgada',
    category: 'Construcción',
    description: 'Acero de refuerzo para estructuras de concreto y proyectos de obra.',
    price: 22000,
    image: 'images/varilla.png',
    tag: 'Popular'
  },
  {
    id: 3,
    name: 'Teja arquitectónica de 6 m, calibre 30',
    category: 'Construcción',
    description: 'Teja metálica para cubiertas de viviendas, patios, bodegas y estructuras exteriores.',
    price: 80000,
    image: 'images/tejaarq.png',
    tag: 'Destacado'
  },
  {
    id: 4,
    name: 'Cemento gris Argos de 50 kg',
    category: 'Construcción',
    description: 'Cemento para preparar morteros y concretos destinados a obras y reparaciones.',
    price: 38000,
    image: 'images/daceroalmacen.png',
    tag: 'Popular'
  },
  {
    id: 5,
    name: 'Tanque de agua de 500 litros',
    category: 'Construcción',
    description: 'Tanque plástico para almacenar agua en viviendas y proyectos.',
    price: null,
    image: 'images/tanque.png'
  },
  {
    id: 6,
    name: 'Malla eslabonada galvanizada',
    category: 'Construcción',
    description: 'Malla metálica galvanizada para cerramientos y divisiones resistentes.',
    price: null,
    image: 'images/malla.png'
  },
  {
    id: 7,
    name: 'Pintura anticorrosiva Ferro',
    category: 'Construcción',
    description: 'Pintura para proteger superficies metálicas contra la corrosión.',
    price: null,
    image: 'images/daceroalmacen.png'
  },
  {
    id: 8,
    name: 'Pegante para PVC de 1/4 de galón',
    category: 'Tuberías',
    description: 'Adhesivo para unir tuberías y accesorios de PVC.',
    price: null,
    image: 'images/pegante.png'
  },
  {
    id: 9,
    name: 'Alambre de púas',
    category: 'Construcción',
    description: 'Alambre resistente para cercas, corrales y cerramientos rurales.',
    price: null,
    image: 'images/daceroalmacen.png'
  },
  {
    id: 10,
    name: 'Codo para tubería PVC',
    category: 'Tuberías',
    description: 'Accesorio para conectar tuberías y cambiar la dirección de una instalación.',
    price: null,
    image: 'images/daceroalmacen.png'
  },
  {
    id: 11,
    name: 'Serrucho manual',
    category: 'Herramientas',
    description: 'Herramienta de corte para trabajos de construcción y carpintería.',
    price: null,
    image: 'images/serrucho.png'
  },
  {
    id: 12,
    name: 'Disco de corte para metal',
    category: 'Herramientas',
    description: 'Disco abrasivo para trabajos de corte y metalmecánica.',
    price: null,
    image: 'images/disco.png'
  }
];
/* FIN DE DATOS DEL CATÁLOGO */

/* INICIO DE ESTADO Y UTILIDADES */
const SALES_WHATSAPP = '573145139305';
const FALLBACK_IMAGE = 'images/daceroalmacen.png';
const byId = id => document.getElementById(id);
const money = value => value == null ? 'Precio por confirmar' : '$' + Number(value).toLocaleString('es-CO');
let cart = [];
let selectedProduct = products[0];
let detailQuantity = 1;

try {
  const saved = JSON.parse(localStorage.getItem('dacero-cart') || '[]');
  if (Array.isArray(saved)) {
    cart = saved.filter(item => products.some(product => product.id === Number(item.id)) && Number(item.quantity) > 0)
      .map(item => ({ id: Number(item.id), quantity: Math.floor(Number(item.quantity)) }));
  }
} catch (error) {
  cart = [];
}

function notify(message) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(notify.timer);
  notify.timer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function safeImage(image, fallback = FALLBACK_IMAGE) {
  const escapedFallback = fallback.replaceAll("'", '%27');
  return `onerror="this.onerror=null;this.src='${escapedFallback}'"`;
}

function formatProductPrice(product) {
  return product.price == null ? '<span class="price-to-confirm">Precio por confirmar</span>' : money(product.price);
}
/* FIN DE ESTADO Y UTILIDADES */

/* Enlaces HTML normales entre documentos; los eventos solo controlan elementos locales. */
document.addEventListener('click',event=>{const d=event.target.closest('[data-detail]');if(d){const p=products.find(x=>x.id===Number(d.dataset.detail));if(p)showDetail(p);return;}const a=event.target.closest('[data-add]');if(a){addToCart(Number(a.dataset.add),1);notify('Producto añadido a la solicitud');return;}const q=event.target.closest('[data-quantity]');if(q){detailQuantity=Math.max(1,detailQuantity+(q.dataset.quantity==='plus'?1:-1));if(byId('detail-quantity'))byId('detail-quantity').textContent=detailQuantity;return;}if(event.target.closest('#add-detail')){addToCart(selectedProduct.id,detailQuantity);notify('Producto añadido a la solicitud');return;}const c=event.target.closest('[data-carousel]');if(c){moveCarousel(c.dataset.carousel==='next'?1:-1);return;}const dot=event.target.closest('[data-slide]');if(dot){showSlide(Number(dot.dataset.slide));return;}const ch=event.target.closest('[data-change]');if(ch){changeCart(Number(ch.dataset.change),Number(ch.dataset.amount));return;}const rm=event.target.closest('[data-remove]');if(rm){cart=cart.filter(i=>i.id!==Number(rm.dataset.remove));persistCart();return;}if(event.target.closest('#clear-cart')){cart=[];persistCart();notify('Se vació la solicitud');return;}if(event.target.closest('#send-quote'))sendQuote();});
document.querySelector('.menu-toggle')?.addEventListener('click',e=>{const n=document.querySelector('.main-nav');n.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(n.classList.contains('open')));});document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelector('.main-nav')?.classList.remove('open');document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');}});


/* INICIO DE PRODUCTOS, BÚSQUEDA Y FILTROS */
function productCard(product) {
  const tag = product.tag ? `<span class="product-tag">${product.tag}</span>` : '';
  return `
    <article class="product-card">
      <div class="product-visual">
        ${tag}
        <img class="product-image" src="${product.image}" ${safeImage(product.image, product.fallback || FALLBACK_IMAGE)} alt="${product.name}" loading="lazy">
      </div>
      <div class="product-body">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <strong class="product-price">${formatProductPrice(product)}</strong>
        <div class="product-actions">
          <button class="button button-outline" type="button" data-detail="${product.id}">Ver producto</button>
          <button class="button button-primary" type="button" data-add="${product.id}" aria-label="Añadir ${product.name} a la solicitud">＋</button>
        </div>
      </div>
    </article>`;
}

function renderFeatured() {
  const target = byId('featured-products');
  if (target) target.innerHTML = products.slice(0, 4).map(productCard).join('');
}

function renderCatalog() {
  const target = byId('catalog-products');
  if (!target) return;
  let list = [...products];
  const query = (byId('product-search')?.value || '').trim().toLocaleLowerCase('es');
  const categories = [...document.querySelectorAll('.category-filter:checked')].map(input => input.value);
  const maximum = Number(byId('price-range')?.value || 1000000);
  const sort = byId('sort-products')?.value || 'relevance';

  if (query) list = list.filter(product => `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase('es').includes(query));
  if (categories.length) list = list.filter(product => categories.includes(product.category));
  if (maximum < 1000000) list = list.filter(product => product.price == null || product.price <= maximum);
  if (sort === 'price-low') list.sort((a, b) => a.price == null ? (b.price == null ? 0 : 1) : (b.price == null ? -1 : a.price - b.price));
  if (sort === 'price-high') list.sort((a, b) => a.price == null ? (b.price == null ? 0 : 1) : (b.price == null ? -1 : b.price - a.price));

  const count = byId('results-count');
  if (count) count.textContent = `Mostrando ${list.length} producto${list.length === 1 ? '' : 's'}`;
  target.innerHTML = list.map(productCard).join('');
  if (byId('empty-state')) byId('empty-state').hidden = list.length > 0;
}

function showDetail(product) {
  selectedProduct = product;
  detailQuantity = 1;
  byId('detail-category').textContent = product.category;
  byId('detail-eyebrow').textContent = product.category.toUpperCase();
  byId('detail-name').textContent = product.name;
  byId('detail-price').textContent = money(product.price);
  byId('detail-description').textContent = product.description;
  const detailImage = byId('detail-image');
  detailImage.src = product.image;
  detailImage.onerror = () => { detailImage.onerror = null; detailImage.src = FALLBACK_IMAGE; };
  detailImage.alt = product.name;
  const thumb = byId('thumb-image');
  thumb.src = product.image;
  thumb.onerror = () => { thumb.onerror = null; thumb.src = FALLBACK_IMAGE; };
  thumb.alt = product.name;
  byId('detail-size').textContent = product.category === 'Tuberías' ? '1/2 pulgada' : 'Según referencia';
  byId('detail-quantity').textContent = detailQuantity;
  byId('related-products').innerHTML = products.filter(item => item.id !== product.id).slice(0, 4).map(productCard).join('');
  const listing=byId('product-listing'), detail=byId('product-detail'); if(listing&&detail){listing.hidden=true;detail.hidden=false;window.scrollTo({top:0,behavior:'smooth'});}
}

byId('product-search')?.addEventListener('input', renderCatalog);
byId('sort-products')?.addEventListener('change', renderCatalog);
byId('price-range')?.addEventListener('input', event => {
  const label = byId('price-range-label');
  if (label) label.textContent = Number(event.currentTarget.value) >= 1000000 ? '$1M+' : money(event.currentTarget.value);
  renderCatalog();
});
byId('reset-filters')?.addEventListener('click', () => {
  if (byId('product-search')) byId('product-search').value = '';
  if (byId('price-range')) byId('price-range').value = byId('price-range').max;
  if (byId('sort-products')) byId('sort-products').value = 'relevance';
  document.querySelectorAll('.category-filter').forEach(input => { input.checked = false; });
  if (byId('price-range-label')) byId('price-range-label').textContent = '$1M+';
  renderCatalog();
});
document.querySelectorAll('.category-filter').forEach(input => input.addEventListener('change', renderCatalog));
/* FIN DE PRODUCTOS, BÚSQUEDA Y FILTROS */

/* INICIO DE COTIZACIÓN Y CARRITO */
function addToCart(id, quantity) {
  const product = products.find(item => item.id === id);
  if (!product) return;
  const existing = cart.find(item => item.id === id);
  if (existing) existing.quantity += quantity;
  else cart.push({ id, quantity });
  persistCart();
}

function changeCart(id, amount) {
  const item = cart.find(row => row.id === id);
  if (!item) return;
  item.quantity += amount;
  if (item.quantity < 1) cart = cart.filter(row => row.id !== id);
  persistCart();
}

function persistCart() {
  try { localStorage.setItem('dacero-cart', JSON.stringify(cart)); } catch (error) { /* El carrito sigue disponible en esta sesión. */ }
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(node => node.textContent = count);
  renderCart();
}

function renderCart() {
  const container = byId('quote-items');
  if (!container) return;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const hasUnpriced = cart.some(item => products.find(product => product.id === item.id)?.price == null);
  const total = cart.reduce((sum, item) => sum + item.quantity * (products.find(product => product.id === item.id)?.price || 0), 0);
  byId('summary-quantity').textContent = `${totalItems} artículo${totalItems === 1 ? '' : 's'}`;
  byId('summary-total').textContent = hasUnpriced ? 'Por confirmar' : money(total);

  if (!cart.length) {
    container.innerHTML = '<div class="empty-cart">Tu solicitud está vacía.<br><a class="button button-outline" href="productos.html" style="margin-top:16px">Explorar catálogo</a></div>';
    return;
  }

  const rows = cart.map(item => {
    const product = products.find(row => row.id === item.id);
    return `<div class="quote-item"><div class="quote-product"><img src="${product.image}" ${safeImage(product.image)} alt=""><div><strong>${product.name}</strong><small>Categoría: ${product.category}</small></div></div><span class="quote-unit">${money(product.price)}</span><div class="quote-qty"><button type="button" data-change="${product.id}" data-amount="-1" aria-label="Reducir cantidad">−</button><span>${item.quantity}</span><button type="button" data-change="${product.id}" data-amount="1" aria-label="Aumentar cantidad">＋</button></div><button type="button" class="quote-remove" data-remove="${product.id}" aria-label="Eliminar ${product.name}">×</button></div>`;
  }).join('');
  container.innerHTML = `<div class="quote-head"><span>Producto</span><span>Precio unit.</span><span>Cantidad</span><span></span></div>${rows}<div class="quote-footer"><a class="button button-outline" href="productos.html">Seguir comprando</a><button id="clear-cart" type="button">Vaciar lista</button></div>`;
}

function sendQuote() {
  if (!cart.length) {
    notify('Agrega productos a tu solicitud primero');
    return;
  }
  const lines = cart.map(item => {
    const product = products.find(row => row.id === item.id);
    return `• ${product.name} — cantidad: ${item.quantity} — precio: ${money(product.price)}`;
  });
  const notes = byId('quote-notes')?.value.trim();
  const totalIsKnown = cart.every(item => products.find(row => row.id === item.id)?.price != null);
  const total = cart.reduce((sum, item) => sum + item.quantity * (products.find(row => row.id === item.id)?.price || 0), 0);
  const message = ['Hola D-Acero, deseo solicitar esta cotización:', '', ...lines, '', `Subtotal estimado: ${totalIsKnown ? money(total) : 'Por confirmar'}`, notes ? `Observaciones: ${notes}` : ''].filter(Boolean).join('\n');
  window.open(`https://wa.me/${SALES_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}
/* FIN DE COTIZACIÓN Y CARRITO */

/* INICIO DE FORMULARIOS Y ARRANQUE */
document.querySelectorAll('.whatsapp-form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const purpose = form.dataset.formPurpose === 'credit' ? 'solicitar información sobre una cuenta de crédito' : 'enviar este mensaje';
    const message = [`Hola D-Acero, deseo ${purpose}:`, `Nombre: ${data.get('name') || ''}`, `Teléfono: ${data.get('phone') || ''}`, `Correo: ${data.get('email') || ''}`, `Mensaje: ${data.get('message') || ''}`].join('\n');
    window.open(`https://wa.me/${SALES_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });
});

function showSlide(i){const s=[...document.querySelectorAll('.hero-slide')],d=[...document.querySelectorAll('.carousel-dots [data-slide]')];if(!s.length)return;const n=(i+s.length)%s.length;s.forEach((x,j)=>x.classList.toggle('is-active',j===n));d.forEach((x,j)=>x.classList.toggle('is-active',j===n));}
function moveCarousel(delta){const s=[...document.querySelectorAll('.hero-slide')];if(s.length)showSlide(s.findIndex(x=>x.classList.contains('is-active'))+delta);}
if(document.querySelector('.hero-carousel'))window.setInterval(()=>moveCarousel(1),6000);
const category=new URLSearchParams(location.search).get('categoria');if(category)document.querySelectorAll('.category-filter').forEach(x=>x.checked=x.value===category);
renderFeatured();renderCatalog();persistCart();
/* FIN DE FORMULARIOS Y ARRANQUE */
