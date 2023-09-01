import control from "./modules/control.js";
const { hoverRow, modalControl, deleteControl, formControl } = control;

import apprender from "./modules/render.js";
const { render, renderContacts } = apprender;

import { getStorage } from "./modules/serviceStorage.js";

export const phoneBookModule = {
  //* createElements start

  //* createElements end

  //* render start

  //* render end

  //* control start

  //* control end

  //* serviceStorage start

  //* serviceStorage end

  //Функция инициализации приложения
  init: (selectorApp, title) => {
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
  },
  // window.phoneBookInit = init;
};
