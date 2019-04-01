const localStorage = global.localStorage || {
  setItem () {},
  getItem () {},
  removeItem () {}
}

/**
 * getItem() wrapper of the native getItem() method of the Storage interface,
 * when passed a key name, will return that key's value or null if the key does not exist.
 * @param {String} key Key of value that you want to get from local storage.
 * @return {(String|null)} String representation of value or null if the key does not exist.
 */
const getItem = (key) => {
  return localStorage.getItem(key)
}

/**
 * setItem() wrapper of the native setItem() method of Storage interface,
 * when passed a key name and value, will add that key to the storage,
 * or update that key's value if it already exists.
 * @param {String} key Key that you want to create / update.
 * @param {Any} value Value that will be stored / updated for the key.
 */
const setItem = (key, value) => {
  localStorage.setItem(key, value)
}

/**
 * removeItem() wrapper of the native removeItem() method of Storage interface,
 * when passed a key name, it will remove that key from the storage.
 * @param {String} key Key that you want to create / update.
 */
const removeItem = (key) => {
  localStorage.removeItem(key)
}

export default {
  getItem,
  setItem,
  removeItem
}
