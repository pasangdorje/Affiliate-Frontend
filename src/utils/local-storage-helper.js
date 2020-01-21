import SecureLS from 'secure-ls';
import { serialize, parse, MESSAGE, withData, withError } from 'utils';

/**
 * New Secured local storage instance.
 *
 */
const ls = new SecureLS({
  encodingType: 'des',
  isCompression: true,
  encryptionSecret: process.env.REACT_APP_ENCRYPTION_SECRET
});
const hasLocalStorage = window.localStorage;

export const storage = {
  /**
   * Get value of provide key.
   *
   * @param {String} key
   * @returns {String}
   */
  get(key) {
    const { error, data } = parse(localStorage.getItem(key));

    if (error) {
      return withError(error);
    }

    if (!hasLocalStorage) {
      return withError(MESSAGE.NO_LOCAL_STORAGE);
    }

    return withData(data);
  },

  /**
   * Set value to given key and store.
   *
   * @param {String} key
   * @param {Any} value
   * @returns {String}
   */
  set(key, value) {
    if (!hasLocalStorage) {
      return withError(MESSAGE.NO_LOCAL_STORAGE);
    }

    return withData(localStorage.setItem(key, serialize(value)));
  },

  /**
   * Clear value of given key else clear all.
   *
   * @param {String} key
   * @returns {String}
   */
  clear(key = null) {
    if (!hasLocalStorage) {
      return withError(MESSAGE.NO_LOCAL_STORAGE);
    }

    localStorage.getItem(key)
      ? localStorage.removeItem(key)
      : localStorage.clear();

    return withData(localStorage.getItem(key));
  }
};

/**
 * Secured LS utilities.
 */
export const securedLS = {
  /**
   * Set value to given key and store.
   *
   * @param {String} key
   * @param {Any} value
   * @returns {String}
   */
  set(key, value) {
    if (!hasLocalStorage) {
      return withError(MESSAGE.NO_LOCAL_STORAGE);
    }

    return withData(ls.set(key, value));
  },

  /**
   * Set value to given key and store.
   *
   * @param {String} key
   * @returns {String}
   */
  get(key) {
    if (!hasLocalStorage) {
      return withError(MESSAGE.NO_LOCAL_STORAGE);
    }

    return withData(ls.get(key));
  },

  /**
   * Clears localstorage data.
   *
   * @param {String} key
   *
   */
  clear(key = null) {
    if (!hasLocalStorage) {
      return withError(MESSAGE.NO_LOCAL_STORAGE);
    }

    if (key) {
      return withData(localStorage.removeItem(key));
    }

    return withData(ls.removeAll());
  }
};

/**
 * Clears auth data from localstorage.
 *
 */
export const clearAuthData = () => {
  securedLS.clear('_ft');
  securedLS.clear('_current');
};
