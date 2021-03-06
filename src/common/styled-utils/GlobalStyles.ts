import { createGlobalStyle } from 'styled-components';
import { fontSizeL } from '../tokens';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
      font-family: "Archivo", sans-serif;
      ${fontSizeL};
  }
`;
