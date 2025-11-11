// --- Configuración del "usuario admin" ---
const ADMIN_EMAIL = "admin@miweb.com";
const ADMIN_PASS = "1234";

// --- Si estamos en index.html (login) ---
  const form = document.querySelector(".login-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector(".login-form__input-email").value.toLowerCase();
    const password = document.querySelector(".login-form__input-contraseña").value;

    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      // Guardamos sesión en localStorage
      localStorage.setItem("isAdmin", "true");

      // Redirigimos al panel
      window.location.href = "admin.html";
    } else {
      alert("Credenciales incorrectas");
    }
  });



