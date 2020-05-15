import styled from 'styled-components';
import { colours } from '../../tokens';

export const Input = styled.input`
    background-color: ${colours.grey};
    border: 1px solid ${colours.slightGrey};
    border-radius: 4px;
    grid-column: 3 / 4;
    padding: 0 0.5rem;
`;
