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