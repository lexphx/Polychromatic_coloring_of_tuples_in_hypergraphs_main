const sections = Array.from(document.querySelectorAll("main section[id]"));
const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));

function updateActiveLink() {
  // adjust if you have a fixed header
  const offset = 120;
  let currentId = sections[0]?.id;
  let bestScore = Infinity;

  sections.forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    // only consider sections that are at least partly in view
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

    const score = Math.abs(rect.top - offset);
    if (score < bestScore) {
      bestScore = score;
      currentId = sec.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + currentId
    );
  });
}

document.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("load", updateActiveLink);
window.addEventListener("resize", updateActiveLink);
