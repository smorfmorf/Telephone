import "./scss/index.scss";

import control from "./script/control.js";
const { hoverRow, modalControl, deleteControl, formControl } = control;

import apprender from "./script/render.js";
const { render, renderContacts } = apprender;

import * as storage from "./script/serviceStorage.js";

export const phoneBookModule = {
    //* createElements
    //* render
    //* control
    //* serviceStorage

    //Функция инициализации приложения
    init: (selectorApp, title) => {
        //получаем app
        const app = document.querySelector(selectorApp);
        //РЕНДЕР
        const phoneBook = render(app, title);
        //tbody
        const { list, logo, btnAdd, formOverlay, form, btnDel } = phoneBook;

        //!функционал
        const allRow = renderContacts(list, storage.getStorage("phoneBook"));
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
};

phoneBookModule.init("#app", "Book");
