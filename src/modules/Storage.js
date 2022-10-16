const StoreObject = (identifier, object, key) => {
  const state = {
    identifier,
    object,
    key,
  };
  return state;
};

const keyExist = (key) => {
  if (Object.keys(localStorage).includes(key)) {
    return true;
  }
  return false;
};

const addItem = (itemName, item, identifier = "", onErrorMessage = "") => {
  const key = itemName.replace(" ", "_");
  const itemObject = StoreObject(identifier, item, key);
  if (keyExist(key)) {
    window.alert(onErrorMessage);
    return null;
  }
  localStorage.setItem(key, JSON.stringify(itemObject));
  return itemObject;
};

const removeItem = (key) => {
  localStorage.removeItem(key);
};
const getItem = (key) => {
  const item = JSON.parse(localStorage.getItem(key));
  if (item !== null) {
    return item.object;
  }
  return null;
};

const getStoreObject = (key) => {
  const item = JSON.parse(localStorage.getItem(key));
  return item;
};

const getAllStoreObjects = (identifier) => {
  const keys = Object.keys(localStorage);
  const itemList = [];
  keys.forEach((key) => {
    const object = getStoreObject(key);
    if (object.identifier === identifier) {
      itemList.push(object);
    }
  });
  return itemList;
};

const getAllStoreObjectsWithKeys = (identifier) => {
  const keys = Object.keys(localStorage);
  const itemList = [];
  keys.forEach((key) => {
    const object = getStoreObject(key);
    object.key = key;
    if (object.identifier === identifier) {
      itemList.push(object);
    }
  });
  return itemList;
};

const updateItem = (key, updatedItem) => {
  const storeObject = getStoreObject(key);
  storeObject.object = updatedItem;
  if (storeObject != null) {
    localStorage.setItem(key, JSON.stringify(storeObject));
  }
};

const getAllItem = (identifier) => {
  const keys = Object.keys(localStorage);
  const itemList = [];
  keys.forEach((key) => {
    const object = getStoreObject(key);
    if (object.identifier === identifier) {
      const item = getItem(key);
      itemList.push(item);
    }
  });
  return itemList;
};

export {
  addItem,
  getItem,
  getAllItem,
  getStoreObject,
  getAllStoreObjects,
  updateItem,
  getAllStoreObjectsWithKeys,
  removeItem,
};
