let id = 0

const StoreObject = (identifier, object,key) =>{
    const state = {
        identifier: identifier,
        object: object,
        key: key
    }
    return state
}

const addItem = (itemName,identifier = "",item, onErrorMessage) =>{
    const key = itemName.replace(" ", "_")
    const itemObject = StoreObject(identifier, item,key)
    if(keyExist(key)){
        window.alert(onErrorMessage)
        return
    }
    localStorage.setItem(key, JSON.stringify(itemObject))
    return itemObject
}

const removeItem = (key) => {
    localStorage.removeItem(key)
}
const getItem = (key) =>{
    const item = JSON.parse(localStorage.getItem(key));
    if(item !== null){
        return item.object;
    }
    return null
}

const keyExist=(key) =>{
    if(Object.keys(localStorage).includes(key)){
        return true
    }
    return false
}

const getNewId = ()=>{
    return id
}
const getStoreObject = (key) =>{
    const item = JSON.parse(localStorage.getItem(key));
    return item;
}

const getAllStoreObjects = (identifier) =>{
    let keys =Object.keys(localStorage);
    const itemList = []
    keys.forEach((key) => {
        let object = getStoreObject(key)
        if(object.identifier == identifier){
            itemList.push(object)
        }
    })
    return itemList;
}

const getAllStoreObjectsWithKeys = (identifier)=>{
    let keys =Object.keys(localStorage);
    const itemList = []
    keys.forEach((key) => {
        let object = getStoreObject(key)
        object.key = key
        if(object.identifier == identifier){
            itemList.push(object)
        }
    })
    return itemList;
}

const updateItem = (key, updatedItem) =>{
    let storeObject = getStoreObject(key)
    storeObject.object = updatedItem
    if(storeObject != null){
        localStorage.setItem(key, JSON.stringify(storeObject))
    }
}



const getAllItem = (identifier) =>{
    let keys =Object.keys(localStorage);
    const itemList = []
    keys.forEach((key) => {
        if(object.identifier == identifier){
            let item = getItem(key)
            itemList.push(item)
        }
    })
    return itemList;
}

export {
    addItem, 
    getItem,
    getAllItem, 
    getNewId,
    getAllStoreObjects, 
    updateItem,
    getAllStoreObjectsWithKeys,
    removeItem
}
