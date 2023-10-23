export function getStorage(key) {
    //получаем из localstorage
    const data = localStorage.getItem(key);
    //парсим в массив объектов
    return data ? JSON.parse(data) : [];
}

export function setStorage(key, object) {
    //получаем из localstorage
    const data = getStorage(key);
    //добавляем объекты в массив
    data.push(object);
    //сохраняем в localstorage
    localStorage.setItem(key, JSON.stringify(data));
}

export function removeStorage(key, phone) {
    //получаем из localstorage
    const data = getStorage(key);
    console.log("data: ", data);
    //делаем фильтрацию
    const newData = data.filter((contact) => contact.phone !== phone);
    //сохраняем в localstorage
    localStorage.setItem(key, JSON.stringify(newData));
}
