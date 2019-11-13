function makeAsyncRequest(url, options = { method: 'GET', body: null, headers: null }) {
  return new Promise((resolve, reject) => {
    const
      xhr = new XMLHttpRequest,
      { method, body, headers } = options;

    xhr.open(method, url);

    if (headers) {
      for (let key in headers) {
        if (headers.hasOwnProperty(key)) {
          xhr.setRequestHeader(key, headers[key])
        }
      }
    }

    class ObjectResponse {
      constructor(response, options) {
        this.response = response;
        this.status = options.status;
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = options.statusText;
        this.url = options.url;
      }

      json() {
        const transformedResponse = JSON.parse(this.response);
        return new Promise(resolve => resolve(transformedResponse));
      }
    }

    xhr.onload = () => {
      const init = {
        status: xhr.status,
        statusText: xhr.statusText,
        url: xhr.responseURL
      }
      resolve(new ObjectResponse(xhr.response, init));
    }

    xhr.onerror = () => {
      reject(xhr.response);
    }

    xhr.send(body);
  });
}