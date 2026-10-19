/* ==========================================================================
   DevStudio — interacciones del sitio
   El contenido editable (proyectos y contacto) está en datos.js
   ========================================================================== */

/* --- Configuración de EmailJS (formulario de contacto) --- */
const EMAILJS = {
    publicKey: 'EDHAUOKWemjL3kogx',
    serviceId: 'service_ar841iy',
    templateId: 'template_tzb6m1k'
};

document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* --- 1. Inicio: arrancar arriba salvo que el enlace traiga #seccion --- */
    if (!location.hash && 'scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
    }

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* --- 2. Fondo animado (solo en la portada) --- */
    if (!reduceMotion && window.VANTA && window.THREE) {
        const isMobile = window.innerWidth < 768;
        try {
            VANTA.NET({
                el: '#animated-bg',
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200,
                minWidth: 200,
                scale: 1.0,
                scaleMobile: 1.0,
                color: 0x06b6d4,
                backgroundColor: 0x0a0a0a,
                points: isMobile ? 7 : 10,
                maxDistance: isMobile ? 18 : 20,
                spacing: 16
            });
        } catch (err) {
            console.warn('No se pudo iniciar el fondo animado:', err);
        }
    }

    /* --- 3. Menú móvil --- */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];

    const setMenu = (open) => {
        if (!navMenu || !menuToggle) return;
        navMenu.classList.toggle('open', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars', !open);
        icon.classList.toggle('fa-xmark', open);
    };

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            setMenu(!navMenu.classList.contains('open'));
        });
        navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') && !navMenu.contains(e.target)) setMenu(false);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setMenu(false);
        });
    }

    /* --- 4. Resaltar la sección visible en el menú --- */
    const sections = document.querySelectorAll('main section[id]');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach(section => observer.observe(section));
    }

    /* --- 4b. "Conoce más" en Nosotros --- */
    const aboutMore = document.getElementById('about-more');
    const aboutPanel = document.getElementById('about-experiencia');
    if (aboutMore && aboutPanel) {
        aboutMore.addEventListener('click', () => {
            const open = aboutMore.getAttribute('aria-expanded') === 'true';
            aboutMore.setAttribute('aria-expanded', String(!open));
            aboutPanel.hidden = open;
            document.getElementById('about-more-label').textContent = open ? 'Conoce más' : 'Ver menos';
            if (!open) {
                const top = aboutPanel.getBoundingClientRect().top;
                if (top > window.innerHeight * 0.7) {
                    aboutPanel.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
                }
            }
        });
    }

    /* --- 5. Proyectos --- */
    const projects = (typeof PROYECTOS !== 'undefined' && Array.isArray(PROYECTOS)) ? PROYECTOS : [];
    const grid = document.getElementById('projects-grid');
    const emptyState = document.getElementById('projects-empty');

    // Acepta imágenes como texto ('img/x.jpg') o como objeto ({ src, pie })
    const getImages = (p) => (Array.isArray(p.imagenes) ? p.imagenes : [])
        .map(i => (typeof i === 'string' ? { src: i, pie: '' } : i))
        .filter(i => i && i.src);

    const el = (tag, className, text) => {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    };

    // Lee el tamaño real de cada captura para saber si es de PC o de celular
    const getSize = (src) => new Promise(resolve => {
        const probe = new Image();
        const done = (v) => { clearTimeout(timer); resolve(v); };
        const timer = setTimeout(() => done(null), 5000);
        probe.onload = () => done({ w: probe.naturalWidth, h: probe.naturalHeight });
        probe.onerror = () => done(null);
        probe.src = src;
    });

    const makeShot = (image, kind, title, onOpen) => {
        const btn = el('button', `shot shot-${kind}`);
        btn.type = 'button';
        btn.setAttribute('aria-label', image.pie ? `Ampliar: ${image.pie}` : `Ampliar captura de ${title}`);
        if (kind === 'desktop') {
            const bar = el('span', 'shot-bar');
            bar.setAttribute('aria-hidden', 'true');
            bar.append(el('i'), el('i'), el('i'));
            btn.appendChild(bar);
        }
        const img = el('img');
        img.src = image.src;
        img.alt = image.pie || `Captura de ${title}`;
        img.decoding = 'async';
        btn.appendChild(img);
        btn.addEventListener('click', onOpen);
        return btn;
    };

    async function renderProjects() {
        if (!grid) return;
        if (projects.length === 0) {
            grid.hidden = true;
            if (emptyState) emptyState.hidden = false;
            return;
        }

        const prepared = await Promise.all(projects.map(async (p) => {
            const images = getImages(p);
            const sizes = await Promise.all(images.map(i => getSize(i.src)));
            images.forEach((img, i) => {
                if (typeof img.movil !== 'boolean') img.movil = !!(sizes[i] && sizes[i].h > sizes[i].w);
            });
            return images;
        }));

        projects.forEach((p, index) => {
            const images = prepared[index];
            const row = el('article', 'showcase' + (index % 2 ? ' reverse' : ''));
            row.style.setProperty('--p-color', p.color || '#06b6d4');

            /* Composición: captura de PC principal + celular encima, o solo celulares */
            const media = el('div', 'showcase-media');
            const desktopIdx = images.findIndex(i => !i.movil);
            const phoneIdx = images.map((i, n) => (i.movil ? n : -1)).filter(n => n >= 0);

            if (desktopIdx >= 0) {
                media.appendChild(makeShot(images[desktopIdx], 'desktop', p.titulo, () => openLightbox(index, desktopIdx)));
                if (phoneIdx.length) {
                    media.classList.add('has-phone');
                    media.appendChild(makeShot(images[phoneIdx[0]], 'phone', p.titulo, () => openLightbox(index, phoneIdx[0])));
                }
            } else if (phoneIdx.length) {
                media.classList.add('only-phones');
                phoneIdx.slice(0, 2).forEach(n => {
                    media.appendChild(makeShot(images[n], 'phone', p.titulo, () => openLightbox(index, n)));
                });
            }
            row.appendChild(media);

            /* Texto */
            const body = el('div', 'showcase-body');
            if (p.categoria) body.appendChild(el('p', 'showcase-category', p.categoria));
            body.appendChild(el('h3', 'showcase-title', p.titulo));
            if (p.descripcion) body.appendChild(el('p', 'showcase-desc', p.descripcion));

            if (Array.isArray(p.tecnologias) && p.tecnologias.length) {
                const tags = el('ul', 'showcase-tags');
                tags.setAttribute('aria-label', 'Tecnologías');
                p.tecnologias.forEach(t => tags.appendChild(el('li', '', t)));
                body.appendChild(tags);
            }

            if (images.length > 1) {
                const thumbs = el('ul', 'showcase-thumbs');
                thumbs.setAttribute('aria-label', 'Capturas del proyecto');
                images.forEach((image, n) => {
                    const li = el('li');
                    const t = el('button', 'thumb' + (image.movil ? ' thumb-phone' : ''));
                    t.type = 'button';
                    t.setAttribute('aria-label', `Ver captura ${n + 1} de ${images.length}`);
                    const ti = el('img');
                    ti.src = image.src;
                    ti.alt = '';
                    ti.loading = 'lazy';
                    t.appendChild(ti);
                    t.addEventListener('click', () => openLightbox(index, n));
                    li.appendChild(t);
                    thumbs.appendChild(li);
                });
                body.appendChild(thumbs);
            }

            const actions = el('div', 'showcase-actions');
            if (images.length) {
                const view = el('button', 'btn btn-ghost btn-sm');
                view.type = 'button';
                view.innerHTML = '<i class="fas fa-expand" aria-hidden="true"></i> ';
                view.appendChild(document.createTextNode(images.length > 1 ? `Ver ${images.length} capturas` : 'Ver captura'));
                view.addEventListener('click', () => openLightbox(index, 0));
                actions.appendChild(view);
            }
            if (p.enlace) {
                const link = el('a', 'btn btn-primary btn-sm');
                link.href = p.enlace;
                link.target = '_blank';
                link.rel = 'noopener';
                link.innerHTML = 'Visitar sitio <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>';
                actions.appendChild(link);
            }
            body.appendChild(actions);

            row.appendChild(body);
            grid.appendChild(row);
        });
    }

    renderProjects();

    /* --- 6. Visor de capturas --- */
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbCaption = document.getElementById('lightbox-caption');
    const lbPrev = document.getElementById('lightbox-prev');
    const lbNext = document.getElementById('lightbox-next');
    let lbProject = 0;
    let lbIndex = 0;

    function renderLightbox() {
        const p = projects[lbProject];
        const images = getImages(p);
        const current = images[lbIndex];
        lbImg.src = current.src;
        lbImg.alt = current.pie || `Captura ${lbIndex + 1} de ${images.length}: ${p.titulo}`;
        lbCaption.replaceChildren();
        lbCaption.appendChild(el('strong', '', p.titulo));
        if (current.pie) lbCaption.appendChild(el('span', '', current.pie));
        if (images.length > 1) lbCaption.appendChild(el('span', 'lightbox-counter', `${lbIndex + 1} / ${images.length}`));
        const multi = images.length > 1;
        lbPrev.hidden = !multi;
        lbNext.hidden = !multi;
    }

    function openLightbox(projectIndex, imageIndex) {
        if (!lightbox || typeof lightbox.showModal !== 'function') {
            window.open(getImages(projects[projectIndex])[imageIndex].src, '_blank');
            return;
        }
        lbProject = projectIndex;
        lbIndex = imageIndex;
        renderLightbox();
        lightbox.showModal();
        document.body.classList.add('no-scroll');
    }

    function stepLightbox(delta) {
        const total = getImages(projects[lbProject]).length;
        lbIndex = (lbIndex + delta + total) % total;
        renderLightbox();
    }

    if (lightbox) {
        document.getElementById('lightbox-close').addEventListener('click', () => lightbox.close());
        lbPrev.addEventListener('click', () => stepLightbox(-1));
        lbNext.addEventListener('click', () => stepLightbox(1));
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.close(); });
        lightbox.addEventListener('close', () => document.body.classList.remove('no-scroll'));
        lightbox.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && !lbPrev.hidden) stepLightbox(-1);
            if (e.key === 'ArrowRight' && !lbNext.hidden) stepLightbox(1);
        });
    }

    /* --- 7. Canales de contacto --- */
    const c = (typeof CONTACTO !== 'undefined') ? CONTACTO : {};
    const waLink = c.whatsapp
        ? `https://wa.me/${String(c.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(c.mensajeWhatsapp || '')}`
        : '';

    const channels = [
        waLink && { icon: 'fab fa-whatsapp', label: 'WhatsApp', value: formatPhone(c.whatsapp), href: waLink },
        c.email && { icon: 'fas fa-envelope', label: 'Correo', value: c.email, href: `mailto:${c.email}` },
        c.linkedin && { icon: 'fab fa-linkedin', label: 'LinkedIn', value: 'Ver perfil', href: c.linkedin },
        c.github && { icon: 'fab fa-github', label: 'GitHub', value: c.github.replace(/^https?:\/\/(www\.)?github\.com\//, '').replace(/\/$/, ''), href: c.github }
    ].filter(Boolean);

    function formatPhone(raw) {
        const digits = String(raw || '').replace(/\D/g, '');
        return digits ? `+${digits}` : '';
    }

    const channelList = document.getElementById('contact-channels');
    const socialList = document.getElementById('footer-social');

    channels.forEach(ch => {
        const external = !ch.href.startsWith('mailto:');
        if (channelList) {
            const li = el('li');
            const a = el('a', 'channel');
            a.href = ch.href;
            if (external) { a.target = '_blank'; a.rel = 'noopener'; }
            a.innerHTML = `<i class="${ch.icon}" aria-hidden="true"></i>`;
            const text = el('span', 'channel-text');
            text.appendChild(el('span', 'channel-label', ch.label));
            text.appendChild(el('span', 'channel-value', ch.value));
            a.appendChild(text);
            li.appendChild(a);
            channelList.appendChild(li);
        }
        if (socialList) {
            const li = el('li');
            const a = el('a');
            a.href = ch.href;
            a.setAttribute('aria-label', ch.label);
            if (external) { a.target = '_blank'; a.rel = 'noopener'; }
            a.innerHTML = `<i class="${ch.icon}" aria-hidden="true"></i>`;
            li.appendChild(a);
            socialList.appendChild(li);
        }
    });

    const waFloat = document.getElementById('whatsapp-float');
    if (waFloat && waLink) {
        waFloat.href = waLink;
        waFloat.hidden = false;
    }

    /* --- 8. Formulario (EmailJS) --- */
    const form = document.getElementById('form-consulta');
    const formError = document.getElementById('form-error');

    if (window.emailjs) emailjs.init(EMAILJS.publicKey);

    const fieldMessages = {
        from_name: 'Escribe tu nombre o el de tu empresa.',
        client_phone: 'Escribe un teléfono válido (mínimo 8 dígitos).',
        client_email: 'Revisa el correo electrónico.',
        service_type: 'Selecciona el servicio que te interesa.',
        message: 'Cuéntanos brevemente qué necesitas.'
    };

    if (form) {
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', () => {
                field.classList.remove('invalid');
                field.removeAttribute('aria-invalid');
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            formError.hidden = true;

            const invalid = [...form.elements].filter(f => f.willValidate && !f.checkValidity());
            invalid.forEach(f => { f.classList.add('invalid'); f.setAttribute('aria-invalid', 'true'); });
            if (invalid.length) {
                formError.textContent = fieldMessages[invalid[0].name] || 'Revisa los campos marcados.';
                formError.hidden = false;
                invalid[0].focus();
                return;
            }

            if (!window.emailjs) {
                showToast('No se pudo cargar el servicio de envío. Recarga la página o escríbenos directamente.', true);
                return;
            }

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Enviando…';
            btn.disabled = true;

            const params = {
                from_name: form.from_name.value.trim(),
                client_phone: form.client_phone.value.trim(),
                client_email: form.client_email.value.trim(),
                service_type: form.service_type.value,
                message: form.message.value.trim()
            };

            emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, params)
                .then(() => {
                    showToast('Solicitud enviada. Te contactaremos pronto.');
                    form.reset();
                })
                .catch((error) => {
                    console.error('Error al enviar:', error);
                    showToast('No se pudo enviar la solicitud. Revisa tu conexión e inténtalo de nuevo.', true);
                })
                .finally(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                });
        });
    }

    /* --- 9. Notificación --- */
    let toastTimer;
    function showToast(message, isError = false) {
        const toast = document.getElementById('toast');
        const icon = document.getElementById('toast-icon');
        document.getElementById('toast-message').textContent = message;
        toast.classList.toggle('error', isError);
        icon.className = isError ? 'fas fa-circle-exclamation' : 'fas fa-circle-check';
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 5000);
    }
});
