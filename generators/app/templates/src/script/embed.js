var prefix = '';

if (document.location.hostname != 'localhost' &&
    document.location.hostname != '10.0.2.2') {
    prefix = '//cloudfront-files-1.publicintegrity.org/apps/<%= props.year %>/<%= props.month %>/<%= s.slugify(props.appname) %>/';
}

try {
    if (!window.pym) {
        window.pym = require('pym.js');
    }
    
    var pymParent = new pym.Parent('<%= s.camelize(props.appname,true) %>', prefix + 'embed.html', {});
    
}
catch (e) {
    document.getElementById('<%= s.camelize(props.appname,true) %>').innerHTML = '<img src="' + prefix + PKG_VERSION + '/img/graphic-940.png"/>';
}
