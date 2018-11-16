module.exports = {
    helpers: {
        raw: function(options) {
            return options.fn(this);
        }
    },
    prompts: {
        name: {
            type: 'string',
            required: true,
            message: 'Project name'
        },
        description: {
            type: 'string',
            required: false,
            message: 'Project description',
            default: ''
        },
        author: {
            type: 'string',
            message: 'Author'
        },
        host: {
            type: 'string',
            message: 'Domain',
            default: 'apps.publicintegrity.org'
        }
    },
    skipInterpolation: ['node_modules/**'],
    completeMessage:
        '{{#inPlace}}To get started:\n\n  npm\n  npm run dev{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev{{/inPlace}}'
};
