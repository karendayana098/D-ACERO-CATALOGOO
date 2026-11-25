/* INICIO DE DATOS DEL CATÁLOGO */
const products = [
  {
    id: 25,
    name: 'Tubería PVC de 1 pulgada x 6 m',
    category: 'Tuberías',
    description: 'Tubería de PVC de presión, 1 pulgada x 6 m, para instalaciones hidráulicas.',
    image: 'images/tuberia-pvc-1-0.png'
  },
  {
    id: 2,
    name: 'Varilla corrugada de 3/8 pulgada',
    category: 'Construcción',
    description: 'Acero de refuerzo para estructuras de concreto y proyectos de obra.',
    image: 'images/varilla.png',
    tag: 'Popular'
  },
  {
    id: 3,
    name: 'Teja arquitectónica de 6 m, calibre 30',
    category: 'Construcción',
    description: 'Teja metálica para cubiertas de viviendas, patios, bodegas y estructuras exteriores.',
    image: 'images/tejaarq.png',
    tag: 'Destacado'
  },
  {
    id: 5,
    name: 'Tanque de agua de 500 litros',
    category: 'Construcción',
    description: 'Tanque plástico para almacenar agua en viviendas y proyectos.',
    image: 'images/tanque.png'
  },
  {
    id: 6,
    name: 'Malla eslabonada galvanizada',
    category: 'Construcción',
    description: 'Malla metálica galvanizada para cerramientos y divisiones resistentes.',
    image: 'images/malla.png'
  },
  {
    id: 7,
    name: 'Pintura anticorrosiva Ferro',
    category: 'Construcción',
    description: 'Pintura para proteger superficies metálicas contra la corrosión.',
    image: 'images/pintura-anticorrosiva-ferro.png'
  },
  {
    id: 8,
    name: 'Pegante para PVC de 1/4 de galón',
    category: 'Tuberías',
    description: 'Adhesivo para unir tuberías y accesorios de PVC.',
    image: 'images/pegante.png'
  },
  {
    id: 11,
    name: 'Serrucho manual',
    category: 'Herramientas',
    description: 'Herramienta de corte para trabajos de construcción y carpintería.',
    image: 'images/serrucho.png'
  },
  {
    id: 12,
    name: 'Disco de corte para metal',
    category: 'Herramientas',
    description: 'Disco abrasivo para trabajos de corte y metalmecánica.',
    image: 'images/disco.png'
  },
  {
    id: 13,
    name: 'Cemento Argos gris x 50 kg',
    category: 'Cemento',
    description: 'Cemento gris Argos en presentación de 50 kg para obras y reparaciones.',
    image: 'images/cemento.webp'
  },
  {
    id: 14,
    name: 'Malla electrosoldada 15 x 15 – 6 mm',
    category: 'Mallas',
    description: 'Malla electrosoldada de 15 x 15 cm y alambre de 6 mm para refuerzo de concreto.',
    image: 'images/malla-electrosoldada.png'
  },
  {
    id: 15,
    name: 'Teja arquitectónica azul x 6 m',
    category: 'Tejas',
    description: 'Teja arquitectónica azul de 6 m para cubiertas y estructuras.',
    image: 'images/teja-azul.png'
  },
  {
    id: 16,
    name: 'Lámina galvanizada cal. 18',
    category: 'Láminas',
    description: 'Lámina galvanizada calibre 18 para trabajos de construcción y metalmecánica.',
    image: 'images/lamina-galvanizada-cal18.png'
  },
  {
    id: 17,
    name: 'Ángulo 1 x 1/8',
    category: 'Ángulos',
    description: 'Perfil angular metálico de 1 x 1/8 para estructuras y fabricación.',
    image: 'images/angulo-1x1-8.png'
  },
  {
    id: 18,
    name: 'Taladro percutor 1/2 Black+Decker',
    category: 'Herramientas',
    description: 'Taladro percutor Black+Decker con mandril de 1/2 pulgada.',
    image: 'images/taladro-black-decker.png'
  },
  {
    id: 19,
    name: 'Pintura T2 agua galón azul claro',
    category: 'Pinturas',
    description: 'Pintura base agua T2 en galón, color azul claro.',
    image: 'images/pintura-t2-azul-claro.png'
  },
  {
    id: 20,
    name: 'Cable #14 blanco',
    category: 'Eléctricos',
    description: 'Cable eléctrico calibre #14 color blanco.',
    image: 'images/cable-14-blanco.png'
  },
  {
    id: 21,
    name: 'Disco Abracol corte 4 1/2"',
    category: 'Discos',
    description: 'Disco Abracol de corte de 4 1/2 pulgadas.',
    image: 'images/disco-abracol.png'
  },
  {
    id: 22,
    name: 'Brocha 1 1/2',
    category: 'Brochas',
    description: 'Brocha de 1 1/2 pulgadas para aplicación de pintura.',
    image: 'images/brocha-1-5.png'
  },
  {
    id: 23,
    name: 'Varilla cuadrada 9 mm',
    category: 'Barras',
    description: 'Barra metálica cuadrada de 9 mm para construcción y fabricación.',
    image: 'images/varilla-cuadrada-9mm.png'
  },
  
];
/* FIN DE DATOS DEL CATÁLOGO */

/* INICIO DE ESTADO Y UTILIDADES */
const SALES_WHATSAPP = '573145139305';
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY'
};
const FALLBACK_IMAGE = 'images/daceroalmacen.png';
const byId = id => document.getElementById(id);
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

function fallbackImageAttribute(fallback = FALLBACK_IMAGE) {
  return `data-fallback="${fallback}"`;
}

document.addEventListener('error', event => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement)) return;

  const fallback = image.dataset.fallback;
  if (!fallback || image.getAttribute('src') === fallback) return;

  image.src = fallback;
}, true);

/* FIN DE ESTADO Y UTILIDADES */

/* INICIO DE FILTROS DE CATEGORÍA */
function renderCategoryFilters() {
  const container = byId('category-filters');
  if (!container) return;

  const categories = [...new Set(products.map(product => product.category))];
  container.innerHTML = `<h3>Categorías</h3>${categories.map(category => `
    <label>
      <input type="checkbox" value="${category}" class="category-filter">
      ${category}
    </label>`).join('')}`;

  container.querySelectorAll('.category-filter').forEach(input => {
    input.addEventListener('change', renderCatalog);
  });
}
/* FIN DE FILTROS DE CATEGORÍA */

/* Enlaces HTML normales entre documentos; los eventos solo controlan elementos locales. */
document.addEventListener('click', event => {
  const detailButton = event.target.closest('[data-detail]');
  if (detailButton) {
    const product = products.find(item => item.id === Number(detailButton.dataset.detail));
    if (product) showDetail(product);
    return;
  }

  const addButton = event.target.closest('[data-add]');
  if (addButton) {
    addToCart(Number(addButton.dataset.add), 1);
    notify('Producto añadido a la solicitud');
    return;
  }

  const quantityButton = event.target.closest('[data-quantity]');
  if (quantityButton) {
    const change = quantityButton.dataset.quantity === 'plus' ? 1 : -1;
    detailQuantity = Math.max(1, detailQuantity + change);
    const quantityLabel = byId('detail-quantity');
    if (quantityLabel) quantityLabel.textContent = detailQuantity;
    return;
  }

  if (event.target.closest('#add-detail')) {
    addToCart(selectedProduct.id, detailQuantity);
    notify('Producto añadido a la solicitud');
    return;
  }

  const carouselButton = event.target.closest('[data-carousel]');
  if (carouselButton) {
    moveCarousel(carouselButton.dataset.carousel === 'next' ? 1 : -1);
    return;
  }

  const slideDot = event.target.closest('[data-slide]');
  if (slideDot) {
    showSlide(Number(slideDot.dataset.slide));
    return;
  }

  const changeButton = event.target.closest('[data-change]');
  if (changeButton) {
    changeCart(Number(changeButton.dataset.change), Number(changeButton.dataset.amount));
    return;
  }

  const removeButton = event.target.closest('[data-remove]');
  if (removeButton) {
    cart = cart.filter(item => item.id !== Number(removeButton.dataset.remove));
    persistCart();
    return;
  }

  if (event.target.closest('#clear-cart')) {
    cart = [];
    persistCart();
    notify('Se vació la solicitud');
    return;
  }

  if (event.target.closest('#send-quote')) sendQuote();
});

document.querySelector('.menu-toggle')?.addEventListener('click', event => {
  const navigation = document.querySelector('.main-nav');
  navigation.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', String(navigation.classList.contains('open')));
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;

  document.querySelector('.main-nav')?.classList.remove('open');
  document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
});


/* INICIO DE PRODUCTOS, BÚSQUEDA Y FILTROS */
function productCard(product) {
  const tag = product.tag ? `<span class="product-tag">${product.tag}</span>` : '';
  return `
    <article class="product-card">
      <div class="product-visual">
        ${tag}
        <img class="product-image" src="${product.image}" ${fallbackImageAttribute(product.fallback || FALLBACK_IMAGE)} alt="${product.name}" loading="lazy">
      </div>
      <div class="product-body">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
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
  if (query) list = list.filter(product => `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase('es').includes(query));
  if (categories.length) list = list.filter(product => categories.includes(product.category));

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
  byId('detail-description').textContent = product.description;
  const detailImage = byId('detail-image');
  detailImage.src = product.image;
  detailImage.dataset.fallback = FALLBACK_IMAGE;
  detailImage.alt = product.name;
  const thumb = byId('thumb-image');
  thumb.src = product.image;
  thumb.dataset.fallback = FALLBACK_IMAGE;
  thumb.alt = product.name;
  byId('detail-size').textContent = product.category === 'Tuberías' ? '1/2 pulgada' : 'Según referencia';
  byId('detail-quantity').textContent = detailQuantity;
  byId('related-products').innerHTML = products.filter(item => item.id !== product.id).slice(0, 4).map(productCard).join('');
  const listing=byId('product-listing'), detail=byId('product-detail'); if(listing&&detail){listing.hidden=true;detail.hidden=false;window.scrollTo({top:0,behavior:'smooth'});}
}

byId('product-search')?.addEventListener('input', renderCatalog);
byId('reset-filters')?.addEventListener('click', () => {
  if (byId('product-search')) byId('product-search').value = '';
  document.querySelectorAll('.category-filter').forEach(input => { input.checked = false; });
  renderCatalog();
});
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
  byId('summary-quantity').textContent = `${totalItems} artículo${totalItems === 1 ? '' : 's'}`;

  if (!cart.length) {
    container.innerHTML = '<div class="empty-cart">Tu solicitud está vacía.<br><a class="button button-outline empty-cart__link" href="productos.html">Explorar catálogo</a></div>';
    return;
  }

  const rows = cart.map(item => {
    const product = products.find(row => row.id === item.id);
    return `<div class="quote-item"><div class="quote-product"><img src="${product.image}" ${fallbackImageAttribute()} alt=""><strong>${product.name}</strong></div><div class="quote-qty"><button type="button" data-change="${product.id}" data-amount="-1" aria-label="Reducir cantidad">−</button><span>${item.quantity}</span><button type="button" data-change="${product.id}" data-amount="1" aria-label="Aumentar cantidad">＋</button></div><button type="button" class="quote-remove" data-remove="${product.id}" aria-label="Eliminar ${product.name}">×</button></div>`;
  }).join('');
  container.innerHTML = `<div class="quote-head"><span>Producto</span><span>Cantidad</span><span></span></div>${rows}<div class="quote-footer"><a class="button button-outline" href="productos.html">Seguir comprando</a><button id="clear-cart" type="button">Vaciar lista</button></div>`;
}

function sendQuote() {
  if (!cart.length) {
    notify('Agrega productos a tu solicitud primero');
    return;
  }
  const lines = cart.map(item => {
    const product = products.find(row => row.id === item.id);
    return `• ${product.name} — cantidad: ${item.quantity}`;
  });
  const notes = byId('quote-notes')?.value.trim();
  const message = ['Hola D-Acero, deseo solicitar esta cotización:', '', ...lines, notes ? `Observaciones: ${notes}` : ''].filter(Boolean).join('\n');
  window.open(`https://wa.me/${SALES_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}
/* FIN DE COTIZACIÓN Y CARRITO */

/* INICIO DE FORMULARIOS Y ARRANQUE */
function openEmailDraft(subject, body) {
  const link = `mailto:dacerosventas@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = link;
}

byId('contact-email-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const body = [`Nombre: ${data.get('name')}`, `Teléfono: ${data.get('phone') || 'No indicado'}`, `Correo: ${data.get('email')}`, '', 'Mensaje:', data.get('message')].join('\n');
  openEmailDraft('Mensaje desde el sitio web D-ACERO', body);
});

byId('subscription-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const note = byId('subscription-note');
  const submitButton = form.querySelector('[type="submit"]');
  const email = data.get('email').trim();
  const configReady = Object.values(EMAILJS_CONFIG).every(value => value && !value.startsWith('YOUR_'));

  if (!configReady) {
    note.textContent = 'La suscripción aún no está conectada al servicio de correo. Configura EmailJS para activar las notificaciones.';
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Enviando…';
  note.textContent = 'Enviando confirmación a tu correo…';

  fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS_CONFIG.serviceId,
      template_id: EMAILJS_CONFIG.templateId,
      user_id: EMAILJS_CONFIG.publicKey,
      template_params: {
        name: data.get('name').trim(),
        email,
        phone: data.get('phone').trim() || 'No indicado'
      }
    })
  })
    .then(response => {
      if (!response.ok) throw new Error('No se pudo enviar el correo. Intenta de nuevo.');
      note.textContent = `Listo. Enviamos una confirmación a ${email}.`;
      form.reset();
    })
    .catch(() => {
      note.textContent = 'No se pudo enviar la confirmación. Revisa la configuración de correo e intenta de nuevo.';
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = 'Suscribirme';
    });
});

function showSlide(index) {
  const slides = [...document.querySelectorAll('.hero-slide')];
  const dots = [...document.querySelectorAll('.carousel-dots [data-slide]')];

  if (!slides.length) return;

  const activeIndex = (index + slides.length) % slides.length;
  slides.forEach((slide, position) => {
    slide.classList.toggle('is-active', position === activeIndex);
  });
  dots.forEach((dot, position) => {
    dot.classList.toggle('is-active', position === activeIndex);
  });
}

function moveCarousel(direction) {
  const slides = [...document.querySelectorAll('.hero-slide')];
  if (!slides.length) return;

  const activeIndex = slides.findIndex(slide => slide.classList.contains('is-active'));
  showSlide(activeIndex + direction);
}

/* INICIO DE MAPA INTERACTIVO DE SEDES */
function initBranchMap() {
  const mapElement = byId('mapa-dacero');
  if (!mapElement || typeof L === 'undefined') return;

  const branches = [
    {
      name: 'D-ACERO Sincelejo',
      address: 'Zona Industrial · Cra. 25 # 32–45, Sincelejo',
      coordinates: [9.2935, -75.3948],
      directions: 'https://share.google/EY3Ivptg3JmepcQx0'
    },
    {
      name: 'D-ACERO Sahagún',
      address: 'Troncal de Occidente Km 2 vía Montería, Sahagún',
      coordinates: [8.9438, -75.4485],
      directions: 'https://share.google/Ybifh6tbufazNdlGI'
    }
  ];

  const map = L.map(mapElement, { scrollWheelZoom: false });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    maxZoom: 19
  }).addTo(map);

  const markers = [];
  const branchCoordinates = [];

  function highlightBranch(index) {
    document.querySelectorAll('.sede-item-card').forEach(card => card.classList.remove('active'));
    document.querySelector(`[data-focus-sede="${index}"]`)
      ?.closest('.sede-item-card')
      ?.classList.add('active');
  }

  branches.forEach((branch, index) => {
    branchCoordinates.push(branch.coordinates);
    const icon = L.divIcon({
      className: 'custom-pin-wrapper',
      html: `<div class="pin-numerado">${index + 1}</div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -18]
    });
    const marker = L.marker(branch.coordinates, { icon }).addTo(map);
    const popup = `
      <div class="sede-popup">
        <strong>${branch.name}</strong>
        <p>${branch.address}</p>
        <a href="${branch.directions}" target="_blank" rel="noopener noreferrer">Abrir en Google Maps ↗</a>
      </div>`;

    marker.bindPopup(popup);
    marker.on('click', () => highlightBranch(index));
    markers.push(marker);
  });

  L.polyline(branchCoordinates, {
    color: '#0b192c',
    weight: 3,
    opacity: .6,
    dashArray: '8, 8'
  }).addTo(map);

  const branchGroup = L.featureGroup(markers);
  const showAllBranches = () => {
    document.querySelectorAll('.sede-item-card').forEach(card => card.classList.remove('active'));
    map.closePopup();
    map.fitBounds(branchGroup.getBounds(), { padding: [55, 55] });
  };

  document.querySelectorAll('[data-focus-sede]').forEach(button => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.focusSede);
      const branch = branches[index];
      if (!branch || !markers[index]) return;

      highlightBranch(index);
      map.flyTo(branch.coordinates, 16, { duration: 1.2 });
      markers[index].openPopup();
    });
  });

  byId('map-reset-view')?.addEventListener('click', showAllBranches);
  window.addEventListener('resize', () => map.invalidateSize());
  showAllBranches();
}

initBranchMap();
/* FIN DE MAPA INTERACTIVO DE SEDES */

if (document.querySelector('.hero-carousel')) {
  window.setInterval(() => moveCarousel(1), 6000);
}

renderCategoryFilters();

const category = new URLSearchParams(location.search).get('categoria');
if (category) {
  document.querySelectorAll('.category-filter').forEach(filter => {
    filter.checked = filter.value === category;
  });
}

renderFeatured();
renderCatalog();
persistCart();
/* FIN DE FORMULARIOS Y ARRANQUE */
