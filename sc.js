function createContainer() {
  const container = document.createElement("div");
  container.classList.add("container");
  return container;
}

function createHeader() {
  const header = document.createElement("header");
  header.classList.add("header");

  const headerContainer = createContainer(); //div class=header
  header.append(headerContainer); //header > div class=header
  header.headerContainer = headerContainer; // вложенный div class=header

  return header;
}

function createLogo(title) {
  const h1 = document.createElement("h1");
  h1.classList.add("logo");
  h1.textContent = `Телефон ${title}`;
  return h1;
}

const header = createHeader();
console.log(header.headerContainer); //вложенный контейнер хедера
