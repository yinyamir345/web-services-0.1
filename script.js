// Manejo del registro
document
  .getElementById("registerForm")
  ?.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evitar el envío del formulario

    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Registro exitoso");
        window.location.href = "login.html"; // Redirigir a la página de inicio de sesión
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al registrar el usuario.");
    }
  });

// Manejo del inicio de sesión
document
  .getElementById("loginForm")
  ?.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evitar el envío del formulario

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Inicio de sesión exitoso");
        window.location.href = "index.html"; // Redirigir a la página principal
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al iniciar sesión.");
    }
  });
