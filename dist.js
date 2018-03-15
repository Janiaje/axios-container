'use strict';var _createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();Object.defineProperty(exports,'__esModule',{value:!0});function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var AxiosContainer=function(){function a(b){var h=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};_classCallCheck(this,a),this._url=b;var _config$method=h.method,c=void 0===_config$method?'GET':_config$method,_config$intervalTime=h.intervalTime,d=void 0===_config$intervalTime?5e3:_config$intervalTime,_config$data=h.data,e=void 0===_config$data?{}:_config$data,_config$axiosConfig=h.axiosConfig,f=void 0===_config$axiosConfig?{}:_config$axiosConfig,_config$noCache=h.noCache;this._method=c,this._intervalTime=d,this._data=e,this._config=f,this._noCache=void 0!==_config$noCache&&_config$noCache,this._callbackContainer=[],this._requestContainer={},this._responseContainer={},this._axiosInterval=null,this._axiosError=null}return _createClass(a,[{key:'createRequest',value:function createRequest(b,c){var d=this;return new Promise(function(e,f){!d._noCache&&d._isDataAcquired(b)&&e(d._getAcquiredData(b)),d._recordRequest(b,c);var g=d._createPromiseCallback(e,f,b);d._callbackContainer.push(g)})}},{key:'sendNow',value:function sendNow(){this._axiosCallback()}},{key:'_recordRequest',value:function _recordRequest(b,c){this._clearAxiosInterval(),this._createAxiosInterval(),this._requestContainer[b]=c}},{key:'_createPromiseCallback',value:function _createPromiseCallback(b,c,d){var e=this;return function(){null!==e._axiosError&&c(e._axiosError),e._isDataAcquired(d)?b(e._getAcquiredData(d)):c('Axios call was successful, but did not contain any response for this call!')}}},{key:'_createAxiosInterval',value:function _createAxiosInterval(){var b=this;!1===this._intervalTime||(this._axiosInterval=setInterval(function(){b._axiosCallback()},this._intervalTime))}},{key:'_clearAxiosInterval',value:function _clearAxiosInterval(){null===this._axiosInterval||clearInterval(this._axiosInterval)}},{key:'_isDataAcquired',value:function _isDataAcquired(b){return void 0!==this._responseContainer[b]}},{key:'_getAcquiredData',value:function _getAcquiredData(b){return this._responseContainer[b]}},{key:'_axiosCallback',value:function _axiosCallback(){this._clearAxiosInterval(),this._runAxiosCall()}},{key:'_runAxiosCall',value:function _runAxiosCall(){var h=this,b={parameters:this._requestContainer};b=Object.assign(b,this._data);var c;switch(this._method.toUpperCase()){case'GET':{var d=Object.assign({params:b},this._config);c=axios.get(this._url,d);break}case'DELETE':{var e=Object.assign({params:b},this._config);c=axios.delete(this._url,e);break}case'HEAD':{var f=Object.assign({params:b},this._config);c=axios.head(this._url,f);break}case'OPTIONS':{var g=Object.assign({params:b},this._config);c=axios.options(this._url,g);break}case'POST':{c=axios.post(this._url,b,this._config);break}case'PUT':{c=axios.put(this._url,b,this._config);break}case'PATCH':{c=axios.patch(this._url,b,this._config);break}default:throw new Error('Request type not found!');}c.then(function(j){h._responseContainer=Object.assign(h._responseContainer,j.data),h._requestContainer={}}).catch(function(j){h._axiosError=j}).then(function(){h._callbackContainer.forEach(function(j){j()}),h._callbackContainer=[]})}}]),a}();exports.default=AxiosContainer;