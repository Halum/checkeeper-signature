/**
 * Created by Halum on 12/2/2017.
 */
'use strict';

const cloneDeep = require('lodash.clonedeep');
const utils = require('./utils');
/**
 * Creates Checkeeper signature from input payload
 * @param {Object} payload - Input payload
 * @param {Object} options - Options to create signature
 * @returns {string} - Created signature
 */
const createSignature = function createSignature(payload, options) {
  let token = options.token;
  let secretKey = options.secretKey;
  // use copied version of payload and do not modify payload
  let data = cloneDeep(payload);
  // convert input object object into associative array
  let payloadArray = utils.toArray(data);
  // sort array lexicographically by its property name
  payloadArray = utils.kSort(payloadArray);
  // encode the payload array
  let encodedUrl = utils.encodeURI(payloadArray);
  // generate signature
  let signature = utils.generateSignature(encodedUrl, secretKey);

  return signature;
};

module.exports = createSignature;