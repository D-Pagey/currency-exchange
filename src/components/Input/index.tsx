import React, { FC } from 'react';
import * as S from './styles';

type InputTypes = {
    onChange: Function;
    testId?: string;
    type?: string;
    value: string | number;
};

export const Input: FC<InputTypes> = ({ onChange, testId = 'input', type = 'text', value }) => {
    return <S.Input data-testid={testId} onChange={onChange} type={type} value={value} />;
};
