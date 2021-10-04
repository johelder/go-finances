import React from 'react';
import {FlatList} from 'react-native';

import {categories} from '../../utils/categories';

import {Header} from '../../components/Header';
import {Button} from '../../components/Form/Button';

import * as S from './styles';

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export const CategorySelect = ({
  category,
  setCategory,
  closeSelectCategory,
}: Props) => {
  function handleSetCategory(item: Category) {
    setCategory(item);
  }

  return (
    <S.Container>
      <Header title="Cadastro" />

      <FlatList
        data={categories}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <S.Category
            onPress={() => handleSetCategory(item)}
            isActive={category.key === item.key}>
            <S.Icon name={item.icon} />
            <S.Name>{item.name}</S.Name>
          </S.Category>
        )}
        ItemSeparatorComponent={() => <S.Separator />}
      />

      <S.Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </S.Footer>
    </S.Container>
  );
};
