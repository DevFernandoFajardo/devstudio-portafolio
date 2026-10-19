# 🚀 DevStudio - Portafolio Profesional

Bienvenido al repositorio oficial de **DevStudio**. Aquí se encuentra el código fuente de nuestro sitio web, donde presentamos soluciones tecnológicas a la medida: desarrollo de software, aplicaciones e infraestructura de red para empresas e instituciones.

## 🌐 Sitio en vivo

Puedes visitar la web aquí: [devstudio-site.vercel.app](https://devstudio-site.vercel.app/)

## 🛠️ Servicios ofrecidos

**Software**

* **Desarrollo web:** sitios corporativos y landing pages adaptadas a cualquier dispositivo.
* **E-commerce:** tiendas en línea con catálogo, inventario, pedidos y pagos.
* **Sistemas y aplicaciones a medida:** sistemas web, aplicaciones móviles y gestión académica (SIS).

**Infraestructura**

* **Redes estructuradas:** diseño, cableado y configuración de redes empresariales.
* **Cámaras de seguridad (CCTV):** instalación con grabación y monitoreo remoto.
* **Wi-Fi y puntos de acceso:** cobertura estable para entornos con muchos usuarios.

## ✨ Características del sitio

* Diseño responsivo para celular, tablet y escritorio.
* Sección de proyectos con capturas en marcos de navegador y teléfono, y visor de imágenes.
* Formulario de contacto con validación, conectado a EmailJS.
* Botón directo a WhatsApp.
* Vista previa al compartir en redes sociales (Open Graph) y datos estructurados para SEO.
* Navegación accesible con teclado y respeto a la opción de "reducir movimiento".

## 💻 Stack tecnológico

* **Frontend:** HTML5, CSS3 (Flexbox/Grid), JavaScript.
* **Animación:** Three.js + Vanta.js en la portada.
* **Formulario:** EmailJS.
* **Deployment:** Vercel (CI/CD integrado con GitHub).

## 📁 Estructura del proyecto

```
├── index.html       # Estructura de la página
├── styles.css       # Estilos
├── main.js          # Menú, proyectos, visor de capturas y formulario
├── datos.js         # Contenido editable: proyectos y contacto
└── img/
    ├── proyectos/   # Capturas de los proyectos
    └── og-image.png # Imagen para vista previa en redes
```

## ✏️ Cómo agregar un proyecto

1. Copia las capturas en `img/proyectos/`.
2. En `datos.js`, agrega un bloque nuevo a la lista `PROYECTOS` con título, categoría, descripción e imágenes.
3. Haz commit y push: Vercel publica los cambios automáticamente.

## 📈 Roadmap de actualizaciones

- [x] Formulario de contacto con validación.
- [x] Sección de proyectos con capturas.
- [x] Botón de contacto por WhatsApp.
- [ ] Dominio propio.
- [ ] Sección de blog para artículos técnicos.
- [ ] Optimización de carga de imágenes (WebP).

---

*Desarrollado con pasión por Fernando Fajardo - DevStudio.*
