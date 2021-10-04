import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface IconPros {
  type: "up" | "down";
}

interface ContainerProps extends IconPros {
  isActive: boolean;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px;

  border-radius: 5px;

  ${({ isActive }) =>
    isActive
      ? css`
          border: 0;
        `
      : css`
          border: 1.5px solid ${({ theme }) => theme.colors.text};
        `};

  ${({ type, isActive }) =>
    type === "up" &&
    isActive &&
    css`
      border: 1.5px solid ${({ theme }) => theme.colors.sucess_light};
      background: ${({ theme }) => theme.colors.sucess_light};
    `}

  ${({ type, isActive }) =>
    type === "down" &&
    isActive &&
    css`
      border: 1.5px solid ${({ theme }) => theme.colors.attention_light};
      background: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Icon = styled(Feather)<IconPros>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ type, theme }) =>
    type === "up" ? theme.colors.sucess : theme.colors.attention};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
`;
