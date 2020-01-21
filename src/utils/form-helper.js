import { COUNTRY, PASSWORD_RULE } from 'app';
import { VALIDATION } from '../app/app.constant';

/**
 * Checks if input field is empty.
 *
 * @param {Object} input
 * @returns {Boolean}
 */
export const isInputEmpty = input => {
  if (!input.value) {
    return true;
  } else {
    unsetIsInvalidField(input);

    return false;
  }
};

/**
 * Sets is-invalid class for invalid input field.
 *
 * @param {Object} input
 */
export const setIsInvalidField = input => {
  input.classList.add('is-invalid');
};

/**
 * Unset is-invalid class for invalid input field.
 *
 * @param {Object} input
 */
export const unsetIsInvalidField = input => {
  input.classList.remove('is-invalid');
};

/**
 * Validates phone number.
 *
 * @param {Number} phoneNumber
 * @param {String} country
 * @returns {Boolean}
 */
export const validatePhone = (phoneNumber, country) => {
  if (country === COUNTRY.ARMENIA) {
    return /^\d{8}$/.test(phoneNumber);
  }

  if (country === COUNTRY.RUSSIA) {
    return /^\d{10}$/.test(phoneNumber);
  }

  if (country === COUNTRY.USA) {
    return /^\d{10}$/.test(phoneNumber);
  }

  return false;
};

/**
 * Returns invalid phone number message.
 *
 * @param {String} country
 */
export const getPhoneInvalidMessage = country => {
  if (country === COUNTRY.ARMENIA) {
    return VALIDATION.INVALID_ARM_PHONE;
  }

  if (country === COUNTRY.RUSSIA) {
    return VALIDATION.INVALID_RUS_PHONE;
  }

  if (country === COUNTRY.USA) {
    return VALIDATION.INVALID_USA_PHONE;
  }

  return VALIDATION.INVALID_PHONE;
};

/**
 * Validates password.
 *
 * @param {String} password
 * @returns {Boolean}
 */
export const validatePassword = password => {
  const error = getInvalidPasswordRule(password);

  return error.length === 0;
};

/**
 * Chcecks special character.
 *
 * @param {String} str
 */
export const hasSpecialCharacter = str => {
  return /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(str);
};

/**
 * Checks number.
 *
 * @param {String} str
 */
export const hasNumber = str => {
  return /\d/.test(str);
};

/**
 * Checks uppercase.
 *
 * @param {String} str
 */
export const hasUpperCase = str => {
  return /[A-Z]/.test(str);
};

/**
 * Checks lowercase.
 *
 * @param {String} str
 */
export const hasLowerCase = str => {
  return /[a-z]/.test(str);
};

/**
 * Checks min characteristics.
 *
 * @param {String} str
 */
export const hasMinSixChar = str => {
  return str.length >= 6;
};

/**
 * Returns array of invalid password rules.
 *
 * @param {String} password
 */
export const getInvalidPasswordRule = password => {
  const error = [];

  if (!hasSpecialCharacter(password)) {
    error.push(PASSWORD_RULE.SPECIAL_CHAR);
  }

  if (!hasNumber(password)) {
    error.push(PASSWORD_RULE.NUMBER);
  }

  if (!hasLowerCase(password)) {
    error.push(PASSWORD_RULE.LOWER_CASE);
  }

  if (!hasUpperCase(password)) {
    error.push(PASSWORD_RULE.UPPER_CASE);
  }

  if (!hasMinSixChar(password)) {
    error.push(PASSWORD_RULE.MIN_CHAR);
  }

  return error;
};

/**
 * Validates name.
 *
 * @param {String} name
 * @returns {Boolean}
 */
export const validateName = name => {
  return /^[a-zA-ZŞÖÓ]+(([',. éöðóīÓ-][a-zA-Z ])?[a-zA-Z]*)*$/.test(name);
};

/**
 * Validates email.
 *
 * @param {String} email
 * @returns {Boolean}
 */
export const validateEmail = email => {
  // This is just a prototype.
  // Email validation regex will be here later.
  return email ? true : false;
};

/**
 * Validate postal code.
 *
 * @param {Number} postalCode
 * @param {String} country
 * @returns {Boolean}
 */
export const validatePostalCode = (postalCode, country) => {
  if (country === COUNTRY.ARMENIA) {
    return /^[0-9]{4}$/.test(postalCode);
  }

  if (country === COUNTRY.RUSSIA) {
    return /^[0-9]{4}$/.test(postalCode);
  }

  return false;
};

/**
 * Returns max length of postal code.
 *
 * @param {String} country
 * @returns {Number}
 */
export const getPostalCodeLength = country => {
  if (country === COUNTRY.ARMENIA) {
    return 4;
  }

  if (country === COUNTRY.RUSSIA) {
    return 6;
  }

  return 10;
};

/**
 * Validate country phone code.
 *
 * @param {Object} country
 * @param {String} code
 */
export const validateCountryCode = (country, code) => {
  return country.phoneCode === code;
};

/**
 * Validates date of birth.
 *
 * @param {String} dateOfBirth
 * @returns {Boolean}
 */
export const validateDateOfBirth = dateOfBirth => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 18;
};

/**
 * Validate address.
 *
 * @param {String} address
 * @returns {Boolean}
 */
export const validateAddress = address => {
  return /^$|^[^*!#|":<>[\]{}`\\()';@&$%^]+$/.test(address);
};

/**
 * Validates string input.
 *
 * @param {String} string
 */
export const validateString = string => {
  return /^[a-zA-Z]+(\s[a-zA-z]+)*$/.test(string);
};

/**
 * Returns array of years.
 *
 * @returns {Array}
 */
export const getYear = () => {
  let max = 100;
  const years = [];
  let year = new Date().getFullYear();

  do {
    years.push(year--);
    max--;
  } while (max > 0);

  return years;
};

/**
 * Returns array of days of a given month.
 *
 * @param {String} year
 * @param {String} month
 * @returns {Array}
 */
export const getDaysInMonth = (year, month) => {
  const daysInMonth = [];

  if (month && year) {
    const numberOfDaysInMonth = new Date(
      parseInt(year),
      parseInt(month), // Jan value should be 0 instead of 1
      0
    ).getDate();

    for (let i = 1; i <= numberOfDaysInMonth; i++) {
      daysInMonth.push(i);
    }
  }

  return daysInMonth;
};

/**
 * Serialize's form datas.
 *
 * @param {Object} form
 * @returns {Array}
 */
export const serializeArray = form => {
  // Setup our serialized data
  const serialized = [];

  // Loop through each field in the form
  for (let i = 0; i < form.elements.length; i++) {
    const field = form.elements[i];

    // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
    if (
      !field.name ||
      field.disabled ||
      field.type === 'file' ||
      field.type === 'reset' ||
      field.type === 'submit' ||
      field.type === 'button'
    ) {
      continue;
    }

    // If a multi-select, get all selections
    if (field.type === 'select-multiple') {
      for (let n = 0; n < field.options.length; n++) {
        if (!field.options[n].selected) {
          continue;
        }
        serialized.push({
          name: field.name,
          value: field.options[n].value
        });
      }

      // Convert field data to a query string
    } else if (
      (field.type !== 'checkbox' && field.type !== 'radio') ||
      field.checked
    ) {
      serialized.push({
        name: field.name,
        value: field.value
      });
    }
  }

  return serialized;
};
