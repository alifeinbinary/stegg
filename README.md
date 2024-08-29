# Binary Translate

This is a front-end React application written in Typescript. It's from the footer of [my website](https://www.alifeinbinary.com), which I have split off as it's own project for those who are enthusiastic to learn how it works.

Basically, this app takes the text input from the textarea field and writes it to the metadata of a newly created PNG file that is generated from the HTML canvas. The image is an 8bit integer array of binary code translated from the entered text. There is a toggle where you can select whether the data should be commited to the metadata as an AES encrypted string or plain text. Once you click Save, the file will be downloaded to your computer at which point you can send the image to a friend. They would be able to decipher the text by dragging the PNG file you sent them into the drop zone and entering the correct passkey, if it's encrypted.  

Nobody asked for this, I just made it for the love of the game some time ago. I had it in the footer of my website for many years as a fun gimmick for fans. This repo is a modernised version of it with encryption, transparent PNGs and a handsome UI.

It was created with [Vite](https://github.com/vitejs/vite), [Tailwind](https://github.com/tailwindlabs/tailwindcss), [Flowbite](https://github.com/themesberg/flowbite), and [Font Awesome](https://github.com/FortAwesome/Font-Awesome) icons.

## Demo

You can play with a [demo](https://alifeinbinary.github.io/binary-translate/) here. 

## Getting started

After cloning the repo you can install dependencies with

```bash
npm install
```

and then start your local development environment with

```bash
npm run dev
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
