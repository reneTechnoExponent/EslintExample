module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.app.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.app.json',
      },
    },
  },
  rules: {
    // Prettier integration
    'prettier/prettier': 'error',

    // React 17+ JSX transform
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    // Allow .tsx files for JSX
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],

    // Disable prop-types since we're using TypeScript
    'react/prop-types': 'off',
    'react/require-default-props': 'off',

    // Allow any for development/testing
    '@typescript-eslint/no-explicit-any': 'warn',

    // Console warnings for development
    'no-console': 'warn',

    // Allow devDependencies in config files
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.config.js',
          '**/*.config.ts',
          '**/vite.config.ts',
          '**/eslint.config.js',
          '**/*.test.tsx',
          '**/*.test.ts',
          '**/*.spec.tsx',
          '**/*.spec.ts',
        ],
      },
    ],
    
    // Disable problematic TypeScript rules that aren't available in current version
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
  },
  ignorePatterns: ['dist', 'node_modules', 'build'],
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
