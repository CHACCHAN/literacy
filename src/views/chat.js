import firebase from "../firebase.js";
import AppSetupReturns from "../main.js";

const fb = new firebase();

document.getElementById('chat').addEventListener('click', () => {
    setTimeout(() => {
        fb.db_realtime_thread_lists({
            path: 'threads/',
            parentID: 'chatList',
        });
    }, 1400);
});

window.inputTextArea = (e) => {
    const PADDING_Y = 20;
    const textarea = e.target;
    const lines = (textarea.value + '\n').match(/\n/g).length;

    let lineHeight = getComputedStyle(textarea).lineHeight;

    lineHeight = lineHeight.replace(/[^-\d\.]/g, '');
    textarea.style.height = lineHeight * lines + PADDING_Y + 'px';
}

// スレッドを新規作成
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
        loadButton(buttonElm, buttonElmContent, true);
        fb.db_write('threads/', {
            uid: AppSetupReturns.setCurrentUser.uid,
            title: titleElm.value,
            detail: detailElm.value
        })
        .then((result) => {
            titleElm.value = '';
            detailElm.value = '';
            loadButton(buttonElm, buttonElmContent, false);
        })
        .catch((error) => {
            alert(new Error('エラーコード' + ':' + error));
            loadButton(buttonElm, buttonElmContent, false);
        });
    }
}

// メッセージを新規作成
window.db_store_newMessage = (e, text) => {
    const textElm = document.getElementById(text);
    const buttonElm = e.target;
    const buttonElmContent = buttonElm.innerHTML;
    const url = new URL(window.location.href);
    const thread = url.searchParams.get('thread');

    loadButton(buttonElm, buttonElmContent, true);
    fb.db_write('threads/' + thread + '/chat/', {
        uid: AppSetupReturns.setCurrentUser.uid,
        text: textElm.value,
    })
    .then((result) => {
        textElm.value = '';
        loadButton(buttonElm, buttonElmContent, false);
    })
    .catch((error) => {
        alert(new Error('エラーコード' + ':' + error));
        loadButton(buttonElm, buttonElmContent, false);
    });
}

window.db_open_thread = (listId, viewId) => {
    document.getElementById(listId).classList.remove('d-none');
    document.getElementById(viewId).classList.add('d-none');

    const url = new URL(window.location.href);
    url.searchParams.delete('thread');
    history.replaceState('', '', '/literacy/');
}

window.db_open_message = (listId, viewId, selectId) => {
    document.getElementById(listId).classList.add('d-none');
    document.getElementById(viewId).classList.remove('d-none');

    const url = new URL(window.location.href);
    url.searchParams.append('thread', selectId);
    history.pushState('', '', '?' + url.searchParams);

    fb.db_realtime_messages({
        path: 'threads/' + selectId + '/chat/',
        parentID: 'chatContent',
    });
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

// setTimeout(() => fb.db_read('threads/').then((result) => { console.log(result) }), 2000);