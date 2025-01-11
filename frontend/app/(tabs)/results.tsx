import { CalculatorResult } from "@/types";
import { getInterpretation } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";

const ResultScreen = () => {
  const [results, setResults] = useState<CalculatorResult[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8080/api/calculator/results/",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setResults(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("Ошибка:", error);
      setLoading(true);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.push("/form");
      }
    };

    fetchResults();
    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>Результаты</Text>
      {results.map((result) => (
        <View key={result.id} style={styles.card}>
          <Text style={styles.resultText}>Результат: {result.result}</Text>
          <Text style={styles.interpretationText}>
            Интерпретация: {getInterpretation(result.result)}
          </Text>
          <Text style={styles.dateText}>
            Дата: {new Date(result.created_at).toLocaleDateString()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  interpretationText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: "#888",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default ResultScreen;
