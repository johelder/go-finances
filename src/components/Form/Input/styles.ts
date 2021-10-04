import styled from "styled-components/native";
import { TextInput } from "react-native";

export const Container = styled(TextInput)`
  background: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.text};
  padding: 18px 16px;
  margin-bottom: 8px;

  border-radius: 5px;
`;
