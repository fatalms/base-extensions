import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [{
    files: ['**/*.ts'],
}, {
    plugins: {
        '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: 'module',
    },

    rules: {
        '@typescript-eslint/naming-convention': ['warn', {
            selector: 'import',
            format: ['camelCase', 'PascalCase'],
        }],

        curly: 'warn',
        eqeqeq: 'warn',
        'no-throw-literal': 'warn',
        semi: 'warn',

        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],

        // enforce spacing inside array brackets
        'array-bracket-spacing': ['error', 'never'],

        // enforce spacing inside single-line blocks
        // https://eslint.org/docs/rules/block-spacing
        'block-spacing': ['error', 'always'],

        // enforce one true brace style
        'brace-style': ['error', '1tbs'],

        // require camel case names
        camelcase: ['error', { properties: 'never' }],

        // enforce or disallow capitalization of the first letter of a comment
        // https://eslint.org/docs/rules/capitalized-comments
        'capitalized-comments': ['off', 'never', {
            line: {
                ignorePattern: '.*',
                ignoreInlineComments: true,
                ignoreConsecutiveComments: true,
            },
            block: {
                ignorePattern: '.*',
                ignoreInlineComments: true,
                ignoreConsecutiveComments: true,
            },
        }],

        // require trailing commas in multiline object literals
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'never',
        }],

        // enforce spacing before and after comma
        'comma-spacing': ['error', { before: false, after: true }],

        // enforce one true comma style
        'comma-style': ['error', 'last', {
            exceptions: {
                ArrayExpression: false,
                ArrayPattern: false,
                ArrowFunctionExpression: false,
                CallExpression: false,
                FunctionDeclaration: false,
                FunctionExpression: false,
                ImportDeclaration: false,
                ObjectExpression: false,
                ObjectPattern: false,
                VariableDeclaration: false,
                NewExpression: false,
            },
        }],

        // disallow padding inside computed properties
        'computed-property-spacing': ['error', 'never'],

        // enforce newline at the end of file, with no multiple empty lines
        'eol-last': ['error', 'always'],

        // enforce spacing between functions and their invocations
        // https://eslint.org/docs/rules/func-call-spacing
        'func-call-spacing': ['error', 'never'],

        // require function expressions to have a name
        // https://eslint.org/docs/rules/func-names
        'func-names': ['error', 'always'],

        // specify whether double or single quotes should be used in JSX attributes
        // https://eslint.org/docs/rules/jsx-quotes
        'jsx-quotes': ['error', 'prefer-single'],

        // enforces spacing between keys and values in object literal properties
        'key-spacing': ['error', { beforeColon: false, afterColon: true }],

        // require a space before & after certain keywords
        'keyword-spacing': ['error', {
            before: true,
            after: true,
            overrides: {
                return: { after: true },
                throw: { after: true },
                case: { after: true },
            },
        }],

        // disallow mixed 'LF' and 'CRLF' as linebreaks
        // https://eslint.org/docs/rules/linebreak-style
        'linebreak-style': ['error', 'unix'],

        // specify the maximum length of a line in your program
        // https://eslint.org/docs/rules/max-len
        'max-len': ['error', {
            code: 100,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreUrls: true,
        }],

        // require a capital letter for constructors
        'new-cap': ['error', {
            newIsCap: true,
            newIsCapExceptions: [],
            capIsNew: false,
        }],

        // disallow the omission of parentheses when invoking a constructor with no arguments
        // https://eslint.org/docs/rules/new-parens
        'new-parens': 'error',

        // enforces new line after each method call in the chain to make it
        // more readable and easy to maintain
        // https://eslint.org/docs/rules/newline-per-chained-call
        'newline-per-chained-call': ['error'],

        // disallow use of the Array constructor
        'no-array-constructor': 'error',

        // disallow use of bitwise operators
        // https://eslint.org/docs/rules/no-bitwise
        'no-bitwise': 'error',

        // disallow comments inline after code
        'no-inline-comments': 'off',

        // disallow if as the only statement in an else block
        // https://eslint.org/docs/rules/no-lonely-if
        'no-lonely-if': 'error',

        // disallow un-paren'd mixes of different operators
        // https://eslint.org/docs/rules/no-mixed-operators
        'no-mixed-operators': ['error', {
            // the list of arthmetic groups disallows mixing `%` and `**`
            // with other arithmetic operators.
            groups: [
                ['%', '**'],
                ['%', '+'],
                ['%', '-'],
                ['%', '*'],
                ['%', '/'],
                ['**', '+'],
                ['**', '-'],
                ['**', '*'],
                ['**', '/'],
                ['&', '|', '^', '~', '<<', '>>', '>>>'],
                ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                ['&&', '||'],
                ['in', 'instanceof'],
            ],
            allowSamePrecedence: false,
        }],

        // disallow mixed spaces and tabs for indentation
        'no-mixed-spaces-and-tabs': 'error',

        // disallow use of chained assignment expressions
        // https://eslint.org/docs/rules/no-multi-assign
        // 'no-multi-assign': ['error'],

        // disallow multiple empty lines and only one newline at the end
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],

        // disallow nested ternary expressions
        'no-nested-ternary': 'error',

        // disallow use of the Object constructor
        'no-new-object': 'error',

        // disallow space between function identifier and application
        'no-spaced-func': 'error',

        // disallow tab characters entirely
        'no-tabs': 'error',

        // disallow trailing whitespace at the end of lines
        'no-trailing-spaces': ['error', {
            skipBlankLines: false,
            ignoreComments: false,
        }],

        // disallow dangling underscores in identifiers
        // https://eslint.org/docs/rules/no-underscore-dangle
        'no-underscore-dangle': ['error', {
            allow: [],
            allowAfterThis: false,
            allowAfterSuper: false,
            enforceInMethodNames: true,
        }],

        // disallow the use of Boolean literals in conditional expressions
        // also, prefer `a || b` over `a ? a : b`
        // https://eslint.org/docs/rules/no-unneeded-ternary
        'no-unneeded-ternary': ['error', { defaultAssignment: false }],

        // disallow whitespace before properties
        // https://eslint.org/docs/rules/no-whitespace-before-property
        'no-whitespace-before-property': 'error',

        // enforce the location of single-line statements
        // https://eslint.org/docs/rules/nonblock-statement-body-position
        'nonblock-statement-body-position': ['error', 'beside', { overrides: {} }],

        // require padding inside curly braces
        'object-curly-spacing': ['error', 'always'],

        // allow just one var statement per function
        'one-var': ['error', 'never'],

        // Requires operator at the beginning of the line in multiline statements
        // https://eslint.org/docs/rules/operator-linebreak
        'operator-linebreak': ['error', 'before'],

        // disallow padding within blocks
        'padded-blocks': ['error', {
            blocks: 'never',
            classes: 'never',
            switches: 'never',
        }],

        // Require or disallow padding lines between statements
        // https://eslint.org/docs/rules/padding-line-between-statements
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: 'const', next: '*' },
            { blankLine: 'always', prev: 'let', next: '*' },
            { blankLine: 'always', prev: 'var', next: '*' },

            { blankLine: 'any', prev: 'const', next: 'const' },
            { blankLine: 'any', prev: 'const', next: 'let' },
            { blankLine: 'any', prev: 'const', next: 'var' },

            { blankLine: 'any', prev: 'let', next: 'let' },
            { blankLine: 'any', prev: 'let', next: 'var' },
            { blankLine: 'any', prev: 'let', next: 'const' },

            { blankLine: 'any', prev: 'var', next: 'var' },
            { blankLine: 'any', prev: 'var', next: 'let' },
            { blankLine: 'any', prev: 'var', next: 'const' },

            { blankLine: 'always', prev: '*', next: 'return' },
        ],

        // require quotes around object literal property names
        // https://eslint.org/docs/rules/quote-props.html
        'quote-props': ['error', 'as-needed', { keywords: false, unnecessary: true, numbers: false }],

        // specify whether double or single quotes should be used
        quotes: ['error', 'single', { avoidEscape: true }],

        // require or disallow use of semicolons instead of ASI
        semi: ['error', 'always'],

        // enforce spacing before and after semicolons
        'semi-spacing': ['error', { before: false, after: true }],

        // Enforce location of semicolons
        // https://eslint.org/docs/rules/semi-style
        'semi-style': ['error', 'last'],

        // require or disallow space before blocks
        'space-before-blocks': 'error',

        // require or disallow space before function opening parenthesis
        // https://eslint.org/docs/rules/space-before-function-paren
        'space-before-function-paren': ['error', {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always',
        }],

        // require or disallow spaces inside parentheses
        'space-in-parens': ['error', 'never'],

        // require spaces around operators
        'space-infix-ops': 'error',

        // Require or disallow spaces before/after unary operators
        // https://eslint.org/docs/rules/space-unary-ops
        'space-unary-ops': ['error', {
            words: true,
            nonwords: false,
            overrides: {
            },
        }],

        // require or disallow a space immediately following the // or /* in a comment
        // https://eslint.org/docs/rules/spaced-comment
        'spaced-comment': ['error', 'always'],

        // Enforce spacing around colons of switch statements
        // https://eslint.org/docs/rules/switch-colon-spacing
        'switch-colon-spacing': ['error', { after: true, before: false }],

        // Require or disallow spacing between template tags and their literals
        // https://eslint.org/docs/rules/template-tag-spacing
        'template-tag-spacing': ['error', 'never'],

        // require or disallow the Unicode Byte Order Mark
        // https://eslint.org/docs/rules/unicode-bom
        'unicode-bom': ['error', 'never'],

    },
}];
