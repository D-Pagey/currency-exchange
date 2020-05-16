import React, { ChangeEvent, FC } from 'react';
import * as S from './styles';

type InputTypes = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value?: number | string;
    prefix?: string;
    testId?: string;
};

export const Input: FC<InputTypes> = ({ prefix, onChange, testId = 'input', value }) => {
    return (
        <S.NumberFormatInput
            data-testid={testId}
            onChange={onChange}
            placeholder={`${prefix}0`}
            prefix={prefix}
            thousandSeparator={true}
            value={value}
        />
    );
};
