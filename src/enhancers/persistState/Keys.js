
import SessionStorage from "./SessionStorage";
import CachedStorage from "./CachedStorage";

const NS = "persist";
const KEYS = `${NS}:keys`;
const cachedSessionStorage = new CachedStorage({
  storage: SessionStorage,
});

/**
 * Register all keys that get persisted for code splitting
 */
const Keys = {
  keys: [],
  callbacks: [],

  /**
   * Add a function to run on next tick
   * @param {Function} cb - Function to call on next tick
   * @private
   */
  nextTick(cb) {
    cb();
  },

  /**
   * Store the keys in local storage
   * @private
   */
  persist() {
    this.nextTick(() => {
      cachedSessionStorage.setItem(KEYS, this.keys);
    });
  },

  /**
   * Rehydrate registered keys from localStorage
   */
  rehydrate() {
    const keys = cachedSessionStorage.getItem(KEYS);
    if (keys) {
      this.keys = keys;
    }
  },

  /**
   * Get all the registered keys
   * @return {string[]} All registered keys
   */
  getAll() {
    return this.keys;
  },

  /**
   * Add a key to the registry
   * @param {string} key - Key to add
   */
  add(...keys) {
    keys.forEach(key => {
      if (this.keys.indexOf(key) === -1) {
        this.keys.push(key);
      }
    });
    this.persist();
  },
};

export default Keys;
