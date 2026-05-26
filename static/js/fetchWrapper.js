
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

  /**
   * Performs the request
   * @param {string} uri The uri 
   * @param {object} options The options object that includes the headers, method and body
   * @returns {Response} The response object
   */
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
}
