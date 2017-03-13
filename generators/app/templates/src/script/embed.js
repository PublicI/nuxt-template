let prefix = '';

// load from CloudFront if the app isn't served from a dev/staging environment
// is there a better way to do this?
if (document.location.hostname != 'localhost' &&
    document.location.hostname != '10.0.2.2' &&
    document.location.hostname != 'argus') {
    prefix = '//cloudfront-files-1.publicintegrity.org/apps/<%= props.year %>/<%= props.month %>/<%= s.slugify(props.appname) %>/';
}

try {

    // removes this one annoying error in some marketing code currently deployed in the CMS
    window.show_social_links_footer = () => {
        // no-op
    };

    // attempt to get the container div/iframe
    const el = document.getElementById('<%= s.camelize(props.appname,true) %>');

    let view = el.getAttribute('data-view');
    const queryArray = [];

    if (typeof view === 'undefined' || !view) {
        view = '';
    }

    const queryString = `?${queryArray.join('&')}`;

    const url = `${prefix}embed.html#${view}${queryString}`;

    let iframe = null;

    // insert the iframe if it doesn't exist
    if (el.tagName.toLowerCase() == 'div') {
        iframe = document.createElement('iframe');
        iframe.setAttribute('src',url);
        iframe.setAttribute('id','<%= s.camelize(props.appname,true) %>');
        iframe.setAttribute('style','width:100%;height:900px;');
        iframe.setAttribute('frameBorder','0');
        iframe.setAttribute('scrolling','no');
        el.appendChild(iframe);
    }
    else if (el.tagName.toLowerCase() == 'iframe') {
        iframe = el;
    }

    // hmmmm revisit all this

    // adapted from some USAT embed code
    function oembedResizeIframe(els, data) {
        for (let i = 0; i < els.length; i++) {
            if (data.height) {
                els[i].style.height = `${data.height}px`;
            }
            /*
            if (typeof data.scrollTo !== 'undefined' && data.scrollTo !== null) {
                var elPos = els[i].getBoundingClientRect().top + window.pageYOffset;

                var totalOffset = elPos + parseInt(data.scrollTo);
                window.scrollTo(0, totalOffset);
            }*/
        }
    }

    function receiveMessage(event) {
        if (typeof iframe !== 'undefined' && iframe) {
            oembedResizeIframe([iframe], event.data);
        }
    }
    window.addEventListener('message', receiveMessage, false);

} catch (e) {
    document.getElementById('<%= s.camelize(props.appname,true) %>').innerHTML = `<img src="${prefix}${PKG_VERSION}/img/graphic-940.png"/>`;
}
