'use strict';

var _whatwgFetch = require('whatwg-fetch');

var _whatwgFetch2 = _interopRequireDefault(_whatwgFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hearMe() {
  (0, _whatwgFetch2.default)('/index.html').then(function (response) {
    console.log(response);
  });
}
