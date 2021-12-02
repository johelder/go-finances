import React, { useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import uuid from "react-native-uuid";

import { useAuth } from "../../hooks/auth";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "../../routes/app.routes";

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { Header } from "../../components/Header";
import { CategorySelect } from "../CategorySelect";
import { InputForm } from "../../components/InputForm";

import * as S from "./styles";

interface FormData {
  name: string;
  amount: string;
}

type Props = BottomTabScreenProps<RootStackParamList, "Listagem">;

const schema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  amount: yup
    .number()
    .positive("Número precisa ser positivo")
    .typeError("Informe um valor númerico")
    .required("Valor obrigatório"),
});

export const Register = ({ navigation }: Props) => {
  const [activeTransactionType, setActiveTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { user } = useAuth();

  function handleActiveTransactionType(type: "positive" | "negative") {
    setActiveTransactionType(type);
  }

  function handleOpenlectCategory() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategory() {
    setCategoryModalOpen(false);
  }

  async function handleRegisterTransaction(form: FormData) {
    if (!activeTransactionType) {
      return Alert.alert("Selecione um tipo de transação.");
    }

    if (category.key === "category") {
      return Alert.alert("Selecione uma categoria.");
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: activeTransactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const formattedData = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));

      reset();
      setActiveTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });

      navigation.navigate("Listagem");
    } catch (error) {
      Alert.alert("Não foi possível salvar a transação.");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <Header title="Cadastro" />

        <S.Form>
          <S.Fields>
            <InputForm
              control={control}
              name="name"
              placeholder="Nome"
              autoCapitalize="sentences"
              error={errors.name && errors.name.message}
            />

            <InputForm
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <S.TransactionsTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleActiveTransactionType("positive")}
                isActive={activeTransactionType === "positive"}
              />

              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleActiveTransactionType("negative")}
                isActive={activeTransactionType === "negative"}
              />
            </S.TransactionsTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenlectCategory}
            />
          </S.Fields>

          <Button
            title="Enviar"
            onPress={handleSubmit(handleRegisterTransaction)}
          />
        </S.Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategory}
          />
        </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  );
};
