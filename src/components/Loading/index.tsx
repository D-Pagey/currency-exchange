import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import * as S from './styles';

type LoadingTypes = {
    isLoading: boolean;
};

export const Loading = ({ isLoading }: LoadingTypes): JSX.Element => (
    <S.Wrapper data-testid="loading">
        <PropagateLoader color="blue" loading={isLoading} />
    </S.Wrapper>
);
