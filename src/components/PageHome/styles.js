import styled from 'styled-components';
import { colours } from '../../tokens';

export const Title = styled.h2`
    margin: 0;
`;

export const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 2rem 0 1rem;
`;

export const Item = styled.li`
    padding: 0 0 1rem;
    font-size: 2rem;
`;

export const Key = styled.span`
    padding: 0 1rem 0 0;
`;

export const Value = styled.span`
    color: ${colours.darkBlue};
`;
