import styled from 'styled-components';
import { colours } from '../../tokens';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.h2`
    margin: 0;
    padding: 0 0 1rem;
`;

export const Text = styled.p`
    font-weight: bold;
    margin: 0;
    padding: 1rem 0;
    text-align: center;
`;

export const Grid = styled.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 120px 1fr;
    padding: 0 0 1rem;
`;

export const Input = styled.input`
    border: 1px solid ${colours.slightGrey};
    background-color: ${colours.grey};
    padding: 0 0.5rem;
    border-radius: 4px;
`;

export const GridText = styled.p`
    margin: 0;
    grid-column: 1 / 3;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const ItalicSmall = styled.p`
    font-size: 12px;
    font-style: italic;
    margin: 0;
    padding: 0 0 1rem;
`;
