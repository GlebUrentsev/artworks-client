import { createGlobalStyle } from 'styled-components';
import { fontSizeL } from '../common/tokens/typography';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
      font-family: "Archivo";
      ${fontSizeL};
  }
`;
