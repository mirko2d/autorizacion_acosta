export const homePage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gradient-to-r",
    "from-green-400",
    "to-blue-600",
    "flex-col",
    "gap-6"
  );

  const title = document.createElement("h1");
  title.classList.add("text-4xl", "font-extrabold", "text-white", "mb-4");
  title.textContent = "Home Page";

  const btnLogout = document.createElement("button");
  btnLogout.classList.add(
    "bg-red-500",
    "text-white",
    "font-bold",
    "py-3",
    "px-6",
    "rounded-full",
    "shadow-lg",
    "hover:bg-red-600",
    "transition",
    "duration-300",
    "ease-in-out"
  );
  btnLogout.textContent = "Logout";

  btnLogout.addEventListener("click", async () => {
    const response = await fetch("http://localhost:4000/auth/sign-out", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      window.location.pathname = "/";
    }
  });

  const btnTodos = document.createElement("button");
  btnTodos.classList.add(
    "bg-blue-500",
    "text-white",
    "font-bold",
    "py-3",
    "px-6",
    "rounded-full",
    "shadow-lg",
    "hover:bg-blue-600",
    "transition",
    "duration-300",
    "ease-in-out"
  );
  btnTodos.textContent = "View Todos";

  btnTodos.addEventListener("click", () => {
    window.location.pathname = "/todos";
  });

  container.appendChild(title);
  container.appendChild(btnTodos);
  container.appendChild(btnLogout);

  return container;
};
