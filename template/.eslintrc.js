module.exports = {
    root: true,
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true
    },
    extends: 'standard',
    // required to lint *.vue files
    plugins: ['html'],
    // add your custom rules here
    rules: {
        'brace-style': ['warn'],
        'comma-dangle': [2, 'only-multiline'],
        'comma-spacing': ['warn'],
        indent: ['warn', 4],
        'no-console': [
            1,
            {
                allow: ['warn', 'error']
            }
        ],
        'no-extra-semi': 2,
        'no-multiple-empty-lines': ['warn'],
        'no-trailing-spaces': ['warn'],
        'no-unused-vars': ['warn'],
        'padded-blocks': ['warn'],
        quotes: ['warn'],
        semi: [1,'always'],
        'space-before-function-paren': 'off',
        'space-infix-ops': ['warn'],
        'spaced-comment': ['warn']
    },
    globals: {}
};
