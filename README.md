![Screenshot from 2024-03-08 20-12-57](https://github.com/Jahongirhacking/crypto-lab/assets/66916141/37ba7641-bfa4-4a50-ad3b-bbf7ac621ce5)

![Screenshot from 2024-03-08 20-13-10](https://github.com/Jahongirhacking/crypto-lab/assets/66916141/913556d5-aed2-4a4e-be85-587d13efa54f)

![Screenshot from 2024-03-08 20-13-22](https://github.com/Jahongirhacking/crypto-lab/assets/66916141/644bf899-28c4-45ec-8e6c-3958bc1cc027)


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
