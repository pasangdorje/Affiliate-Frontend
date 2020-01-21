const toString = Object.prototype.toString;

/**
 * Checks if argument is Object.
 *
 * @param {Any} arg
 * @returns {Boolean}
 */
export const isObject = arg => {
  return toString.call(arg) === '[object Object]';
};

/**
 * Wrap arguments with error.
 *
 * @param {Any} arg
 * @returns {Object}
 */
export const withError = arg => {
  if (isObject(arg)) {
    const { message = '', ...rest } = arg;

    return {
      data: null,
      error: {
        status: true,
        message,
        ...rest
      }
    };
  }

  return {
    data: null,
    error: {
      status: true,
      message: arg
    }
  };
};

/**
 * Wrap data with error status.
 *
 * @param {Any} data
 * @returns {Object}
 */
export const withData = data => {
  return {
    error: false,
    data
  };
};

/**
 * Serialize the data.
 *
 * @param {Object} data
 * @returns {String}
 */
export const serialize = data => {
  return JSON.stringify(data);
};

/**
 * Parse string data.
 *
 * @param {String} data
 * @returns {Object}
 */
export const parse = data => {
  try {
    const parsedData = JSON.parse(data);

    return withData(parsedData);
  } catch (error) {
    return withError(error);
  }
};

/**
 * Scrolls view to top.
 */
export const scrollToTop = () => window.scrollTo(0, 0);

/**
 * Checks is given value is empty.
 *
 * @param {Any} value
 */
export const isEmpty = value =>
  !value ||
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

/**
 * Gets param vlue from props.
 *
 * @param {String} props
 * @param {String} name
 */
export const getValueOfParam = (props, name) => {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

  const results = regex.exec(props.location.search);

  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

/**
 * Abbreviate number to KMGTPE.
 * 1000 = 1K, 1000000 = 1M .
 *
 * @param {number} num
 * @param {integer} decimalDigit
 */
export const abbreviateNumber = (num, decimalDigit = 1) => {
  let numLength = ('' + num).length;

  decimalDigit = Math.pow(10, decimalDigit);
  numLength -= numLength % 3;

  return (
    Math.round((num * decimalDigit) / Math.pow(10, numLength)) / decimalDigit +
    ' KMGTPE'[numLength / 3]
  );
};

/**
 * Converts string to camel case.
 *
 * @param {String} str
 */
export const getProperCaseOf = str => {
  if (typeof str !== 'string') {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
};

/**
 * Returns true if given object has all given keys.
 *
 * @param {Array} keys
 * @param {Object} obj
 */
export const hasOwnProperties = (keys, obj) => {
  for (let i = 0; i < keys.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(obj, keys[i])) {
      return false;
    }
  }

  return true;
};

/**
 * Returns key if it has no value.
 *
 * @param {Object} obj
 */
export const getEmptyKey = obj => {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === '') {
      return key;
    }
  }

  return true;
};

/**
 * Checks if obj key has value.
 *
 * @param {Object} obj
 */
export const hasValue = obj => {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === '') {
      return false;
    }
  }

  return true;
};

/**
 * Convert UTC date to local date time string.
 *
 * @param {String} UTCDateTime
 */
export const toLocalDateTime = UTCDateTime => {
  return new Date(`${UTCDateTime} UTC`).toLocaleString();
};

/**
 * Adds padding to given number,.
 *
 * @param {Number} number
 * @param {Number} pad
 */
export const addPadding = (number, pad) => {
  return String(number).padStart(2, pad);
};

/**
 * Checks depth of object.
 *
 * @param {Object} object
 */
export const checkObjectDepth = object => {
  let level = 1;

  for (const key in object) {
    if (!Object.prototype.hasOwnProperty.call(object, key)) {
      continue;
    }

    if (isObject(object[key])) {
      const depth = checkObjectDepth(object[key]) + 1;

      level = Math.max(depth, level);
    }
  }

  return level;
};

/**
 * Initializes counter and return its utility function.
 */
export const initializeCounter = () => {
  let counter = 0;

  return {
    /**
     * Increase counts.
     */
    count: function() {
      return ++counter;
    },

    /**
     * Resets counts.
     */
    reset: function() {
      return (counter = 0);
    }
  };
};

/**
 * Serialize single line objects to query.
 *
 * @param {Object} object
 */
export const serializeObjectToQuery = object => {
  const string =
    '?' +
    Object.keys(object)
      .reduce((array, key) => {
        array.push(key + '=' + encodeURIComponent(object[key]));

        return array;
      }, [])
      .join('&');

  return string;
};
