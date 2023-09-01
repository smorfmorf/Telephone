import { setStorage, removeStorage } from "./serviceStorage.js";
import createElements from "./createElements.js";
const { createRow } = createElements;

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

export default {
  data,
  addContactData,
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
};
