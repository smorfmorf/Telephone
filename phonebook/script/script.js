{
  //масив объектов.
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

  function addContactData(contact) {
    data.push(contact);
  }

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

  //!функция рендера
  // вернет list(tbody), logo, кнопки добавить/удалить, Оверлей и его форму.
  const render = (app, title) => {
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
    const { form, overlay } = createForm();

    //*вставляем лого в шапку
    header.headerContainer.append(logo);
    //*вставляем контент в main
    main.mainContainer.append(buttonsGroup.btnWrapper, table, overlay);
    //*вставляем в app
    app.append(header, main, footer);

    //todo то что нужно нам со странички тут возвращаем и потом для этого пишем функционал.
    return {
      list: table.tbody,
      logo,
      btnAdd: buttonsGroup.btns[0],
      btnDel: buttonsGroup.btns[1],
      form,
      formOverlay: overlay,
    };
  };

  // Создание строки  tr - ряд th - столбец  td-ячейка
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
    phoneLink.textContent = phone;

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

  //добавляем строки в tbody из массива data  return allRow
  function renderContacts(list, data) {
    const allRow = data.map(createRow);
    list.append(...allRow);
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

  function modalControl(btnAdd, formOverlay) {
    function openModel() {
      formOverlay.classList.add("is-visible");
    }
    function closeModel() {
      formOverlay.classList.remove("is-visible");
    }

    btnAdd.addEventListener("click", openModel);
    // const close = document.querySelector(".close");
    // close.addEventListener("click", () => {
    //   formOverlay.classList.remove("is-visible");
    // });
    formOverlay.addEventListener("click", (event) => {
      const target = event.target;
      if (target === formOverlay || target.closest(".close")) {
        closeModel();
      }
    });

    return {
      closeModel,
    };
  }
  function deleteControl(btnDel, list) {
    btnDel.addEventListener("click", () => {
      document.querySelectorAll(".delete").forEach((del) => {
        del.classList.toggle("is-visible");
      });
    });

    list.addEventListener("click", (event) => {
      console.log(event.target);
      const target = event.target;
      if (target.classList.contains("del-icon")) {
        // target.closest(".contact").remove();
        const contact = target.closest(".contact");
        const phone = contact.phoneLink.textContent;
        console.log("phone: ", phone);
        contact.remove();
        //!removeStorage
        removeStorage("phoneBook", phone); // Удаляем контакт из LocalStoragetorage
      }
    });
  }

  function addContactPage(contact, list) {
    list.append(createRow(contact));
  }
  function formControl(form, list, closeModel) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      // event.target - form
      const formData = new FormData(event.target);
      //преобразование formData в объект
      const newContact = Object.fromEntries(formData);

      addContactData(newContact);
      //!setlocal
      setStorage("phoneBook", newContact); // Добавляем контакт в LocalStorage
      addContactPage(newContact, list);
      form.reset();
      closeModel();
    });
  }

  function getStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  function setStorage(key, object) {
    const data = getStorage(key);
    data.push(object);
    localStorage.setItem(key, JSON.stringify(data));
  }

  function removeStorage(key, phone) {
    const data = getStorage(key);
    console.log("data: ", data);
    const newData = data.filter((contact) => contact.phone !== phone);
    localStorage.setItem(key, JSON.stringify(newData));
  }

  //Функция инициализации приложения
  const init = (selectorApp, title) => {
    //получаем app
    const app = document.querySelector(selectorApp);
    //РЕНДЕР
    const phoneBook = render(app, title);
    //tbody
    const { list, logo, btnAdd, formOverlay, form, btnDel } = phoneBook;

    //!функционал
    const allRow = renderContacts(list, getStorage("phoneBook"));
    // const allRow = renderContacts(list, data); без localstorage

    hoverRow(allRow, logo);
    const { closeModel } = modalControl(btnAdd, formOverlay);
    deleteControl(btnDel, list);
    formControl(form, list, closeModel);

    // setTimeout(() => {
    //   const contact = createRow({
    //     name: "Иван",
    //     surname: "Петров",
    //     phone: "+79514545454",
    //   });
    //   //вставляем строчку tr в tbody(list)
    //   list.append(contact);
    // }, 2000);
  };
  window.phoneBookInit = init;
}
