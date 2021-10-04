import React from 'react';

import * as S from './styles';

interface Props {
  title: string;
}

export const Header = ({title}: Props) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};
