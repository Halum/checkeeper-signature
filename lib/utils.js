'use strict';

const crypto = require('crypto');
const keySort = require('key-sort');
const toAssociativeArray = require('object-to-associative-array');

const utils = {
  /**
   * Encode an array of object according to RFC 3986
   * Spaces are to be encoded as "+" and NOT "%20"
   * @param {Array<Object>} dataArray - Input array, an associative array
   * @param {string} [prefix] - Prefix that is used if content is in sub-array
   * @returns {string}
   */
  encodeURI: function encodeURI(dataArray, prefix) {
    let result = '';

    for (let obj of dataArray) {
      let key = Object.keys(obj)[0];
      let value = obj[key];
      let encodedItem = '';

      if (Array.isArray(value)) {
        // It is a nested array,
        // encode it recursively with key as prefix
        if(prefix) {
          encodedItem +=  encodeURI(value, `${prefix}[${key}]`);
        } else {
          encodedItem += encodeURI(value, key);
        }

      }
      else if (prefix) {
        encodedItem += escape(`${prefix}[${key}]`) + '=' + escape(value);
      } else {
        encodedItem += escape(`${key}`) + '=' + escape(value);
      }

      if (result.length !== 0) {
        // use '&' as this is not the first item
        result += '&';
      }

      result += encodedItem;

    }

    // replace 'space' encoding with '+'
    return result.replace(/%20/g, '+');
  },
  /**
   * Generate hash hmac signature for provided string
   * @param {string} input - Input string
   * @param {string} key - Secret key of Checkeeper
   */
  generateSignature: function generateSignature(input, key) {
    return crypto.createHmac('sha256', key).update(input).digest('base64');
  },
  /**
   * Sort the associative array by its key
   * @param {Array.<Object>} objectArray - The associative array needs to be sorted
   * @param {boolean} [deep = true] - Whether or not to deep sort
   * @returns {Array.<Object>} Sorted array
   */
  kSort: keySort,
  /**
   * Converts an object to array of objects with {key:value} pair
   * Nested objects are converted into nested array
   * Removes 'null' and 'undefined' valued properties
   * @param {Object} obj - Object to convert
   * @returns {Array<Object>} - Resultant array
   */
  toArray: function toArray(obj) {
    let opts = {
      deep: true,
      discard: [
        null,
        undefined
      ]
    };

    return toAssociativeArray(obj, opts);
  }
};

module.exports = utils;
