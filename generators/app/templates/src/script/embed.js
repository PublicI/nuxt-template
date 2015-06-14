var prefix = '';

if (document.location.hostname != 'localhost' &&
    document.location.hostname != '10.0.2.2') {
    if ('https:' == document.location.protocol) {
        prefix = '//iw-files.s3.amazonaws.com/apps/<%= props.year %>/<%= props.month %>/<%= s.slugify(props.appname) %>/';
    }
    else {
        prefix = '//cloudfront-files-1.publicintegrity.org/apps/<%= props.year %>/<%= props.month %>/<%= s.slugify(props.appname) %>/';
    }
}

try {
    if (!window.pym) {
        window.pym = require('./lib/dev/pym.v0.4.1.js');
    }
    
    var pymParent = new pym.Parent('<%= s.camelize(props.appname,true) %>', prefix + 'embed.html', {});
    
}
catch (e) {
    document.getElementById('<%= s.camelize(props.appname,true) %>').innerHTML = '<img src="' + prefix + '0.1.0/img/graphic-940.png"/>';
}
