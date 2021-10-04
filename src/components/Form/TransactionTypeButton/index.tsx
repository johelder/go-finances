import React from 'react';
import {TouchableOpacityProps} from 'react-native';

import * as S from './styles';

interface Props extends TouchableOpacityProps {
  type: 'up' | 'down';
  title: string;
  isActive: boolean;
}

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

export const TransactionTypeButton = ({
  type,
  title,
  isActive,
  ...rest
}: Props) => {
  return (
    <S.Container isActive={isActive} type={type} {...rest}>
      <S.Icon name={icons[type]} type={type} />
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};
