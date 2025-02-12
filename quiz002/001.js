const todos = [
  { tno: 1, title: "몸만들기", writeday: "2024-05-01", finish: false },
  { tno: 2, title: "현질하기", writeday: "2024-07-20", finish: true }
];
let tno = 3;

console.log(JSON.stringify(todos));

const tbody = document.querySelector("#tbody");

const render = () => {
  tbody.innerHTML = "";
  for (const todo of todos) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.tno}</td>
      <td class="${todo.finish ? "finish" : ""}">${todo.title}</td>
      <td>${todo.writeday}</td>
      <td>
        <button class="toggle btn ${todo.finish ? "btn-success" : "btn-info"}" data-tno="${todo.tno}">
          ${todo.finish ? "완료" : "작업중"}
        </button>
      </td>
      <td>
        <button class="delete btn btn-danger" data-tno="${todo.tno}">삭제</button>
      </td>
    `;

    tbody.appendChild(row);
  }
};

render();

document.querySelector("#addBtn").addEventListener("click", () => {
  const title = document.querySelector("#title").value;
  if (title === "") {
    alert("할 일을 입력하세요");
    return;
  }
  const newTodo = { tno: tno++, title, writeday: new Date().toLocaleDateString(), finish: false };
  todos.push(newTodo);
  render();
});

tbody.addEventListener("click", (event) => {
  if (event.target.classList.contains("toggle")) {
    const tno = event.target.dataset.tno;
    for (const todo of todos) {
      if (todo.tno == tno) {
        todo.finish = !todo.finish;
      }
    }
    render();
  }

  if (event.target.classList.contains("delete")) {
    const tno = event.target.dataset.tno;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].tno == tno) {
        todos.splice(i, 1);
        break;
      }
    }
    render();
  }
});