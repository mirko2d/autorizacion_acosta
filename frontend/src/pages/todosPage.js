export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "min-h-screen",
    "bg-gradient-to-r",
    "from-green-400",
    "to-blue-600",
    "text-white"
  );

  // Botón Home
  const btnHome = document.createElement("button");
  btnHome.classList.add(
    "bg-blue-500",
    "text-white",
    "p-3",
    "rounded-full",
    "shadow-lg",
    "hover:bg-blue-600",
    "transition",
    "duration-500",
    "ease-in-out",
    "mb-4"
  );
  btnHome.textContent = "Home";
  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  // Título
  const title = document.createElement("h1");
  title.classList.add("text-5xl", "font-extrabold", "mb-6");
  title.textContent = "List of Todos";

  // Botón Crear
  const btnCreate = document.createElement("button");
  btnCreate.classList.add(
    "bg-teal-500",
    "text-white",
    "p-4",
    "rounded-full",
    "shadow-lg",
    "hover:bg-teal-600",
    "transition",
    "duration-300",
    "ease-in-out",
    "mb-4"
  );
  btnCreate.textContent = "Crear Todo";

  // Tabla
  const table = document.createElement("table");
  table.classList.add(
    "w-full",
    "bg-white",
    "shadow-2xl",
    "rounded-lg",
    "overflow-hidden",
    "text-gray-800"
  );

  // Crear la cabecera de la tabla
  const thead = document.createElement("thead");
  thead.classList.add("bg-indigo-600", "text-white");

  const tr = document.createElement("tr");

  const th1 = document.createElement("th");
  th1.classList.add("px-6", "py-3", "border-b");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("px-6", "py-3", "border-b");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("px-6", "py-3", "border-b");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("px-6", "py-3", "border-b");
  th4.textContent = "Owner Id";

  const th5 = document.createElement("th");
  th5.classList.add("px-6", "py-3", "border-b");
  th5.textContent = "Actions"; // Nueva columna para acciones

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5); // Añadir la nueva columna al encabezado
  thead.appendChild(tr);

  const tbody = document.createElement("tbody");

  table.appendChild(thead);
  table.appendChild(tbody);

  // Función para agregar una fila a la tabla
  const addTodoToTable = (todo) => {
    const tr = document.createElement("tr");
    tr.classList.add("bg-gray-50", "hover:bg-gray-100");

    const td1 = document.createElement("td");
    td1.classList.add("px-6", "py-4", "border-b", "text-center", "text-sm");
    td1.textContent = todo.id;

    const td2 = document.createElement("td");
    td2.classList.add("px-6", "py-4", "border-b", "text-center", "text-base");
    td2.textContent = todo.title;

    const td3 = document.createElement("td");
    td3.classList.add("px-6", "py-4", "border-b", "text-center", "text-base");
    td3.textContent = todo.completed ? "✅ Sí" : "❌ No";
    td3.classList.add(todo.completed ? "text-green-500" : "text-red-500");

    const td4 = document.createElement("td");
    td4.classList.add("px-6", "py-4", "border-b", "text-center", "text-base");
    td4.textContent = todo.owner;

    const td5 = document.createElement("td");
    td5.classList.add("px-6", "py-4", "border-b", "text-center");

    // Botón de eliminar
    const btnDelete = document.createElement("button");
    btnDelete.classList.add(
      "bg-red-600",
      "text-white",
      "p-3",
      "rounded",
      "hover:bg-red-700",
      "transition",
      "duration-300",
      "ease-in-out"
    );
    btnDelete.textContent = "Eliminar";
    btnDelete.addEventListener("click", () => {
      console.log(`Eliminando todo con ID: ${todo.id}`);
      tr.remove(); // Remover la fila de la tabla
    });

    // Botón de editar
    const btnEdit = document.createElement("button");
    btnEdit.classList.add(
      "bg-yellow-500",
      "text-white",
      "p-3",
      "rounded",
      "hover:bg-yellow-600",
      "transition",
      "duration-300",
      "ease-in-out",
      "ml-2"
    );
    btnEdit.textContent = "Editar";
    btnEdit.addEventListener("click", () => {
      const newTitle = prompt("Ingrese la nueva descripción del Todo:", todo.title);
      if (!newTitle) {
        alert("Debe ingresar una descripción.");
        return;
      }

      const newCompletedInput = prompt("¿Está completado el todo? (Sí/No)", todo.completed ? "Sí" : "No").toLowerCase();
      const newCompleted = newCompletedInput === "sí" || newCompletedInput === "si";

      todo.title = newTitle;
      todo.completed = newCompleted;

      td2.textContent = newTitle;
      td3.textContent = newCompleted ? "✅ Sí" : "❌ No";
      td3.classList.add(newCompleted ? "text-green-500" : "text-red-500");

      console.log(`Todo actualizado con ID: ${todo.id}`, todo);
    });

    td5.appendChild(btnDelete);
    td5.appendChild(btnEdit);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tbody.appendChild(tr);
  };

  container.appendChild(btnHome);
  container.appendChild(btnCreate);

  let commonOwner = null;

  fetch("http://localhost:4000/todos", {
    credentials: "include"
  })
    .then((response) => response.json())
    .then((data) => {
      data.todos.forEach((todo, index) => {
        if (todo.id === 0) return;

        if (index === 0) {
          commonOwner = todo.owner;
        }

        addTodoToTable(todo);
      });
    });

  btnCreate.addEventListener("click", () => {
    let maxId = 0;
    document.querySelectorAll("tbody tr").forEach((row) => {
      const id = parseInt(row.children[0].textContent);
      if (id > maxId) {
        maxId = id;
      }
    });

    const newId = maxId + 1;
    const title = prompt("Ingrese la descripción del Todo:");
    if (!title) {
      alert("Debe ingresar una descripción.");
      return;
    }

    const completedInput = prompt("¿Está completado el todo? (Sí/No)").toLowerCase();
    const completed = completedInput === "sí" || completedInput === "si" ? true : false;

    const newTodo = {
      id: newId,
      title: title,
      completed: completed,
      owner: commonOwner || "User123"
    };

    addTodoToTable(newTodo);
    console.log("Nuevo todo creado:", newTodo);
  });

  container.appendChild(title);
  container.appendChild(table);

  return container;
};
