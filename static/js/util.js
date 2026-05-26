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

/**
 * Shows a toast at the bottom right of the screen briefly
 * @param {string} message Message shown on the toast
 * @param {string} type "green" or "red" or "blue"
 * @param {number} duration How long the toast stays on screen in ms
 */
export function showToast(message, type = null, duration = 3000) {
    let container = document.getElementById('toast-wrapper');

    const toast = appendNew({
        type: 'div',
        parent: container,
        cl: 'toast',
        text: message
    });

    if (type != null) {
        toast.classList.add(type);
    }

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        
        toast.addEventListener('transitionend', () => {
            toast.remove();
        });
    }, duration);
}

/**
 * Shows a Bootstrap alert briefly
 * @param {string} message Message shown on the alert
 * @param {string} type "success" or "danger" or "primary"
 * @param {number} duration How long the alert stays on screen in ms
 */
export function showBootstrapAlert(message, type = 'success', duration = 3000) {
    const wrapper = document.getElementById('alert-wrapper');
    
    wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    const alertElement = wrapper.firstElementChild;

    if (duration) {
        setTimeout(() => {
        if (document.body.contains(alertElement)) {
            const bsAlert = new bootstrap.Alert(alertElement);
            bsAlert.close();
        }
        }, duration);
    }
}
