import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;

        font-family: 'Roboto', sans-serif;
        text-decoration: none;

    }

    body {
        min-height: 100vh;
        min-width: 100vw;

        background-color: hsl(0, 20%, 3%);

        background-image: url('assets/background.webp');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        li {
            list-style: none;
        }

        a {
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
    }


`;

export default Global;
