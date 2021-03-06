import styled from 'styled-components';

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
    grid-template-columns: 90px 20px minmax(100px, 1fr);
    padding: 0 0 1rem;
`;

export const GridText = styled.p`
    color: ${({ invalid }) => invalid && 'red'};
    margin: 0;
    grid-column: 1 / 4;
`;

export const Operator = styled.span`
    align-self: center;
    bottom: 2px;
    font-size: 1.8rem;
    justify-self: center;
    position: relative;
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
