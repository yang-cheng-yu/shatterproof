import * as util from "./util.js";

/**
 * Initializes option controls
 */
export function init() {
    const searchBox = document.getElementById('search');

    const addQuery = document.getElementById('add-query');
    const addHeader = document.getElementById('add-header');

    searchBox.addEventListener('input', searchToQuery);

    addQuery.addEventListener('click', emptyQueryRow);
    addHeader.addEventListener('click', emptyHeaderRow);
}

/**
 * Adds a row of the designated type with values if needed
 * @param {string} type "query" or "header"
 * @param {string} key 
 * @param {string} value 
 */
function row(type, key = '', value = '') {    
    const list = document.getElementById(`${type}-list`);
    const count = list.querySelectorAll(type).length;

    const row = util.appendNew({
        type: 'div',
        parent: list,
        cl: `option ${type}`,
    });

    const keyInput = util.appendNew({
        type: 'input',
        parent: row,
        cl: `option-field ${type}-key`
    });
    keyInput.type = 'text';
    keyInput.value = key;

    util.appendNew({
        type: 'span',
        parent: row,
        cl: 'option-text',
        text: '='
    });

    const valueInput = util.appendNew({
        type: 'input',
        parent: row,
        cl: `option-field ${type}-value`
    });
    valueInput.type = 'text';
    valueInput.value = value;

    if (type === 'query') {
        keyInput.addEventListener('input', queryToSearch);
        valueInput.addEventListener('input', queryToSearch);
    }

    const deleteBtn = util.appendNew({
        type: 'button',
        parent: row,
        cl: `option-button option-delete`,
    });
    deleteBtn.addEventListener('click', () => {
        row.remove();
        queryToSearch();
    });

    util.appendNew({
        type: 'i',
        parent: deleteBtn,
        cl: 'bi bi-x'
    });
}

/**
 * Adds an empty query row
 */
function emptyQueryRow() {
    row("query");
}

/**
 * Adds an empty header row
 */
function emptyHeaderRow() {
    row("header");
}

/**
 * Adds a query row with key and value
 * @param {string} key 
 * @param {string} value 
 */
export function queryRow(key = '', value = '') {
    row("query", key, value);
}

/**
 * Adds a header row with key and value
 * @param {string} key 
 * @param {string} value 
 */
export function headerRow(key = '', value = '') {
    row("header", key, value);
}

/**
 * Syncs searchbox to query list
 */
export function searchToQuery() {
    const searchBox = document.getElementById('search');
    const queryList = document.getElementById('query-list');

    queryList.innerHTML = '';

    const parts = searchBox.value.split('?');

    if (parts.length > 1) {
        const params = new URLSearchParams(parts[1]);

        params.forEach((value, key) => {
            queryRow(key, value);
        });
    }
}

/**
 * Syncs query list to searchbox
 */
export function queryToSearch() {
    cleanQueries();

    const searchBox = document.getElementById('search');
    const queries = document.querySelectorAll('.query');

    const baseUrl = searchBox.value.split('?')[0];
    const params = [];

    queries.forEach(query => {
        const key = query.querySelector('.query-key').value.trim();
        const value = query.querySelector('.query-value').value.trim();

        if (key) {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
    });

    searchBox.value = (params.length > 0) ? `${baseUrl}?${params.join('&')}` : baseUrl;
}

/**
 * Removes duplicate queries
 */
export function cleanQueries() {
    const queries = document.querySelectorAll('.query');
    const seenKeys = new Set();

    for (let i = queries.length - 1; i >= 0; i--) {
        const query = queries[i];
        
        const key = query.querySelector('.query-key').value.trim();
        const value = query.querySelector('.query-value').value.trim();

        if (key === '' && value === '') {
            query.remove();
            continue;
        }

        if (key !== '') {
            if (seenKeys.has(key)) {
                query.remove();
            } else {
                seenKeys.add(key);
            }
        }
    }
}
