# -*- coding: utf-8 -*-
from django.forms import widgets
from django.utils.html import conditional_escape
from django.utils.encoding import force_unicode
from django.utils.safestring import mark_safe

class AceEditor(widgets.Textarea):
    def __init__(self, attrs=None):
        default_attrs = {}
        default_attrs = {'cols': '40', 'rows': '10'}
        if attrs:
            default_attrs.update(attrs)
        super(AceEditor, self).__init__(attrs=default_attrs)

    def render(self, name, value, attrs=None):
        attrs.update(style='display: none;')
        rendered = super(AceEditor, self).render(name, value, attrs)

        if value is None:
            value = ''

        template = '<div id="ace-editor" data-target="%s">%s</div>%s' % (attrs['id'], conditional_escape(force_unicode(value)), rendered)

        return mark_safe(template)

class AceEditorCSS(AceEditor):
    class Media:
        js = ('ace-editor/js/ace.js', 'ace-editor/js/ext-language_tools.js', 'ace-editor/js/ext-searchbox.js', 'ace-editor/js/ext-spellcheck.js',
            'ace-editor/js/snippets/css.js', 'ace-editor/js/snippets/scss.js', 'ace-editor/js/theme-clouds.js', 'ace-editor/js/theme-tomorrow_night.js',
            'ace-editor/js/mode-css.js', 'ace-editor/js/mode-scss.js', 'ace-editor/js/worker-css.js', 'django-ace/js/ace-css.js')

        css = {
            'all': ('django-ace/css/ace-style.css', )
        }

class AceEditorJS(AceEditor):
    class Media:
        js = ('ace-editor/js/ace.js', 'ace-editor/js/ext-language_tools.js', 'ace-editor/js/ext-searchbox.js', 'ace-editor/js/ext-spellcheck.js',
            'ace-editor/js/snippets/javascript.js', 'ace-editor/js/theme-clouds.js', 'ace-editor/js/mode-javascript.js', 'ace-editor/js/worker-javascript.js',
            'django-ace/js/ace-javascript.js')

        css = {
            'all': ('django-ace/css/ace-style.css', )
        }

class AceEditorHTML(AceEditor):
    class Media:
        js = ('ace-editor/js/ace.js', 'ace-editor/js/ext-language_tools.js', 'ace-editor/js/ext-searchbox.js', 'ace-editor/js/ext-spellcheck.js',
            'ace-editor/js/snippets/html.js', 'ace-editor/js/theme-clouds.js', 'ace-editor/js/mode-html.js', 'ace-editor/js/worker-html.js', 'django-ace/js/ace-html.js')

        css = {
            'all': ('django-ace/css/ace-style.css', )
        }

class AceEditorJSON(AceEditor):
    class Media:
        js = ('ace-editor/js/ace.js', 'ace-editor/js/ext-language_tools.js', 'ace-editor/js/ext-searchbox.js', 'ace-editor/js/ext-spellcheck.js',
            'ace-editor/js/snippets/json.js', 'ace-editor/js/theme-clouds.js', 'ace-editor/js/mode-json.js', 'ace-editor/js/worker-json.js', 'django-ace/js/ace-json.js')

        css = {
            'all': ('django-ace/css/ace-style.css', )
        }
