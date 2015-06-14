var prefix = '';

if (document.location.hostname != 'localhost' &&
    document.location.hostname != '10.0.2.2') {
    if ('https:' == document.location.protocol) {
        prefix = '//iw-files.s3.amazonaws.com/apps/2015/05/newproject/';
    }
    else {
        prefix = '//cloudfront-files-1.publicintegrity.org/apps/2015/05/newproject/';
    }
}

try {
    if (!window.pym) {
        window.pym = require('./lib/dev/pym.v0.4.1.js');
    }
    
    var pymParent = new pym.Parent('newProject', prefix + 'embed.html', {});
    
}
catch (e) {
    document.getElementById('newProject').innerHTML = '<img src="' + prefix + '0.1.0/img/graphic-940.png"/>';
}
