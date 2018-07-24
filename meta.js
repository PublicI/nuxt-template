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
    completeMessage:
        '{{#inPlace}}To get started:\n\n  yarn\n  yarn dev{{else}}To get started:\n\n  cd {{destDirName}}\n  yarn\n  yarn dev{{/inPlace}}'
};
