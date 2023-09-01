export function getStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

export function setStorage(key, object) {
  const data = getStorage(key);
  data.push(object);
  localStorage.setItem(key, JSON.stringify(data));
}

export function removeStorage(key, phone) {
  const data = getStorage(key);
  console.log("data: ", data);
  const newData = data.filter((contact) => contact.phone !== phone);
  localStorage.setItem(key, JSON.stringify(newData));
}
