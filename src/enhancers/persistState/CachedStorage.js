import LRUCache from "lru-cache";
import invariant from "invariant";

const defaultOptions = {
  maxAge: 5000,
  maxSize: 25,
};

/**
 * Decorator to cache objects implementing the storage interface
 */
export default class CachedStorage {
  constructor(options = {}) {
    invariant(options.storage, "storage object is required");

    this.storage = options.storage;
    this.options = Object.assign({}, defaultOptions, options);
    this.cache = new LRUCache({
      max: this.options.maxSize,
      maxAge: this.options.maxAge,
    });
  }

  /**
   * Get an item from cache if it exists,
   * otherwise delegate to underlying storage
   * @param {string} key - Key of the item to retrieve
   * @return {*} Stored value
   */
  getItem(key) {
    if (this.cache.has(key)) return this.cache.get(key);
    const value = this.storage.getItem(key);
    this.cache.set(key, value);
    return value;
  }

  /**
   * Set an item to the storage and invalidate cache
   * @param {string} key - Key of the item
   * @param {*} value - Value to store
   */
  setItem(key, value) {
    if (this.cache.has(key)) this.cache.del(key);
    this.storage.setItem(key, value);
  }
}