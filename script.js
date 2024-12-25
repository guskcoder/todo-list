document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");
  const deletePopup = document.getElementById("deletePopup");
  const confirmDeleteBtn = document.getElementById("confirmDelete");
  const cancelDeleteBtn = document.getElementById("cancelDelete");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let taskToDelete = null;

  // Função para salvar tarefas no localStorage
  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Função para mostrar o popup
  const showDeletePopup = (index) => {
    taskToDelete = index;
    deletePopup.classList.add("active");
  };

  // Função para esconder o popup
  const hideDeletePopup = () => {
    deletePopup.classList.remove("active");
    taskToDelete = null;
  };

  // Função para renderizar as tarefas
  const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      const taskSpan = document.createElement("span");
      taskSpan.textContent = task.text;
      if (task.completed) {
        taskSpan.classList.add("completed");
      }

      const completeBtn = document.createElement("button");
      completeBtn.innerHTML = `<i class="fas ${
        task.completed ? "fa-undo" : "fa-check"
      }"></i>`;
      completeBtn.title = task.completed ? "Desfazer" : "Completar";
      completeBtn.onclick = () => toggleTask(index);

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
      deleteBtn.title = "Excluir";
      deleteBtn.onclick = () => showDeletePopup(index);

      li.appendChild(taskSpan);
      li.appendChild(completeBtn);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  };

  // Função para adicionar nova tarefa
  const addTask = () => {
    const text = taskInput.value.trim();
    if (text) {
      tasks.push({ text, completed: false });
      taskInput.value = "";
      saveTasks();
      renderTasks();
    }
  };

  // Função para deletar tarefa
  const deleteTask = () => {
    if (taskToDelete !== null) {
      tasks.splice(taskToDelete, 1);
      hideDeletePopup();
      saveTasks();
      renderTasks();
    }
  };

  // Event listeners
  addTaskButton.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  // Event listeners do popup
  confirmDeleteBtn.addEventListener("click", deleteTask);
  cancelDeleteBtn.addEventListener("click", hideDeletePopup);
  deletePopup.addEventListener("click", (e) => {
    if (e.target === deletePopup) {
      hideDeletePopup();
    }
  });

  // Função para alternar estado da tarefa
  const toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  };

  // Renderizar tarefas iniciais
  renderTasks();

  // Foco automático no input
  taskInput.focus();
});
