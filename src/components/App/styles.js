import styled, { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import { colours } from '../../tokens';

export const GlobalStyle = createGlobalStyle`

  ${normalize()}

  body {
    background-color: ${colours.offWhite};
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
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    height: 667px;
    margin: 1rem auto 0;
    padding: 0 1rem;
    max-width: 375px;
    position: relative;
`;

export const ButtonWrapper = styled.div`
    bottom: 1rem;
    display: flex;
    justify-content: space-between;
    left: 1rem;
    position: absolute;
    right: 1rem;
`;
