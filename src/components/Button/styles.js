import styled from 'styled-components';
import { colours } from '../../tokens';

export const Button = styled.button.attrs({
    type: 'button',
})`
    background-color: ${colours.blue};
    border: none;
    border-radius: 2rem;
    color: ${colours.white};
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: -0.025em;
    line-height: 1.5rem;
    transition: all 0.2s ease 0s;
    padding: 0.625em 1.5em;
    width: 160px;
    min-width: 110px;

    &:hover {
        background-color: ${colours.darkBlue};
    }
`;

export const SecondaryButton = styled(Button)`
    color: ${colours.blue};
    background-color: ${colours.white};
    border: 1px solid ${colours.blue};

    &:hover {
        background-color: ${colours.white};
    }
`;

export const DisabledButton = styled(Button)`
    color: ${colours.white};
    background-color: ${colours.darkGrey};
    border: none;
    cursor: initial;

    &:hover {
        background-color: ${colours.darkGrey};
    }
`;
