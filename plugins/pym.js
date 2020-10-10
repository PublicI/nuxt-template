if (typeof document !== 'undefined') {
    var pym = require('pym.js');

    this.pym = pym.Child({
        polling: 200
    });
}
