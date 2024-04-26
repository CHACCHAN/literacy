import firebase from "../firebase.js";

const fb = new firebase();

window.clickEvent = () => {

}

window.inputTextArea = (e) => {
    const PADDING_Y = 20;
    const textarea = e.target;
    const lines = (textarea.value + '\n').match(/\n/g).length;

    let lineHeight = getComputedStyle(textarea).lineHeight;

    lineHeight = lineHeight.replace(/[^-\d\.]/g, '');
    textarea.style.height = lineHeight * lines + PADDING_Y + 'px';
}

window.db_store_newThread = (e, title, detail, error) => {
    const titleElm = document.getElementById(title);
    const detailElm = document.getElementById(detail);
    const errorElm = document.getElementById(error);
    const buttonElm = e.target;

    if(!titleElm.value.trim() || !detailElm.value.trim()) {
        errorElm.classList.remove('d-none');
    } else { 
        errorElm.classList.add('d-none');

        const buttonElmContent = buttonElm.innerHTML;
        roadButton(buttonElm, buttonElmContent, true);
        fb.db_write('threads/', {
            title: titleElm.value,
            detail: detailElm.value,
        })
        .then((result) => loadButton(buttonElm, buttonElmContent, false))
        .catch((error) => {
            alert(error);
            loadButton(buttonElm, buttonElmContent, false);
        });
    }
}

function loadButton(elm, defaultElm, flag) {
    if(flag) {
        elm.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>   処理中';
        elm.disabled = true;
    } else {
        elm.innerHTML = defaultElm;
        elm.disabled = false;
    }
}