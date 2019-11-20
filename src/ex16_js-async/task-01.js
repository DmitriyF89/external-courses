function makeAsyncRequest(url, options = { method: 'GET', body: null, headers: null }) {
  return new Promise((resolve, reject) => {
    const
      xhr = new XMLHttpRequest,
      { method, body, headers } = options;

    xhr.open(method, url);

    if (headers) {
      Object.entries(headers)
        .forEach(elem => xhr.setRequestHeader(elem[0], elem[1]));
    }

    xhr.responseType = 'json';

    class ObjectResponse {
      constructor(response, options) {
        this.response = response;
        this.status = options.status;
        this.ok = this.status === 200;
        this.statusText = options.statusText;
        this.url = options.url;
      }

      getJson() {
        return Promise.resolve(this.response);
      }
    }

    xhr.onload = () => {
      const options = {
        status: xhr.status,
        statusText: xhr.statusText,
        url: xhr.responseURL
      }
      resolve(new ObjectResponse(xhr.response, options));
    }

    xhr.onerror = () => {
      reject(xhr.response);
    }

    xhr.send(body);
  });
}