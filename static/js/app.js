import * as util from "./util.js";
import { FetchWrapper, HttpError, NetworkError } from "./fetchWrapper.js";
import * as optionControl from "./optionControl.js"

document.addEventListener('DOMContentLoaded', init);

function init() {
    optionControl.init();

    document.getElementById('go').addEventListener('click', go);

}

async function go() {
    document.getElementById('go').blur;

    const responseContainer = document.querySelector('.response-box');
    const responseBox = document.getElementById('response');
    const statusBox = document.getElementById('status');
    const contentTypeBox = document.getElementById('content-type');

    let uri = document.getElementById('search').value;
    const method = document.getElementById('method').value;
    const body = document.getElementById('body').value;

    const headers = document.querySelectorAll('.header');
    const headersObj = {};

    headers.forEach(header => {
        const key = header.querySelector('.header-key').value;
        const value = header.querySelector('.header-value').value;

        if (key) {
            headersObj[key] = value;
        }
    });    

    const options = {
        headers: headersObj,
        method: method,
    };

    if (method !== 'GET' && method !== 'HEAD') {
        if (body.trim() !== '' && util.isValidJson(body)) {
            options.body = body;
        }
    }

    if (!(uri.startsWith('http://') || uri.startsWith('https://'))) {
        if (uri.startsWith('localhost') || uri.startsWith('127.0.0.1')) {
            uri = 'http://' + uri;
        } else {
            uri = 'https://' + uri;
        }
    }

    if (!util.isValidUrl(uri)) {
        console.log("invalid url");
        return;
    }

    let response;

    try {
        response = await FetchWrapper.request(uri, options);
    } catch (error) {
        if (error instanceof HttpError) {
            console.log('HTTP Error:' + error.status);
        } else if (error instanceof NetworkError) {
            console.log('Network Error');
        }
    }
    console.log(response);
    

    const status = response.status;
    const isSuccess = status >= 200 && status < 300;
    const statusLine = status + " " + response.statusText;
    const contentType = response.headers.get('content-type') || 'text/plain';

    statusBox.textContent = statusLine;
    statusBox.classList.toggle('status-green', isSuccess);
    statusBox.classList.toggle('status-red', !isSuccess);

    contentTypeBox.textContent = contentType;

    if (contentType && contentType.includes('application/json')) {
        responseBox.value = JSON.stringify(await response.json(), null, 2);
    } else {
        responseBox.value = await response.text();
    }

    if (responseContainer.classList.contains('closed')) {
        responseContainer.classList.remove('closed');
        responseContainer.classList.add('open');
    }

    responseContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
}
