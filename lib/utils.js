'use strict';

const crypto = require('crypto');
const snakeCaseKeys = require('snakecase-keys');

const utils = {
  /**
   * Sorts an array of object lexicographically with respect to property name
   * Capital letters come before small latters
   * Sorting also done in nested array
   * @param {Array<Object>} objectArray
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
  },
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
