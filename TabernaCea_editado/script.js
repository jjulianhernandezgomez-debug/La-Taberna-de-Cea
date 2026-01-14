(() => {
  const formatEUR = (n) =>
    n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

  // Menú (según la carta de la imagen)
  const MENU = [
    {
      id: "tostas-y-bocatas",
      title: "Tostas y Bocatas",
      subtitle: "Panes artesanos de masa madre tostados.",
      items: [
        { name: "Tosta de anchoas del Cantábrico", price: 7.00, desc: "" },
        { name: "Tosta de paletilla ibérica", price: 6.50, desc: "" },
        { name: "Tosta de carne mechada", price: 6.50, desc: "" },
        { name: "Tosta de matrimonio", price: 6.50, desc: "" },
        { name: "Bocadillo de calamares", price: 6.50, desc: "Con alioli." },
      ],
    },
    {
      id: "planchaditos",
      title: "Planchaditos",
      subtitle: "Bocadillos calientes con pan de cristal.",
      items: [
        { name: "Jamón york y queso Edam", price: 4.65, desc: "" },
        { name: "Tomate, queso de cabra y rúcula", price: 4.65, desc: "" },
        { name: "Cuatro quesos", price: 4.65, desc: "" },
        { name: "Paletilla ibérica", price: 4.65, desc: "" },
        { name: "Carne mechada, tomate y queso cheddar", price: 4.75, desc: "" },
      ],
    },
    {
      id: "picoteo",
      title: "Picoteo",
      subtitle: "Para abrir boca y compartir.",
      items: [
        { name: "Anchoas “San Filipo”", price: 12.00, desc: "" },
        { name: "Boquerones en vinagre", price: 9.00, desc: "" },
        { name: "Matrimonio (anchoas & boquerones)", price: 10.00, desc: "" },
        { name: "Berberechos gallegos “Mariscadora”", price: 10.00, desc: "" },
        { name: "Navajas de las rías “Vengarroco”", price: 10.00, desc: "" },
        { name: "Mejillones gallegos “Escuris”", price: 8.00, desc: "" },
        { name: "Patatas bravas, alioli o mixtas", price: 7.60, desc: "" },
        { name: "Ensaladilla rusa (sin/con aguacate)", price: 6.00, desc: "6,50 € con aguacate." },
        { name: "Mechas de pollo casero", price: 8.70, desc: "" },
        { name: "Croquetas de jamón ibérico", price: 8.25, desc: "" },
        { name: "Queso curado “Ojos del Guadiana”", price: 7.00, desc: "" },
        { name: "Carne mechada", price: 7.35, desc: "" },
        { name: "Paletilla ibérica", price: 10.50, desc: "" },
        { name: "Pimientos de padrón", price: 6.00, desc: "" },
        { name: "Espárragos trigueros", price: 7.00, desc: "" },
      ],
    },
    {
      id: "fresquito",
      title: "Fresquito",
      subtitle: "Ensaladas y opciones ligeras.",
      items: [
        { name: "Tomate aliñado", price: 6.80, desc: "" },
        { name: "Ensalada de tomate con perlas de mozzarella", price: 9.00, desc: "" },
        { name: "Tomate con ventresca de bonito del norte", price: 12.80, desc: "" },
        { name: "Ensalada griega", price: 9.00, desc: "Tomate, feta, pimientos, pepino y cebolla." },
        { name: "Gazpacho fresco", price: 5.50, desc: "" },
        { name: "Salmorejo cordobés", price: 5.50, desc: "" },
      ],
    },
    {
      id: "para-compartir",
      title: "Para compartir",
      subtitle: "Raciones calientes con sabor de taberna.",
      items: [
        { name: "Secreto de cerdo ibérico", price: 10.75, desc: "Con pimientos de padrón." },
        { name: "Rabas de calamar de potera", price: 9.00, desc: "" },
        { name: "Pulpo traído de Galicia", price: 12.80, desc: "A feira o en pipirrana." },
        { name: "Callos a la madrileña", price: 9.00, desc: "" },
        { name: "Lentejas con verduras", price: 5.50, desc: "" },
      ],
    },
    {
      id: "tortillas",
      title: "Tortillas de Cea",
      subtitle: "Recién hechas al momento.",
      items: [
        { name: "Española sola o con cebolla", price: 5.20, desc: "" },
        { name: "Ingrediente adicional", price: 1.00, desc: "Chorizo, queso curado, jamón o trufa." },
        { name: "Ración de pan de masa madre (normal)", price: 1.00, desc: "" },
        { name: "Ración de pan de masa madre (grande)", price: 1.50, desc: "" },
      ],
    },
    {
      id: "postres",
      title: "Postres",
      subtitle: "Hechos aquí a diario.",
      items: [
        { name: "Tarta de queso fresco", price: 4.60, desc: "Con coulis de frutos rojos." },
        { name: "Tiramisú ligero", price: 4.60, desc: "" },
        { name: "Trufas de cacao", price: 4.60, desc: "" },
        { name: "Panacotta", price: 4.60, desc: "Infusionada con vainilla y canela." },
      ],
    },
  ];

  // ---------- Helpers DOM ----------
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const setAriaHidden = (el, hidden) => el && el.setAttribute("aria-hidden", hidden ? "true" : "false");

  const smoothScrollTo = (hash) => {
    const target = qs(hash);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ---------- Año footer ----------
  const yearEl = qs("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ---------- Menú por secciones (tabs) ----------
  const tabsWrap = qs("#menuTabs");
  const menuTitle = qs("#menuTitle");
  const menuSubtitle = qs("#menuSubtitle");
  const menuList = qs("#menuList");

  const renderMenu = (sectionId) => {
    const section = MENU.find((s) => s.id === sectionId) || MENU[0];

    // Tabs active
    qsa(".tab", tabsWrap).forEach((b) => {
      b.classList.toggle("is-active", b.dataset.id === section.id);
    });

    // Header
    if (menuTitle) menuTitle.textContent = section.title;
    if (menuSubtitle) menuSubtitle.textContent = section.subtitle || "";

    // List
    if (!menuList) return;
    menuList.innerHTML = section.items
      .map((it) => {
        const desc = (it.desc || "").trim();
        return `
          <article class="menuItem">
            <div class="menuItem__top">
              <p class="menuItem__name">${it.name}</p>
              <div class="menuItem__price">${formatEUR(it.price)}</div>
            </div>
            ${desc ? `<p class="menuItem__desc">${desc}</p>` : ""}
          </article>
        `;
      })
      .join("");
  };

  const buildTabs = () => {
    if (!tabsWrap) return;
    tabsWrap.innerHTML = MENU.map(
      (s) => `<button class="tab" type="button" data-id="${s.id}">${s.title}</button>`
    ).join("");

    tabsWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".tab");
      if (!btn) return;
      renderMenu(btn.dataset.id);
    });

    renderMenu(MENU[0].id);
  };

  buildTabs();

  // Botones "Ver menú" / "Ver vinos" / etc
  qsa("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => smoothScrollTo(btn.getAttribute("data-scroll")));
  });

  // ---------- Lightbox (galería + quienés somos si existiera) ----------
  const lightbox = qs("#lightbox");
  const lightboxImg = qs("#lightboxImg");
  const lightboxCaption = qs("#lightboxCaption");

  const openLightbox = ({ src, alt }) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    if (lightboxCaption) lightboxCaption.textContent = alt || "";
    lightbox.classList.add("is-open");
    setAriaHidden(lightbox, false);
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove("is-open");
    setAriaHidden(lightbox, true);
    lightboxImg.src = "";
    lightboxImg.alt = "";
    if (lightboxCaption) lightboxCaption.textContent = "";
  };

  qsa("[data-img]").forEach((btn) => {
    btn.addEventListener("click", () => openLightbox({ src: btn.dataset.img, alt: btn.dataset.alt }));
  });

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) closeLightbox();
    });
  }

  // ---------- Modal reservas ----------
  const reserveModal = qs("#reserveModal");
  const openReserveBtns = [qs("#openReserveBtn"), qs("#openReserveBtn2")].filter(Boolean);
  const reserveForm = qs("#reserveForm");

  const openReserve = () => {
    if (!reserveModal) return;
    reserveModal.classList.add("is-open");
    setAriaHidden(reserveModal, false);
  };
  const closeReserve = () => {
    if (!reserveModal) return;
    reserveModal.classList.remove("is-open");
    setAriaHidden(reserveModal, true);
  };

  openReserveBtns.forEach((b) => b.addEventListener("click", openReserve));
  if (reserveModal) {
    reserveModal.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) closeReserve();
    });
  }

  if (reserveForm) {
    reserveForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Solo cierre: no enviamos a servidor.
      closeReserve();
    });
  }

  // ---------- ESC para cerrar ----------
  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeLightbox();
    closeReserve();
  });

  // ---------- Estado activo en el nav ----------
  const navLinks = qsa(".nav__link");
  const sectionIds = navLinks
    .map((a) => a.getAttribute("href"))
    .filter((h) => h && h.startsWith("#"));

  const sections = sectionIds
    .map((h) => qs(h))
    .filter(Boolean);

  const updateActiveNav = () => {
    const y = window.scrollY + 120; // offset por topbar
    let current = "#inicio";
    for (const sec of sections) {
      if (sec.offsetTop <= y) current = `#${sec.id}`;
    }
    navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === current));
  };

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();
})();