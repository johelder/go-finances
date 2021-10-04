import React, {useCallback, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {VictoryPie} from 'victory-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {addMonths, subMonths, format} from 'date-fns';
import {ptBR} from 'date-fns/locale';

import {categories} from '../../utils/categories';

import {Header} from '../../components/Header';
import {HistoryCard} from '../../components/HistoryCard';

import {useTheme} from 'styled-components';
import * as S from './styles';
import {useFocusEffect} from '@react-navigation/core';

interface TransactionsProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface TotalByCategoryProps {
  key: string;
  name: string;
  color: string;
  total: number;
  totalFormatted: string;
  percent: string;
}

export const Resume = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategory, setTotalByCategory] = useState<
    TotalByCategoryProps[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  function handleChangeDate(action: 'prev' | 'next') {
    if (action === 'prev') {
      setSelectedDate(subMonths(selectedDate, 1));
    } else {
      setSelectedDate(addMonths(selectedDate, 1));
    }
  }

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const spendings = responseFormatted.filter(
      (transaction: TransactionsProps) =>
        transaction.type === 'negative' &&
        new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
        new Date(transaction.date).getFullYear() === selectedDate.getFullYear(),
    );

    const totalSpendings = spendings.reduce(
      (acc: number, spending: TransactionsProps) =>
        acc + Number(spending.amount),
      0,
    );

    const totalByCategories: TotalByCategoryProps[] = [];

    categories.forEach(category => {
      let totalByCategorySum = 0;

      spendings.forEach((transaction: TransactionsProps) => {
        if (category.key === transaction.category) {
          totalByCategorySum += Number(transaction.amount);
        }
      });

      if (totalByCategorySum > 0) {
        const percent = `${(
          (totalByCategorySum / totalSpendings) *
          100
        ).toFixed(0)}%`;

        const totalFormatted = totalByCategorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        totalByCategories.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: totalByCategorySum,
          totalFormatted,
          percent,
        });
      }
    });

    setTotalByCategory(totalByCategories);
    setIsLoading(false);
  }, [selectedDate]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  return (
    <S.Container>
      <Header title="Resumo por categoria" />

      {isLoading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadContainer>
      ) : (
        <S.Content>
          <S.SelectMonth>
            <S.SelectMonthButton onPress={() => handleChangeDate('prev')}>
              <S.SelectMonthIcon name="chevron-left" />
            </S.SelectMonthButton>

            <S.Month>
              {format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}
            </S.Month>

            <S.SelectMonthButton onPress={() => handleChangeDate('next')}>
              <S.SelectMonthIcon name="chevron-right" />
            </S.SelectMonthButton>
          </S.SelectMonth>

          <S.ChartContent>
            <VictoryPie
              data={totalByCategory}
              x="percent"
              y="total"
              colorScale={totalByCategory.map(category => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={80}
            />
          </S.ChartContent>

          {totalByCategory.map(item => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))}
        </S.Content>
      )}
    </S.Container>
  );
};
