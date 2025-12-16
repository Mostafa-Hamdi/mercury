// ==========================================
// MERCURY EXPRESS - NAVIGATION JAVASCRIPT
// FINAL STABLE VERSION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");
  const navOverlay = document.getElementById("navOverlay");
  const toggleIcon = mobileToggle ? mobileToggle.querySelector("i") : null;

  const dropdownToggle = document.getElementById("dropdownToggle");
  const dropdown = document.getElementById("dropdown4");

  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.querySelector(".navbar");

  // ==========================================
  // TOGGLE MOBILE MENU
  // ==========================================
  function toggleMenu() {
    if (!navMenu || !navOverlay) return;

    navMenu.classList.toggle("active");
    navOverlay.classList.toggle("active");

    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "";

    if (toggleIcon) {
      toggleIcon.classList.toggle("fa-bars");
      toggleIcon.classList.toggle("fa-times");
    }
  }

  // ==========================================
  // MOBILE TOGGLE BUTTON
  // ==========================================
  if (mobileToggle) {
    mobileToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // ==========================================
  // OVERLAY CLICK CLOSE
  // ==========================================
  if (navOverlay) {
    navOverlay.addEventListener("click", toggleMenu);
  }

  // ==========================================
  // CLOSE MENU WHEN CLICKING nav-end (EXCEPT LANGUAGE)
  // ==========================================
  if (navMenu) {
    navMenu.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        // ❌ لا تقفل لو الضغط على زر اللغة أو dropdown
        if (
          e.target.closest("#dropdownToggle") ||
          e.target.closest(".dropdown")
        ) {
          return;
        }

        toggleMenu();
      }
    });
  }

  // ==========================================
  // NAV LINKS CLOSE MENU
  // ==========================================
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        toggleMenu();
      }
    });
  });

  // ==========================================
  // LANGUAGE DROPDOWN (DO NOT CLOSE NAV)
  // ==========================================
  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation(); // 🔥 أهم سطر

      dropdown.classList.toggle("show");
      dropdownToggle.classList.toggle("active");
    });
  }

  // ==========================================
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // ==========================================
  document.addEventListener("click", function (e) {
    if (
      dropdown &&
      dropdown.classList.contains("show") &&
      !e.target.closest("#dropdownToggle") &&
      !e.target.closest(".dropdown")
    ) {
      dropdown.classList.remove("show");
      dropdownToggle.classList.remove("active");
    }
  });

  // ==========================================
  // CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
  // ==========================================
  document.addEventListener("click", function (e) {
    if (
      window.innerWidth <= 768 &&
      navMenu.classList.contains("active") &&
      !navMenu.contains(e.target) &&
      mobileToggle &&
      !mobileToggle.contains(e.target)
    ) {
      toggleMenu();
    }
  });

  // ==========================================
  // NAVBAR SCROLL EFFECT
  // ==========================================
  window.addEventListener("scroll", function () {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  // ==========================================
  // CLOSE MENU ON RESIZE
  // ==========================================
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
      toggleMenu();
    }
  });

  // ==========================================
  // KEYBOARD ACCESSIBILITY
  // ==========================================
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (navMenu.classList.contains("active")) toggleMenu();
      if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
        dropdownToggle.classList.remove("active");
      }
    }
  });

  // ==========================================
  // SMOOTH SCROLL
  // ==========================================
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.getElementById(href.substring(1));
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 300);
        }
      }
    });
  });

  // ==========================================
  // ACTIVE LINK ON SCROLL
  // ==========================================
  window.addEventListener("scroll", function () {
    const pos = window.scrollY + 120;

    // 👇 Always activate HOME when near top
    if (window.scrollY < 200) {
      navLinks.forEach((l) => l.classList.remove("active"));
      const homeLink = document.querySelector('a[href="#home"]');
      if (homeLink) homeLink.classList.add("active");
      return;
    }

    // 👇 Normal section handling
    navLinks.forEach(function (link) {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const section = document.getElementById(href.substring(1));
      if (!section) return;

      if (
        pos >= section.offsetTop &&
        pos < section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });
});
