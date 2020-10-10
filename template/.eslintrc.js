module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    extends: [
        'standard',
        'plugin:vue/recommended'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    // add your custom rules here
    rules: {
        'vue/html-indent': ['warn', 4],
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
