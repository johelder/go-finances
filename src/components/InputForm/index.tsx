import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Form/Input";

import * as S from "./styles";

interface Props extends TextInputProps {
  name: string;
  control: Control;
  error: string;
}

export const InputForm = ({ name, control, error, ...rest }: Props) => {
  return (
    <S.Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
      />
      <S.Error>{error}</S.Error>
    </S.Container>
  );
};
