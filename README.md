Manifiesto Nomadem.

## Manifiesto de desarrollo

En el presente documento se detallan las consideraciones a seguir para este proyecto:

### Consideraciones generales

1.  La escritura de variables y funciones se escribirán con la notación [CamelCase](https://es.wikipedia.org/wiki/Camel_case) considerando para sus variantes:

    a. lowerCamelCase: nombres de variables, funciones, incluidos modelos, procedimientos y funciones en la capa de base de datos.

    _EJEMPLO_

    ```javascript
    let usuarioSession = 'thianlopezz';
    const getUsuario = () => console.log(usuarioSession);
    getUsuario();
    ```

    b. UpperCamelCase: nombres de clases, componentes de React (functional y class components) y sus resepectivos archivos.

    _EJEMPLO_

    ```javascript
    import React from 'react';
    const Hola = (props) => {
        return (<div>'HELLO WORLD!'<div>);
    };
    export default Hola;
    ```

2.  Las constantes que contengan información de configuración, variables de entorno, acciones de reducers(React), deberán seguir la notación [SCREAMING_SNAKE_CASE](https://en.wikipedia.org/wiki/Snake_case).

    ```javascript
    const USUARIO_GET = 'USUARIO_GET';
    const URL_CORREO = process.ENV.URL_CORREO;
    ```

### React

## Los nombres de los componentes y sus archivos se escribirán

## Componentes de listax

Los componentes de listas son componentes en el que vamos a enlistar (valga la redundacia) los modelos de datos.

1. Deben tener como nombre el nombre del modelo seguido de la palabra "List", siguiendo la regla 1b de las [consideraciones generales](#consideraciones-generales).

### Reducers

1. Considerar siempre un (1) reducer por modelo de datos.

2. Los nombres de los reducer deben definirse con el nombre del modelo en singular seguido de la palabra "Reducer".

#### EJEMPLO

usuarioReducer.js
planReucer.js

2. En reducers/index.js los estados deben definirse con el nombre del modelo en singular seguido de la palabra "state"

#### EJEMPLO

usuarioState
planState

3. El nombre de las acciones siempre empezarán con el nombre del model de datos.

#### EJEMPLO

```javascript
const USUARIO_GET = 'USUARIO_GET';
const USUARIO_GET_SUCCESS = 'USUARIO_GET_SUCCESS';
const USUARIO_GET_ERROR = 'USUARIO_GET_ERROR';

const USUARIO_SAVE = 'USUARIO_SAVE';
const USUARIO_SAVE_SUCCESS = 'USUARIO_SAVE_SUCCESS';
const USUARIO_SAVE_ERROR = 'USUARIO_SAVE_ERROR';
```

4. Si en el reducer existe una variación de obtención de datos, esta no deberá tener su respectiva descripción de _SUCCESS_ O _ERROR_, sino que se manejarán a través de el GET simple.

   #### EJEMPLO

   ```javascript
   const USUARIO_GET = 'USUARIO_GET';
   const USUARIO_GET_BY_NAME = 'USUARIO_GET_BY_NAME'; // Variación de consulta
   const USUARIO_GET_SUCCESS = 'USUARIO_GET_SUCCESS';
   const USUARIO_GET_ERROR = 'USUARIO_GET_ERROR';

   const USUARIO_SAVE = 'USUARIO_SAVE';
   const USUARIO_SAVE_SUCCESS = 'USUARIO_SAVE_SUCCESS';
   const USUARIO_SAVE_ERROR = 'USUARIO_SAVE_ERROR';
   ```

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
