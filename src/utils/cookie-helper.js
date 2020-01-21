import { MESSAGE, withData, withError } from 'utils';

export const cookie = {
  /**
   * Sets cookie.
   *
   * @param {String} key
   * @param {String} value
   * @param {Number} expires
   */
  set(key, value, expires) {
    const currentDate = new Date();

    currentDate.setTime(currentDate.getTime() + expires * 24 * 60 * 60 * 1000);

    return withData(
      (document.cookie = `${key}=${value};expires=${currentDate.toUTCString()};path=/`)
    );
  },

  /**
   * Gets cookie.
   *
   * @param {String} key
   */
  get(key) {
    if (!document.cookie) {
      return withError(MESSAGE.NO_COOKIE);
    }

    const name = key + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];

      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return withData(c.substring(name.length, c.length));
      }
    }
    
    return withData(null);
  }
};
