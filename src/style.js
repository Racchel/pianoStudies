import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
   }

   button {
      border: 1px solid rgba(80, 80, 80, 0.2);
      box-shadow:0 5px 0 rgba(80, 80, 80, 1);
      :hover {
         box-shadow:0 5px 0 rgba(0, 0, 0, 1);
      }
      
      :active{
         top:5px;
         box-shadow:none;
      }
   }
`