# Estructura del sitio D-ACERO

```text
D ACERO CATALOGO/
├── index.html          Página de inicio
├── productos.html      Catálogo y filtros de productos
├── informacion.html    Información de sedes y mapa interactivo
├── contacto.html       Formulario de contacto
├── solicitud.html      Carrito y cotización
├── cuenta.html         Ingreso y registro local de clientes
├── css/
│   └── style.css       Apariencia y distribución
├── js/
│   └── script.js       Catálogo, filtros, carrito y cuenta
└── images/             Imágenes del sitio
```

Las páginas HTML contienen el contenido. Todas cargan la hoja de estilos en `css/style.css` y las funciones de `js/script.js`. Las imágenes están en `images/`.

El registro de `cuenta.html` funciona solo en el navegador actual. Las cuentas no se sincronizan con otros dispositivos ni con una base de datos central.

El mapa interactivo está en la página `informacion.html`; su diseño está en `css/style.css` y sus marcadores y controles en `js/script.js`.
