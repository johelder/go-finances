import React from "react";

import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
  onPress?: () => void;
}

export const Button = ({ title, onPress }: Props) => {
  return (
    <S.Container onPress={onPress}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};
