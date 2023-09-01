// контейнер - return container
function createContainer() {
  const container = document.createElement("div");
  container.classList.add("container");
  return container;
}

//шапка - return header
function createHeader() {
  const header = document.createElement("header");
  header.classList.add("header");

  const headerContainer = createContainer(); //div.container
  header.append(headerContainer); //header > div.container

  //сылка на внутренний контейнер div.container внутри header
  header.headerContainer = headerContainer; //вложенный div.container

  return header;
}

//логотип - return h1
function createLogo(title) {
  const h1 = document.createElement("h1");
  h1.classList.add("logo");
  h1.textContent = `Телефон ${title}`;
  return h1;
}

//main - return main
function createMain() {
  const main = document.createElement("main");
  const mainContainer = createContainer();
  main.append(mainContainer);
  main.mainContainer = mainContainer;
  return main;
}

//создание обертки и 2х кнопок внутри - return {массив кнопок и обертку кнопок}
function createButtonsGroup(params) {
  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("btn-wrapper");

  //массив из 2 кнопок
  const btns = params.map(({ className, type, text }) => {
    const button = document.createElement("button");
    button.type = type;
    button.textContent = text;
    button.className = className;
    return button;
  });

  //div.btnWrapper и в нем 2 кнопки.
  btnWrapper.append(...btns);

  return {
    btnWrapper,
    btns,
  };
}
//создание таблица (шапка таблица, пустое тело таблицы) - return table
function createTable() {
  const table = document.createElement("table");
  table.classList.add("table", "table-striped");

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
    <th class='delete'>Удалить</th>
    <th>Имя</th>
    <th>Фамилия</th>
    <th>Телефон</th>

    </tr>
    `;

  const tbody = document.createElement("tbody");

  table.append(thead, tbody);

  table.tbody = tbody;

  return table;
}

//создание overlay - return {оверлей и его форму}
function createForm() {
  const overlay = document.createElement("div");
  overlay.classList.add("form-overlay");
  const form = document.createElement("form");
  form.classList.add("form");

  form.innerHTML = `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label for="name" class="form-label">Name:</label>
        <input id="name" type="text" class="form-input" name="name" required />
      </div>
      <div class="form-group">
        <label for="surname" class="form-label">surname:</label>
        <input id="surname" type="text" class="form-input" name="surname" required />
      </div>
      <div class="form-group">
        <label for="phone" class="form-label">Phone:</label>
        <input id="phone" type="number" class="form-input" name="phone" required />
      </div>
    `;

  const buttonsGroup = createButtonsGroup([
    {
      className: "btn btn-primary mr-3",
      type: "submit",
      text: "Добавить",
    },
    {
      className: "btn btn-danger",
      type: "reset",
      text: "Отмена",
    },
  ]);

  form.append(...buttonsGroup.btns);

  overlay.append(form);

  return {
    overlay,
    form,
  };
}
//создание строки tr - ряд th - столбец td - ячейка
function createRow({ name, surname, phone }) {
  const tr = document.createElement("tr");
  tr.classList.add("contact");

  //крестик для удаления записи
  const tdDel = document.createElement("td");
  tdDel.classList.add("delete");
  const buttonDel = document.createElement("button");
  buttonDel.classList.add("del-icon");
  tdDel.append(buttonDel);

  const tdName = document.createElement("td");
  tdName.textContent = `${name}`;

  const tdSurname = document.createElement("td");
  tdSurname.textContent = `${surname}`;

  const tdPhone = document.createElement("td");
  const phoneLink = document.createElement("a");
  phoneLink.href = `tel:${phone}`;
  phoneLink.textContent = `${phone}`;

  tr.phoneLink = phoneLink;
  tdPhone.append(phoneLink);
  tr.append(tdDel, tdName, tdSurname, tdPhone);

  return tr;
}

// footer - return footer
function createFooter() {
  const footer = document.createElement("footer");
  footer.classList.add("footer");

  const footerContainer = createContainer();
  footer.append(footerContainer);
  footer.footerContainer = footerContainer;
  return footer;
}

export default {
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createFooter,
  createRow,
};
