'use strict';

const crypto = require('crypto');
const snakeCaseKeys = require('snakecase-keys');

const utils = {
  /**
   * Converts an object to array of objects with {key:value} pair
   * Nested objects are converted into nested array
   * Removes 'null' and 'undefined' valued properties
   * @param {Object} obj
   * @returns {Array<Object>}
   */
  objectToArray: function objectToArray(obj) {
    let resultArray = [];

    for (let property in obj) {
      let value = obj[property];
      let arrayItem = {};

      if (typeof value === 'object' && value !== null) {
        // converts recursively
        arrayItem[property] = objectToArray(value);
      } else if (value !== null && typeof value !== 'undefined') {
        // excluding null and undefined values 
        arrayItem[property] = value;
      }

      resultArray.push(arrayItem);
    }

    return resultArray;
  }
};

module.exports = utils;
