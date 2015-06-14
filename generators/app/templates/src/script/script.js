var Ractive = require('ractive'),
    d3 = require('d3');

Ractive.DEBUG = false;

if (typeof window !== 'undefined') {
    var hover = require('./lib/ractive-events-hover');
}

var fs = require('fs');

var app = {

    ractive: null,

    data: null,

    template: null,

    pym: null,

    container: null,

    rendered: function() {
        if (app.pym) {
            app.pym.sendHeight();
        }
    },

    render: function(cb) {
        if (typeof pym !== 'undefined') {
            app.pym = pym.Child({
                polling: 200
            });
        }

        app.template = fs.readFileSync(__dirname + '/../template.html', 'utf8');

        app.data = JSON.parse(fs.readFileSync(__dirname + '/../data/data.json', 'utf8'));

        if (typeof document !== 'undefined') {
            app.container = document.querySelector('#newProject');
        }

        app.ractive = new Ractive({
            el: app.container,
            template: app.template,
            data: app.data,
            oncomplete: cb
        });

        if (typeof window === 'undefined') {
            cb(app.ractive.toHTML());
        }
    }

};

if (typeof window !== 'undefined') {
    app.render(app.rendered);
} else {
    module.exports = app;
}
