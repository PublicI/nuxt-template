/* global Typekit:false */

const config = {
    kitId: 'wnz3ozp',
    scriptTimeout: 3000,
    async: true
};
const timer = setTimeout(() => {
    document.documentElement.className = `${document.documentElement.className.replace(
        /\bwf-loading\b/g,
        ''
    )} wf-inactive`;
}, config.scriptTimeout);
const scriptEl = document.createElement('script');
const otherScripts = document.getElementsByTagName('script')[0];
let init = false;
let status;
document.documentElement.className += ' wf-loading';
scriptEl.src = `https://use.typekit.net/${config.kitId}.js`;
scriptEl.async = true;
scriptEl.onload = scriptEl.onreadystatechange = function() {
    status = this.readyState;
    if (init || (status && status !== 'complete' && status !== 'loaded')) {
        return;
    }
    init = true;
    clearTimeout(timer);
    try {
        Typekit.load(config);
    } catch (e) {}
};
otherScripts.parentNode.insertBefore(scriptEl, otherScripts);
