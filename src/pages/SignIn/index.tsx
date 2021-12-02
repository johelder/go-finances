import React, { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { useAuth } from "../../hooks/auth";

import { SignInSocialButton } from "../../components/SignInSocialButton";

import Logo from "../../assets/gofinances.svg";
import GoogleSvg from "../../assets/google.svg";
import AppleSvg from "../../assets/apple.svg";

import { useTheme } from "styled-components";
import * as S from "./styles";

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { SignInWithGoogle } = useAuth();
  const theme = useTheme();

  async function handleSignWithGoogle() {
    try {
      setIsLoading(true);
      return await SignInWithGoogle();
    } catch (error) {
      Alert.alert("Não foi possível conectar a conta Google");
      setIsLoading(false);
    }
  }

  return (
    <S.Container>
      <S.Header>
        <Logo width={RFValue(120)} />
        <S.Title>Controle suas finanças de forma muito simples</S.Title>
        <S.LoginDescription>
          Faça seu login com{"\n"} uma das contas abaixo
        </S.LoginDescription>
      </S.Header>

      <S.Footer>
        <S.FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignWithGoogle}
          />
          <SignInSocialButton
            title="Entrar com Apple"
            svg={AppleSvg}
            onPress={() => Alert.alert("Em construção...")}
          />
        </S.FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        )}
      </S.Footer>
    </S.Container>
  );
};
