

const SessionStorage = {
  /**
   * Store a JSON serializable object in localStorage
   * @param {string} key - Key to store the object
   * @param {*} value - A JSON serializable object to store
   */
  setItem(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * Get an item from the storage
   * @param {string} key - Key of the object
   * @return {*} The stored object
   */
  getItem(key) {
    const value = sessionStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  },
};

export default SessionStorage;
