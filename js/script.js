// Solo interacciones locales: no se envían datos ni se llama a la web original.
const menu = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
const locationInput = document.querySelector("#location");
const searchStatus = document.querySelector("#search-status");
const newsletter = document.querySelector("#newsletter");
const newsletterStatus = document.querySelector("#newsletter-status");

if (menu && navigation) {
  const navLinks = navigation.querySelectorAll("a[href]");

  menu.addEventListener("click", () => {
    const open = navigation.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });

  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
    }),
  );
}

let mode = "Compra";
document.querySelectorAll("[data-mode]").forEach((button) =>
  button.addEventListener("click", () => {
    mode = button.dataset.mode;
    document.querySelectorAll("[data-mode]").forEach((tab) => {
      const selected = tab === button;
      tab.classList.toggle("selected", selected);
      tab.setAttribute("aria-pressed", String(selected));
    });

    if (locationInput) {
      locationInput.placeholder =
        mode === "Buscar por ID"
          ? "ID de la propiedad"
          : mode === "Número de rótulo"
            ? "Número de rótulo"
            : "Ubicación";
    }

    if (searchStatus) {
      searchStatus.textContent = "";
    }
  }),
);

const searchForm = document.querySelector("#search-form");
if (searchForm) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (searchStatus) {
      searchStatus.textContent = `Búsqueda de demostración: ${mode}. Para mostrar resultados reales, conecta tu catálogo de propiedades.`;
    }
  });
}

document.querySelectorAll("[data-direction]").forEach((button) =>
  button.addEventListener("click", () => {
    const track = document.querySelector(".category-track");
    if (!track) return;
    track.scrollBy({
      left:
        Number(button.dataset.direction) *
        (track.querySelector(".category").offsetWidth + 26),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }),
);

if (newsletter) {
  newsletter.addEventListener("submit", (event) => {
    event.preventDefault();
    if (newsletterStatus) {
      newsletterStatus.textContent =
        "Formulario de demostración. No se ha enviado ni guardado información.";
    }
  });
}
