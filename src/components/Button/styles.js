import styled from 'styled-components';

export const Button = styled.button`
    background-color: rgb(6, 102, 235);
    border: none;
    border-radius: 2rem;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: -0.025em;
    line-height: 1.5rem;
    transition: all 0.2s ease 0s;
    padding: 0.625em 1.5em;
    width: 120px;

    &:hover {
        background-color: rgb(5, 91, 210);
    }
`;
