import * as util from "./util.js";

export function init() {
    const addQuery = document.getElementById('add-query');
    const addHeader = document.getElementById('add-header');

    addQuery.addEventListener('click', queryRow);
    addHeader.addEventListener('click', headerRow)
}

function row(type) {
    console.log(`${type}-list`);
    
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

    util.appendNew({
        type: 'span',
        parent: row,
        cl: 'option-text',
        text: '='
    });

    const valInput = util.appendNew({
        type: 'input',
        parent: row,
        cl: `option-field ${type}-value`
    });
    valInput.type = 'text';

    const deleteBtn = util.appendNew({
        type: 'button',
        parent: row,
        cl: `option-button ${type}-delete`,
    });
    deleteBtn.addEventListener('click', () => {
        row.remove();
    });

    util.appendNew({
        type: 'i',
        parent: deleteBtn,
        cl: 'bi bi-x'
    });
}

export function queryRow() {
    row("query");
}

export function headerRow() {
    row("header");
}
