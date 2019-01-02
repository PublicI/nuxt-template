#!/usr/bin/env node

// https://github.com/egoist/poi/blob/master/create-poi-app/bin/cli.js
// and https://github.com/saojs/sao/blob/master/bin/cli.js

const cli = require('cac')();
const sao = require('sao');
const pkg = require('./package.json');

cli.command('[outDir]', 'Generate a new project')
    .action((outDir, flags) => {
        const options = Object.assign(
            {
                generator: __dirname,
                outDir: outDir || '.',
                updateCheck: true
            },
            flags
        );

        return sao(options)
            .run()
            .catch(sao.handleError);
    })
    .option('-y, --yes', 'Use the default options')
    .option('--debug', 'Show debug logs');

cli.help();
cli.version(pkg.version);

cli.parse();
