import * as util from "./util.js";
import { FetchWrapper, HttpError, NetworkError } from "./fetchWrapper.js";
import * as optionControl from "./optionControl.js"

document.addEventListener('DOMContentLoaded', init);

function init() {
    optionControl.init();
}
