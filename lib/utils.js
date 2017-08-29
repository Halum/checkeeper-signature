'use strict';

const crypto = require('crypto');
const snakeCaseKeys = require('snakecase-keys');

const utils = {
  /**
   * Replace all boolean values according to Checkeeper requirements
   * 'true' replaced with 1
   * 'false' replaced with 0
   * @param {Object} obj - Object to convert
   * @returns {Object} - Updated object
   */
  fixBoolean: function fixBoolean(obj) {
    for (let key in obj) {
      if (obj[key] === true) {
        obj[key] = 1;
      } else if (obj[key] === false) {
        obj[key] = 0;
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        // we may have written
        // obj[key] = fixBoolean(obj[key]);
        // but that is not necessary
        fixBoolean(obj[key]);
      }
    }

    return obj;
  },
  /**
   * Sorts an array of object lexicographically with respect to property name
   * Capital letters come before small letters
   * Sorting also done in nested array
   * @param {Array<Object>} objectArray - Array to be sorted
   * @returns {Array<Object>} - Sorted array
   */
  kSort: function kSort(objectArray) {
    objectArray.sort(function (objA, objB) {
      // it is assumed that each object has only one property
      // as it comes through 'objectToArray' method
      let propertyA = Object.keys(objA)[0];
      let propertyB = Object.keys(objB)[0];

      if (Array.isArray(objA[propertyA])) {
        // recursive sorting
        kSort(objA[propertyA]);
      }

      return propertyA.localeCompare(propertyB);
    });

    return objectArray;
  },
  /**
   * Converts an object to array of objects with {key:value} pair
   * Nested objects are converted into nested array
   * Removes 'null' and 'undefined' valued properties
   * @param {Object} obj - Object to convert
   * @returns {Array<Object>} - Resultant array
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
