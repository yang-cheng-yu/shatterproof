/**
 * Creates a new DOM element and appends it to a parent
 * * @param {Object} options The configuration object for the new element
 * @param {string} options.type The HTML tag name ('div', 'span', etc.)
 * @param {HTMLElement} options.parent The DOM node to append the new element to
 * @param {string} [options.cl=''] Space-separated class names
 * @param {string} [options.id=''] The element's ID
 * @param {string} [options.text=''] The text content of the element
 * @param {Object} [options.data={}] An object containing data attributes (e.g., { userId: 123 })
 * @returns {HTMLElement} The newly created element
 */
export function appendNew({ type, parent, cl = '', id = '', text = '', data = {} }) {
    const el = document.createElement(type);

    if (id) {
        el.id = id;
    }

    if (cl) {
        el.className = cl;
    }

    if (text) {
        el.textContent = text;
    }

    for (const [key, value] of Object.entries(data)) {
        el.dataset[key] = value;
    }

    if (parent instanceof HTMLElement) {
        parent.appendChild(el);
    } else {
        console.warn('appendNew: Invalid or missing parent element. Element was created but not appended.');
    }

    return el;
}

/**
 * 
 * @param {string} string 
 * @returns {boolean} True if the string is a valid URL
 */
export function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}


/**
 * 
 * @param {string} string 
 * @returns {boolean} True if the string is a valid URL
 */
export function isValidJson(string) {
  try {
    JSON.parse(string);
    return true;
  } catch (err) {
    return false;
  }
}
