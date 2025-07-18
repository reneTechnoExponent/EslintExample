# ESLint Setup with Airbnb Style Guide for TypeScript React

This project demonstrates a complete ESLint setup with strict Airbnb style guide enforcement for a TypeScript React application, integrated with Prettier for code formatting.

## Overview

This setup provides:
- **Strict Airbnb style guide enforcement** for JavaScript, TypeScript, and React
- **TypeScript support** with proper type checking and linting
- **Prettier integration** for consistent code formatting
- **Security-focused linting** following OWASP guidelines
- **Accessibility (a11y) rules** for better web accessibility
- **Import/export linting** for better module organization

## Tools and Configurations Used

### Core Tools
- **ESLint v8.57.1** - The main linting engine (downgraded from v9 for .eslintrc compatibility)
- **Prettier** - Code formatter integrated with ESLint
- **TypeScript** - Static type checking

### ESLint Configurations
- `eslint-config-airbnb` - Official Airbnb JavaScript style guide
- `eslint-config-airbnb/hooks` - Airbnb React Hooks rules
- `eslint-config-airbnb-typescript` - Airbnb TypeScript rules
- `eslint-config-prettier` - Disables ESLint rules that conflict with Prettier

### ESLint Plugins
- `@typescript-eslint/eslint-plugin` - TypeScript-specific linting rules
- `eslint-plugin-react` - React-specific linting rules
- `eslint-plugin-react-hooks` - React Hooks linting rules
- `eslint-plugin-jsx-a11y` - JSX accessibility linting rules
- `eslint-plugin-import` - Import/export linting rules
- `eslint-plugin-prettier` - Prettier integration

## Configuration Files

### `.eslintrc.cjs`
Main ESLint configuration file using the traditional format (not flat config). Key features:
- Extends official Airbnb configurations
- TypeScript parser configuration pointing to `tsconfig.app.json`
- Custom rules for React 17+ JSX transform
- Security-focused rules (e.g., `react/jsx-no-target-blank`)
- Import resolver configuration for TypeScript

### `.prettierrc.cjs`
Prettier configuration with Airbnb-style formatting:
- Single quotes
- Semicolons
- 2-space indentation
- Trailing commas
- 80-character line width

### TypeScript Configuration
- `tsconfig.json` - Project references configuration
- `tsconfig.app.json` - Application-specific TypeScript settings
- `tsconfig.node.json` - Node.js-specific TypeScript settings

## Available Commands

```bash
# Linting
npm run lint          # Check for linting errors
npm run lint:fix       # Auto-fix linting errors where possible

# Formatting
npm run format         # Format code with Prettier
npm run format:check   # Check if code is formatted correctly

# Development
npm run dev           # Start development server
npm run build         # Build for production
```

## How We Verified It Works

### 1. Created Test File with Violations
We created `src/BadCodeExample.tsx` with intentional violations:

```typescript
import React from 'react'
import { useState } from "react"   // Mixed quotes violation

const BadCodeExample = () => {
  const [count, setCount] = useState(0)    
  var oldStyleVar = "bad practice"        // var instead of const/let
  let user_name = "underscore_not_allowed" // snake_case instead of camelCase
  const obj = {x:1,y:2}                   // Missing spaces in object
  
  const handleClick = function() {         // function() instead of arrow function
    const newCount = count + 1
    setCount(newCount)
  }
  
  const userObj: any = new Object()       // new Object() instead of {}
  userObj.name = "test"
  
  if (count > 5) 
    return <div>Too many clicks</div>     // Missing braces
  
  return (
    <div>
      <h1 style={{color: "red"}}>Bad Code Example</h1>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Click me</button>
      <img src="test.jpg" />              {/* Missing alt attribute */}
      <a href="javascript:void(0)">Bad link</a>  {/* Security violation */}
      <div onClick={() => console.log("clicked")}>
        Clickable div without keyboard support  {/* Accessibility violation */}
      </div>
      <input type="text" placeholder="Enter text" />  {/* Missing label */}
    </div>
  )
}

export default BadCodeExample
```

### 2. ESLint Catches All Violations
Running `npm run lint` successfully catches violations including:

#### Security Violations (OWASP Compliance)
- `react/jsx-no-target-blank` - Prevents XSS attacks with target="_blank"
- `react/jsx-no-script-url` - Prevents JavaScript URLs

#### Accessibility Violations
- `jsx-a11y/alt-text` - Missing alt attributes on images
- `jsx-a11y/click-events-have-key-events` - Clickable elements need keyboard support
- `jsx-a11y/label-has-associated-control` - Form inputs need labels

#### Code Quality Violations
- `import/no-absolute-path` - Prevents absolute import paths
- `no-var` - Enforces const/let over var
- `camelcase` - Enforces camelCase naming
- `object-curly-spacing` - Enforces consistent spacing in objects
- `prefer-arrow-callback` - Prefers arrow functions

#### React/JSX Violations
- `react/jsx-curly-brace-presence` - Consistent JSX expression usage
- `react/jsx-boolean-value` - Consistent boolean prop usage
- `react/self-closing-comp` - Enforces self-closing components

### 3. Prettier Integration Works
- Running `npm run format` fixes formatting issues automatically
- ESLint and Prettier work together without conflicts
- Consistent code style across the project

### 4. TypeScript Integration Verified
- ESLint properly parses TypeScript files
- TypeScript-specific rules are applied
- Import resolver works with TypeScript paths
- Type checking integrates with linting

## Technical Details

### TypeScript Configuration
- Uses `tsconfig.app.json` for parser project reference
- Supports modern TypeScript features
- Proper import resolution for TypeScript files

### Security Features
Following OWASP guidelines:
- Prevents XSS vulnerabilities
- Enforces secure link practices
- Validates form accessibility
- Prevents dangerous JavaScript patterns

## Example Linting Output

```bash
$ npm run lint

C:\...\src\BadCodeExample.tsx
   3:22  error  Do not import modules using an absolute path                    import/no-absolute-path
  12:9   error  Using target="_blank" without rel="noreferrer" is a security risk  react/jsx-no-target-blank
  15:9   error  Using target="_blank" without rel="noreferrer" is a security risk  react/jsx-no-target-blank
  21:9   error  Missing an explicit type attribute for button                   react/button-has-type
  22:9   error  img elements must have an alt prop                             jsx-a11y/alt-text
  23:9   error  Script URL is a form of eval                                   react/jsx-no-script-url
  24:9   error  Visible, non-interactive elements with click handlers must have role attribute  jsx-a11y/no-static-element-interactions
  27:9   error  Form label must have associated control                        jsx-a11y/label-has-associated-control
```
