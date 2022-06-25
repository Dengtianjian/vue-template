import 'highlight.js/styles/atom-one-light.css'
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import js from "highlight.js/lib/languages/javascript";
import hljsVuePlugin from '@highlightjs/vue-plugin';

hljs.registerLanguage("json", json);
hljs.registerLanguage("js", js);

export default hljsVuePlugin;