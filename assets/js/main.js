/**
 * MomoSomo — page interactions.
 *
 * Every page's header, footer, menu, and gallery content is plain static
 * HTML already sitting in the document — nothing here inserts content.
 * This file only ever toggles classes/attributes on elements that already
 * exist, so the site works fully with JavaScript disabled; JS just adds
 * the mobile nav, the veg filter, scroll reveal and the gallery lightbox
 * on top of it.
 */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
   * Mobile navigation
   * ------------------------------------------------------------------- */
  const navToggle = document.querySelector("[data-nav-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  if (navToggle && mobileNav) {
    const closeNav = () => {
      navToggle.setAttribute("aria-expanded", "false");
      mobileNav.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    const openNav = () => {
      navToggle.setAttribute("aria-expanded", "true");
      mobileNav.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeNav() : openNav();
    });

    mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });

    const desktopQuery = window.matchMedia("(min-width: 960px)");
    desktopQuery.addEventListener("change", (e) => { if (e.matches) closeNav(); });
  }

  /* ---------------------------------------------------------------------
   * Header shadow after scroll
   * ------------------------------------------------------------------- */
  const header = document.querySelector("[data-header]");
  if (header) {
    const setScrolled = () => header.classList.toggle("is-scrolled", window.scrollY > 4);
    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });
  }

  /* ---------------------------------------------------------------------
   * Scroll reveal — gentle, once-only, skipped entirely for reduced motion
   * ------------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll("[data-reveal], [data-reveal-fade]");
  if (revealTargets.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealTargets.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      revealTargets.forEach((el) => io.observe(el));
    }
  }

  /* ---------------------------------------------------------------------
   * Menu page: veg filter + active category jump-link
   * ------------------------------------------------------------------- */
  const filterChips = document.querySelectorAll("[data-filter]");
  const menuItems = document.querySelectorAll(".menu-item");

  if (filterChips.length && menuItems.length) {
    filterChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        filterChips.forEach((c) => c.setAttribute("aria-pressed", "false"));
        chip.setAttribute("aria-pressed", "true");
        const mode = chip.dataset.filter; // "all" | "veg"
        menuItems.forEach((item) => {
          const show = mode === "all" || item.dataset.veg === "true";
          item.hidden = !show;
        });
      });
    });
  }

  const jumpLinks = document.querySelectorAll(".jump-link");
  const categorySections = document.querySelectorAll(".menu-category");
  if (jumpLinks.length && categorySections.length && "IntersectionObserver" in window) {
    const linkFor = (id) => document.querySelector(`.jump-link[href="#${id}"]`);
    const catObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            jumpLinks.forEach((l) => l.classList.remove("is-active"));
            const link = linkFor(entry.target.id);
            if (link) link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    categorySections.forEach((section) => catObserver.observe(section));
  }

  /* ---------------------------------------------------------------------
   * Gallery: click to view a larger version via the native <dialog>
   * ------------------------------------------------------------------- */
  const galleryDialog = document.querySelector("[data-gallery-dialog]");
  if (galleryDialog) {
    const dialogImg = galleryDialog.querySelector("img");
    const dialogCaption = galleryDialog.querySelector("figcaption");
    document.querySelectorAll(".gallery-item").forEach((item) => {
      item.querySelector("img").style.cursor = "zoom-in";
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        dialogImg.src = img.src;
        dialogImg.alt = img.alt;
        dialogCaption.textContent = item.querySelector("figcaption")?.textContent || "";
        galleryDialog.showModal();
      });
    });
    galleryDialog.addEventListener("click", (e) => {
      if (e.target === galleryDialog) galleryDialog.close();
    });
  }
})();
