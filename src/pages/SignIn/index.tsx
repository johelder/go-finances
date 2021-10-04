import React from 'react';
import { Alert } from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import {SignInSocialButton} from '../../components/SignInSocialButton';

import Logo from '../../assets/gofinances.svg';
import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';

import * as S from './styles';
import {useAuth} from '../../hooks/auth';

export const SignIn = () => {
  const {SignInWithGoogle} = useAuth();

  async function handleSignWithGoogle() {
    try {
      await SignInWithGoogle();
    } catch (error) {
      Alert.alert('Não foi possível conectar a conta Google');
    }
  }


  return (
    <S.Container>
      <S.Header>
        <Logo width={RFValue(120)} />
        <S.Title>Controle suas finanças de forma muito simples</S.Title>
        <S.LoginDescription>
          Faça seu login com{'\n'} uma das contas abaixo
        </S.LoginDescription>
      </S.Header>

      <S.Footer>
        <S.FooterWrapper>
          <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} onPress={handleSignWithGoogle} />
          <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
        </S.FooterWrapper>
      </S.Footer>
    </S.Container>
  );
};
