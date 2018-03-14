# Installing

Install from NPM
```bash
$ npm install axios-container --save
```

Import the package
```javascript
import AxiosContainer from 'axios-container';
window.AxiosContainer = AxiosContainer;
```

# Example

### Basic usage
```javascript
let axiosContainer = new AxiosContainer('/some/url');

// Create a request through the AxiosContainer
axiosContainer.createRequest('a_id', { type: 'a', someAdditionalParameter: 'value' })
    .then(function (response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });

// Create another request through the AxiosContainer
axiosContainer.createRequest('a_id', { type: 'b' })
    .then(function (response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });

// Both request will be bundled together into a single request.
```

### Additional config
You can pass additional config to the `AxiosContainer` through the second parameter of the constructor.

```javascript
let axiosContainer = new AxiosContainer('/some/url', {
    
    /*
    |--------------------------------------------------------------------------
    | method
    |--------------------------------------------------------------------------
    |
    | This request method to be used when making the request
    |
    */
    method: 'GET',
    
    /*
    |--------------------------------------------------------------------------
    | intervalTime
    |--------------------------------------------------------------------------
    |
    | This time to be waited after the last `createRequest` call
    | before sending the axios request
    |
    */
    intervalTime: 5000,
    
    /*
    |--------------------------------------------------------------------------
    | data
    |--------------------------------------------------------------------------
    |
    | This object's content to be sent with each request
    | (extending the request's `data` axios parameter)
    |
    */
    data: {},
    
    /*
    |--------------------------------------------------------------------------
    | axiosConfig
    |--------------------------------------------------------------------------
    |
    | This config to be added to each axios request
    |
    */
    axiosConfig: {},
    
    
    /*
    |--------------------------------------------------------------------------
    | noCache
    |--------------------------------------------------------------------------
    |
    | If a request was made before with the same ID,
    | it will return the previous request's response
    | (without making one more)
    |
    */
    noCache: false
    
});
```