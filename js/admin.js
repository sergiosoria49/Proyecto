if (document.querySelector(".logout-admin")) {
  // Si no está logueado, lo mandamos al login
  const isAdmin = localStorage.getItem("isAdmin");
  if (isAdmin !== "true") {
    window.location.href = "index.html";
  }

  // Botón de logout
  document.querySelector(".logout-admin").addEventListener("click", () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "index.html";
  });
}