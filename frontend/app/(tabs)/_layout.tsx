import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "@/context/auth";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="form"
        options={{
          title: "Авторизация",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={28} color={color} />
          ),
          tabBarStyle: !isAuthenticated
            ? { display: "none" }
            : { display: "flex" },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Калькулятор",
          tabBarIcon: ({ color }) => (
            <Ionicons name="create" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: "Результаты",
          tabBarIcon: ({ color }) => (
            <Ionicons name="checkmark" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
