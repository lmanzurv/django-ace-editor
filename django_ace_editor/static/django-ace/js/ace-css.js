document.addEventListener('DOMContentLoaded', function(e) {
    langTools = ace.require("ace/ext/language_tools");
    ace.require("ace/ext/searchbox");
    ace.require('ace/ext/spellcheck');
    ace.require('ace/ext/snippets/css');
    ace.require('ace/ext/snippets/scss');

    // Get ace mode
    var type = document.getElementById('id_type') || document.getElementById('id_style_type');
    var mode = type.value || type.options[type.selectedIndex].value;
    var aceMode = getAceMode(mode);

    // Configure editor
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
    editor.getSession().setMode("ace/mode/" + aceMode);

    var previewAvailable = true;
    if(!document.getElementById('ace-editor-head')) {
        previewAvailable = false;
    }

    // React to editor changes
    editor.getSession().on('change', function(){
        var value = editor.getSession().getValue();
        var textNode = document.createTextNode(value);
        var target = document.getElementById('ace-editor').getAttribute('data-target');
        var textarea = document.getElementById(target);
        textarea.innerHTML = "";
        textarea.appendChild(textNode);
    });

    // React to type of resource change (CSS/SCSS)
    type.addEventListener('change', function() {
        var aceMode = getAceMode(this.options[this.selectedIndex].value);
        editor.getSession().setMode("ace/mode/" + aceMode);
        if(previewAvailable) {
            togglePreview(aceMode);
        }
    });

    // Initialize vars and mixins preview
    if(previewAvailable) {
        var preview = ace.edit('ace-editor-head');
        preview.setTheme('ace/theme/tomorrow_night');
        preview.setOptions({
            showPrintMargin: false,
            scrollPastEnd: true
        });
        preview.getSession().setMode('ace/mode/scss');
        preview.getSession().foldAll();
        preview.setReadOnly(true);
        preview.container.style.opacity = 0.8;
        preview.renderer.setStyle('disabled', true);
        preview.blur();
        togglePreview(aceMode);

        // Add autocomplete terms to main editor
        var autocompleteTerms = [];
        var headTerms = document.getElementById('id_head').value.split('\n');
        for(var i = 0; i < headTerms.length; i++) {
            var term = headTerms[i];
            if(term.startsWith('$')) {
                autocompleteTerms.push(term.split(':')[0]);
            } else if(term.startsWith('@mixin')) {
                autocompleteTerms.push(term.split(' ')[1]);
            }
        }

        var previewCompleter = {
            getCompletions: function(editor, session, pos, prefix, callback) {
                callback(null, autocompleteTerms.map(function(term) {
                    var meta = term.startsWith('$') ? 'var' : 'mixin';
                    var val = term.startsWith('$') ? term : '@include ' + term + ';';
                    return {
                        caption: term,
                        value: val,
                        meta: meta
                    };
                }));
            }
        };
        langTools.addCompleter(previewCompleter);
    }
});

function getAceMode(mode) {
    if(mode === 'CS') {
        mode = 'css';
    } else if(mode === 'SC') {
        mode = 'scss';
    }
    return mode;
}

function togglePreview(aceMode) {
    // Hide preview if mode is CSS else display it
    var preview = document.getElementsByClassName('field-head')[0];
    if(aceMode === 'css') {
        preview.style.display = 'none';
    } else if(aceMode === 'scss') {
        preview.style.display = 'block';
    }
}
