{
  const data = [
    {
      name: "Иван",
      surname: "Петров",
      phone: "+79514545454",
    },
    {
      name: "Игорь",
      surname: "Семёнов",
      phone: "+79999999999",
    },
    {
      name: "Семён",
      surname: "Иванов",
      phone: "+79800252525",
    },
    {
      name: "Мария",
      surname: "Попова",
      phone: "+79876543210",
    },
  ];

  function createContainer() {
    const container = document.createElement("div");
    container.classList.add("container");
    return container;
  }

  function createHeader() {
    const header = document.createElement("header");
    header.classList.add("header");

    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;

    return header;
  }

  function createLogo(title) {
    const h1 = document.createElement("h1");
    h1.classList.add("logo");
    h1.textContent = `Телефон ${title}`;
    return h1;
  }

  function createMain() {
    const main = document.createElement("main");
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
  }

  function createButtonsGroup(params) {
    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("btn-wrapper");

    const btns = params.map(({ className, type, text }) => {
      const button = document.createElement("button");
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  }

  function createTable() {
    const table = document.createElement("table");
    table.classList.add("table", "table-striped");

    const thead = document.createElement("thead");
    thead.insertAdjacentHTML(
      "beforeend",
      `
    <tr>
    <th class='delete'>Удалить</th>
    <th>Имя</th>
    <th>Фамилия</th>
    <th>Телефон</th>

    </tr>
    `
    );
    const tbody = document.createElement("tbody");

    table.append(thead, tbody);

    table.tbody = tbody;

    return table;
  }

  function createForm() {
    const overlay = document.createElement("div");
    overlay.classList.add("form-overlay");
    const form = document.createElement("form");
    form.classList.add("form");

    form.insertAdjacentHTML(
      "beforeend",
      `
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
    `
    );

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

  const render = (app, title) => {
    console.log("app: ", app);

    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const footer = createFooter();
    const buttonsGroup = createButtonsGroup([
      {
        className: "btn btn-primary mr-3",
        type: "button",
        text: "Добавить",
      },
      {
        className: "btn btn-danger",
        type: "button",
        text: "Удалить",
      },
    ]);
    console.log("buttonsGroup: ", buttonsGroup);
    const table = createTable();
    const form = createForm();

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonsGroup.btnWrapper, table, form.overlay);

    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonsGroup.btns[0],
      form: form.form,
      formOverlay: form.overlay,
    };
  };

  function createRow({ name, surname, phone }) {
    const tr = document.createElement("tr");
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
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;

    tdPhone.append(phoneLink);

    tr.append(tdDel, tdName, tdSurname, tdPhone);

    return tr;
  }
  function createFooter() {
    const footer = document.createElement("footer");
    footer.classList.add("footer");

    const footerContainer = createContainer();
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;
    return footer;
  }

  function renderContacts(el, data) {
    const allRow = data.map(createRow);
    el.append(...allRow);
    return allRow;
  }

  function hoverRow(allRow, logo) {
    const text = logo.textContent;
    allRow.forEach((contact) => {
      contact.addEventListener("mouseenter", () => {
        console.log("mouseEnter", contact);
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener("mouseleave", () => {
        console.log("mouseleave", contact);
        logo.textContent = text;
      });
    });
  }

  function bublingCapturing() {}

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const phoneBook = render(app, title);

    //tbody
    const { list, logo, btnAdd, formOverlay, form } = phoneBook;

    formOverlay.addEventListener("click", () => {
      formOverlay.classList.remove("is-visible");
    });
    //заблокировать всплытие
    form.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    //stopPropagation - останавливает всплытие, но дает всем обработчикам доработать которые есть на текущем элементе. (а второй метод не дает выполнить больше ни 1 обработчику)

    //функционал
    const allRow = renderContacts(list, data);
    hoverRow(allRow, logo);

    btnAdd.addEventListener("click", () => {
      formOverlay.classList.add("is-visible");
    });
    const close = document.querySelector(".close");
    close.addEventListener("click", () => {
      formOverlay.classList.remove("is-visible");
    });

    // когда произойдет загрзка приложения, сформируется верстка вызывается наша функция.
    bublingCapturing();
  };

  window.phoneBookInit = init;
}

// если у нас есть несколько вложеных элементов на каждом из которых клик
// и если выполнить клик на области внешнего эл не затрагивая внутрених то обработчик выполнится не затрагивая внутрених

// если кликнуть на конпку добавить то события сработают на всех элементов которые идут от этой кнопки до его родителя

// события будут срабатывать не как они написаны а от того элемента на который нажали и вверх - но на самом деле событие проходит сквозь дерева начиная  от корня(а не от элемента) до самого глубокого эл на котором событие сработало а затем в обратном направлении.
