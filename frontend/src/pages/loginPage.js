export const loginPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gradient-to-r",
    "from-green-400",
    "to-blue-600"
  );

  const form = document.createElement("form");

  form.classList.add(
    "flex",
    "flex-col",
    "w-1/4", // Cambié el ancho para que sea más consistente con el diseño de la página de todos
    "gap-6",
    "bg-white",
    "p-8",
    "rounded-lg",
    "shadow-2xl"
  );

  const title = document.createElement("h2");
  title.classList.add("text-3xl", "font-extrabold", "text-center", "mb-4");
  title.textContent = "Login Form";

  const usernameInput = document.createElement("input");

  usernameInput.type = "text";
  usernameInput.id = "username";
  usernameInput.name = "username";
  usernameInput.required = true;
  usernameInput.classList.add(
    "w-full",
    "p-3",
    "border",
    "border-gray-300",
    "rounded-lg",
    "shadow-inner",
    "focus:outline-none",
    "focus:ring",
    "focus:ring-teal-500"
  );
  usernameInput.placeholder = "Username";

  const passwordInput = document.createElement("input");

  passwordInput.type = "password";
  passwordInput.id = "password";
  passwordInput.required = true;
  passwordInput.name = "password";
  passwordInput.classList.add(
    "w-full",
    "p-3",
    "border",
    "border-gray-300",
    "rounded-lg",
    "shadow-inner",
    "focus:outline-none",
    "focus:ring",
    "focus:ring-teal-500"
  );
  passwordInput.placeholder = "Password";

  const submitButton = document.createElement("button");

  submitButton.type = "submit";
  submitButton.classList.add(
    "w-full",
    "bg-teal-500",
    "hover:bg-teal-600",
    "text-white",
    "font-bold",
    "py-3",
    "px-4",
    "rounded-full",
    "shadow-lg",
    "transition",
    "duration-300",
    "ease-in-out"
  );
  submitButton.textContent = "Login";

  // Div para mostrar errores
  const divError = document.createElement("div");
  divError.id = "message";
  divError.classList.add("text-red-500", "mt-2", "hidden");

  form.appendChild(title);
  form.appendChild(usernameInput);
  form.appendChild(passwordInput);
  form.appendChild(submitButton);
  form.appendChild(divError);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Validación básica
    if (!username || !password) {
      divError.innerText = "Por favor, completa todos los campos.";
      divError.classList.remove("hidden");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/auth/sign-in", {
        method: "POST",
        credentials: "include", // Importante para enviar las cookies de sesión
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        divError.innerText = "Credenciales inválidas";
        divError.classList.remove("hidden");

        setTimeout(() => {
          divError.classList.add("hidden");
        }, 3500);

        return;
      }

      const data = await response.json();
      console.log(data);
      window.location.pathname = "/home";
    } catch (error) {
      console.error("Error:", error);
    }
  });

  container.appendChild(form);

  return container;
};
