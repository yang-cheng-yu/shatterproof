
export class HttpError extends Error {
  constructor(status, statusText, url) {
    super(`HTTP Error: ${status} ${statusText} for URL: ${url}`);
    this.name = 'HttpError';
    this.status = status;
    this.statusText = statusText;
    this.url = url;
  }
}

export class NetworkError extends Error {
  constructor(message) {
    super(`Network Error: ${message}`);
    this.name = 'NetworkError';
  }
}

export class FetchWrapper {

  static async request(uri, options = {}) {

    let response;

    try {
      response = await fetch(uri, options);
    } catch (error) {
      throw new NetworkError(error.message);
    }

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText, response.url);
    }

    return response;
  }

  async _parseResponse(response) {
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    
    return response.text();
  }

  get(uri, options = {}) {
    return this.request(uri, { ...options, method: 'GET' });
  }

  post(uri, options = {}) {
    return this.request(uri, { ...options, method: 'POST' });
  }

  put(uri, options = {}) {
    return this.request(uri, { ...options, method: 'PUT' });
  }

  patch(uri, options = {}) {
    return this.request(uri, { ...options, method: 'PATCH' });
  }

  delete(uri, options = {}) {
    return this.request(uri, { ...options, method: 'DELETE' });
  }
}
