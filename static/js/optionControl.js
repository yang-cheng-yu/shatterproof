import * as util from "./util.js";

export function init() {
    const searchBox = document.getElementById('search');

    const addQuery = document.getElementById('add-query');
    const addHeader = document.getElementById('add-header');

    searchBox.addEventListener('input', searchToQuery);

    addQuery.addEventListener('click', emptyQueryRow);
    addHeader.addEventListener('click', emptyHeaderRow);
}

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

function emptyQueryRow() {
    row("query");
}

function emptyHeaderRow() {
    row("header");
}

export function queryRow(key = '', value = '') {
    row("query", key, value);
}

export function headerRow(key = '', value = '') {
    row("header", key, value);
}

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

export function queryToSearch() {
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
