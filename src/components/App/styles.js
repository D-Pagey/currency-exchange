import styled, { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

export const GlobalStyle = createGlobalStyle`

  ${normalize()}

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

export const Wrapper = styled.div`
    border: 1px solid red;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    height: 667px;
    margin: 1rem auto 0;
    padding: 0 1rem;
    width: 375px;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;
