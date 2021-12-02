import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Dashboard } from "../pages/Dashboard";
import { Register } from "../pages/Register";

import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { Resume } from "../pages/Resume";

export type RootStackParamList = {
  Listagem: undefined;
  Cadastrar: undefined;
  Resumo: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

export const AppRoutes = () => {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          padding: Platform.OS === "ios" ? 20 : 0,
          height: 60,
        },
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="dollar-sign" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Resumo"
        component={Resume}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="pie-chart" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};
