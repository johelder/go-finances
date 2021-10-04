import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import {SvgProps} from 'react-native-svg';

import * as S from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export const SignInSocialButton = ({title, svg: Svg, ...rest}: Props) => {
  return (
    <S.Button {...rest}>
      <S.ImageContainer>
        <Svg />
      </S.ImageContainer>
      <S.Text>{title}</S.Text>
    </S.Button>
  );
};
