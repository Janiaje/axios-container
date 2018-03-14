class AxiosContainer {

    /**
     * @param url String
     * @param config Object
     */
    constructor(url, config = {}) {

        this._url = url;

        let {
            method = 'GET',
            intervalTime = 5000,
            data = {},
            axiosConfig = {},
            noCache = false
        } = config;

        this._method = method;
        this._intervalTime = intervalTime;
        this._data = data;
        this._config = axiosConfig;
        this._noCache = noCache;

        this._callbackContainer = [];
        this._requestContainer = {};
        this._responseContainer = {};
        this._axiosInterval = null;
        this._axiosError = null;
    }

    /**
     * Create a new request in the container.
     *
     * @param requestId int|string
     * @param requestParameters Object
     * @returns {Promise<any>}
     */
    createRequest(requestId, requestParameters) {
        return new Promise((resolve, reject) => {
            if (this._noCache && this._isDataAcquired(requestId)) {
                resolve(this._getAcquiredData(requestId));
            }

            this._recordRequest(requestId, requestParameters);

            let callback = () => {
                if (this._axiosError !== null) {
                    reject(this._axiosError);
                }

                if (this._isDataAcquired(requestId)) {
                    resolve(this._getAcquiredData(requestId));
                } else {
                    reject('Axios call was successful, but did not contain any response for this call!');
                }
            };

            this._callbackContainer.push(callback);
        });
    }

    /**
     * Send the request now.
     * (Do not wait for the debounce.)
     */
    sendNow() {
        this._axiosCallback();
    }

    /**
     * @param requestId int|string
     * @param requestParameters Object
     * @private
     */
    _recordRequest(requestId, requestParameters) {
        this._clearAxiosInterval();
        this._createAxiosInterval();

        this._requestContainer[requestId] = requestParameters;
    }

    /**
     * @private
     */
    _createAxiosInterval() {
        if (this._intervalTime === false) {
            return;
        }

        this._axiosInterval = setInterval(() => {
            this._axiosCallback()
        }, this._intervalTime);
    }

    /**
     * @private
     */
    _clearAxiosInterval() {
        if (this._axiosInterval === null) {
            return;
        }

        clearInterval(this._axiosInterval);
    }

    /**
     * @param requestId int|string
     * @returns {boolean}
     * @private
     */
    _isDataAcquired(requestId) {
        return this._responseContainer[requestId] !== undefined;
    }

    /**
     * @param requestId int|string
     * @returns {*}
     * @private
     */
    _getAcquiredData(requestId) {
        return this._responseContainer[requestId];
    }

    /**
     * @private
     */
    _axiosCallback() {
        this._clearAxiosInterval();

        this._runAxiosCall();
    }

    /**
     * @private
     */
    _runAxiosCall() {
        let data = {
            parameters: this._requestContainer
        };

        data = Object.assign(data, this._data);

        let request;
        switch (this._method.toUpperCase()) {
            case 'GET': {
                let config = Object.assign({params: data}, this._config);

                request = axios.get(
                    this._url,
                    config
                );
                break;
            }
            case 'DELETE': {
                let config = Object.assign({params: data}, this._config);

                request = axios.delete(
                    this._url,
                    config
                );
                break;
            }
            case 'HEAD': {
                let config = Object.assign({params: data}, this._config);

                request = axios.head(
                    this._url,
                    config
                );
                break;
            }
            case 'OPTIONS': {
                let config = Object.assign({params: data}, this._config);

                request = axios.options(
                    this._url,
                    config
                );
                break;
            }
            case 'POST': {
                request = axios.post(this._url, data, this._config);
                break;
            }
            case 'PUT': {
                request = axios.put(this._url, data, this._config);
                break;
            }
            case 'PATCH': {
                request = axios.patch(this._url, data, this._config);
                break;
            }
            default: {
                throw new Error('Request type not found!');
            }
        }

        request.then((response) => {
            this._responseContainer = Object.assign(this._responseContainer, response.data);
            this._requestContainer = {};
        }).catch((error) => {
            this._axiosError = error;
        }).then(() => {
            this._callbackContainer.forEach((callback) => {
                callback();
            });

            this._callbackContainer = [];
        });
    }
}

export default AxiosContainer