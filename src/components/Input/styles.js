import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { colours } from '../../tokens';

export const NumberFormatInput = styled(NumberFormat)`
    background-color: ${colours.grey};
    border: 1px solid ${colours.slightGrey};
    border-radius: 4px;
    grid-column: 3 / 4;
    padding: 0 0.5rem;
`;
