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
        semi: [1, 'always'],
        'no-console': [
            1,
            {
                allow: ['warn', 'error']
            }
        ],
        'comma-dangle': [2, 'only-multiline'],
        semi: [2, 'always'],
        'no-extra-semi': 2,
        'space-before-function-paren': 'off',
        quotes: [2, 'single', 'avoid-escape']
    },
    globals: {}
};