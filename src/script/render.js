import createElements from "./createElements.js";
const {
    createImageLogo,
    createHeader,
    createLogo,
    createMain,
    createButtonsGroup,
    createTable,
    createForm,
    createFooter,
    createRow,
} = createElements;

//!функция рендера
// вернет list(tbody), logo, кнопки добавить/удалить, Оверлей и его форму.
const render = (app, title) => {
    const header = createHeader();
    const imgLogo = createImageLogo();

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
    header.headerContainer.append(imgLogo, logo);
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
//добавляем строки в tbody из массива data  return allRow
function renderContacts(list, data) {
    const allRow = data.map(createRow);
    list.append(...allRow);
    return allRow;
}

export default {
    render,
    renderContacts,
};
