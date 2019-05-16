webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./redux/actions/index.js":
/*!********************************!*\
  !*** ./redux/actions/index.js ***!
  \********************************/
/*! exports provided: Type, Action */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Type", function() { return Type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Action", function() { return Action; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var redux_api_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-api-middleware */ "./node_modules/redux-api-middleware/lib/index.umd.js");
/* harmony import */ var redux_api_middleware__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_api_middleware__WEBPACK_IMPORTED_MODULE_1__);

 // ACTIONS

var Type = {
  TOGGLE: 'TOGGLE',
  FETCH_MOVIE_DATA: 'FETCH_MOVIE_DATA'
};
var Action = {
  toggleTap: function toggleTap() {
    return {
      type: Type.TOGGLE
    };
  },
  fetchMovieData: function fetchMovieData(status, region) {
    var endpoint = "https://api.themoviedb.org/3/movie/".concat(status, "?api_key=f7b1557a908d86ec205d705bf4d509fb&region=").concat(region);
    return Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, redux_api_middleware__WEBPACK_IMPORTED_MODULE_1__["RSAA"], {
      endpoint: endpoint,
      method: 'GET',
      types: [{
        type: "".concat(Type.FETCH_MOVIE_DATA, "_REQUEST")
      }, {
        type: "".concat(Type.FETCH_MOVIE_DATA, "_SUCCESS"),
        meta: {
          status: status,
          region: region
        },
        payload: function payload(action, state, res) {
          var has_content = res.status !== 204;
          return has_content ? Object(redux_api_middleware__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(res).then(function (json) {
            return json;
          }, function (err) {
            return undefined;
          }) : undefined;
        }
      }, {
        type: "".concat(Type.FETCH_MOVIE_DATA, "_FAILURE"),
        meta: function meta(action, state, res) {
          if (res) {
            return {
              status: res.status,
              statusText: res.statusText
            };
          }

          return {
            status: 'Network request failed'
          };
        }
      }]
    });
  }
};


/***/ })

})
//# sourceMappingURL=_app.js.ed6db977b2090dd3572c.hot-update.js.map