# checkeeper-signature

## Introduction

Create signature for [Checkeeper](http://checkeeper.com/) API calls. Click [here](http://checkeeper.com/api/) for API reference.


## Installation

```npm install checkeeper-signature```

#### Requirements
NODE v0.8.0 or higher

## I/O

#### Input
- Input payload should always be an object.
- `token` and `secretKey` shold be passed in options.
#### Output
- Returns generated signature

## Examples

##### Simple Sort
```javascript
const checkeeperSignature = require('checkeeper-signature');

const options = {
  token: '',
  secretKey: ''
};

const checkCreatePayload = {
  "amount": "5,320.00",
  "date": "2015-01-19",
  "check_number": "37285",
  "bank_routing": "012345678",
  "bank_account": "938763720122",
  "note": "15 hours",
  "test": true,
  "payer": {
    "name": "Widgets Inc.",
    "address": {
      "line1": "827 Random Street"
    },
    "city": "Anytown",
    "state": "NY",
    "zip": "14850",
    "signer": "John Hancock"
  },
  "payee": {
    "name": "Bob's Supplies",
    "address": {
      "line1": "114 Project Lane"
    },
    "city": "Tinkertown",
    "state": "CA",
    "zip": "90210"
  }
};

let signature = checkeeperSignature(checkCreatePayload, options);
// XF2Iu1FGm9GWw36w2PUuxQdOLb6sRQ8Y8O3ppN8W+DY=
```

## External Dependencies
N/A

## Credits

**Original Author**

* [Sajjad Hossain](https://github.com/Halum)

## Lisence
[MIT](https://github.com/Halum/checkeeper-signature/blob/master/LICENSE)
