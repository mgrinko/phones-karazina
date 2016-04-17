module.exports = class AjaxService {
  static ajax(url, options) {
    return new Promise(function(resolve, reject) {

      var xhr = new XMLHttpRequest();
      var method = options.method || 'GET';

      xhr.open(method, url, true);

      xhr.onload = () => {
        if (xhr.status != 200) {
          handleError();
        } else {
          resolve(JSON.parse(xhr.responseText));
        }
      };

      xhr.onerror = handleError;

      xhr.send();

      function handleError() {
        reject(new Error(xhr.status + ': ' + xhr.statusText));
      }
    });

  }


};