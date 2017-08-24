document.addEventListener('DOMContentLoaded', function(e) {
    ace.require("ace/ext/language_tools");
    ace.require("ace/ext/searchbox");
    ace.require('ace/ext/spellcheck');
    ace.require('ace/ext/snippets/javascript');

    var editor = ace.edit("ace-editor");
    editor.setTheme("ace/theme/clouds");
    editor.setOptions({
        showPrintMargin: false,
        displayIndentGuides: true,
        scrollPastEnd: true,
        useSoftTabs: true,
        tabSize: 4,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false,
        spellcheck: true
    });

    editor.getSession().setMode("ace/mode/javascript");

    editor.getSession().on('change', function(){
        var value = editor.getSession().getValue();
        var textNode = document.createTextNode(value);
        var target = document.getElementById('ace-editor').getAttribute('data-target');
        var textarea = document.getElementById(target);
        textarea.innerHTML = "";
        textarea.appendChild(textNode);
    });
});
