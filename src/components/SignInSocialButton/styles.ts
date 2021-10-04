import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(56)}px;

  background-color: ${({ theme }) => theme.colors.shape};
  margin-bottom: 16px;

  border-radius: 5px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.View`
  height: 100%;

  padding: ${RFValue(16)}px;

  align-items: center;
  justify-content: center;

  border-color: ${({ theme }) => theme.colors.background};
  border-right-width: 1px;
`;

export const Text = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};

  flex: 1;
  text-align: center;
`;
