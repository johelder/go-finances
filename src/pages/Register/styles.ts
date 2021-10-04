import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Form = styled.View`
  flex: 1;
  padding: 24px;

  justify-content: space-between;
`;

export const Fields = styled.View``;

export const TransactionsTypes = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin: 8px 0 16px;
`;
