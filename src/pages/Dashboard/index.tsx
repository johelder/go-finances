import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BorderlessButton } from "react-native-gesture-handler";
import { useAuth } from "../../hooks/auth";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import { useTheme } from "styled-components";
import * as S from "./styles";

export interface TransactionListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  spendings: HighlightProps;
  total: HighlightProps;
}

export const Dashboard = () => {
  const [data, setData] = useState<TransactionListProps[]>([]);
  const [HighlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const { SignOut, user } = useAuth();

  function getLastTransaction(
    collection: TransactionListProps[],
    type: "positive" | "negative"
  ) {
    const transactionsFilttered = collection.filter(
      (transaction) => transaction.type === type
    );

    if (transactionsFilttered.length === 0) return 0;

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        transactionsFilttered.map((transaction) =>
          new Date(transaction.date).getTime()
        )
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      {
        month: "long",
      }
    )}`;
  }

  const loadTransactions = useCallback(async () => {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let spendingsTotal = 0;

    const transactionsFormatted: TransactionListProps[] = transactions.map(
      (item: TransactionListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          spendingsTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = new Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          type: item.type,
          name: item.name,
          amount,
          category: item.category,
          date,
        };
      }
    );

    const total = entriesTotal - spendingsTotal;

    setData(transactionsFormatted);

    const lastEntriesTransaction = getLastTransaction(transactions, "positive");
    const lastSpendingsTransaction = getLastTransaction(
      transactions,
      "negative"
    );
    const totalInterval =
      lastEntriesTransaction === 0
        ? "N??o h?? transa????es"
        : `01 ?? ${lastEntriesTransaction}`;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastEntriesTransaction === 0
            ? "N??o h?? transac??es"
            : `??ltima entrada dia ${lastEntriesTransaction}`,
      },

      spendings: {
        amount: spendingsTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastSpendingsTransaction === 0
            ? "N??o h?? transac??es"
            : `??ltima entrada dia ${lastSpendingsTransaction}`,
      },

      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [loadTransactions])
  );

  return (
    <S.Container>
      {isLoading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadContainer>
      ) : (
        <>
          <S.Header>
            <S.UserWrapper>
              <S.UserInfo>
                <S.Photo source={{ uri: user.photo }} />

                <S.User>
                  <S.UserGreetings>Ol??,</S.UserGreetings>
                  <S.UserName>{user.name}</S.UserName>
                </S.User>
              </S.UserInfo>

              <BorderlessButton onPress={SignOut}>
                <S.Icon name="power" />
              </BorderlessButton>
            </S.UserWrapper>
          </S.Header>

          <S.HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={HighlightData.entries.amount}
              lastTransaction={HighlightData.entries.lastTransaction}
            />

            <HighlightCard
              type="down"
              title="Sa??das"
              amount={HighlightData.spendings.amount}
              lastTransaction={HighlightData.spendings.lastTransaction}
            />

            <HighlightCard
              type="total"
              title="Total"
              amount={HighlightData.total.amount}
              lastTransaction={HighlightData.total.lastTransaction}
            />
          </S.HighlightCards>

          <S.Transactions>
            <S.Title>Listagem</S.Title>

            <S.TransactionList
              data={data}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </S.Transactions>
        </>
      )}
    </S.Container>
  );
};
