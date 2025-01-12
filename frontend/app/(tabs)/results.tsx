import { Atricle, CalculatorResult } from "@/types";
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
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const ResultScreen = () => {
  const [results, setResults] = useState<CalculatorResult[]>([]);
  const [articles, setArticles] = useState<Atricle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
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

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://c3772d11996b330e.mokky.dev/leken"
      );
      if (response.status === 200) {
        setArticles(response.data);
      }
    } catch (error) {
      console.log("Ошибка при загрузке статей:", error);
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
    fetchArticles();
    checkAuth();
  }, []);

  const handleUpdateClick = async () => {
    setLoading(true);
    await fetchResults();
    await fetchArticles();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const chartData = {
    labels: results.map((result) =>
      new Date(result.created_at).toLocaleDateString()
    ),
    datasets: [
      {
        data: results.map((result) => result.result),
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>Результаты</Text>
      <View>
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width - 40}
          height={240}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#f9f9f9",
            backgroundGradientTo: "#f9f9f9",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForLabels: {
              fontSize: 10,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#000",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          xLabelsOffset={10}
          verticalLabelRotation={-30}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdateClick}>
        <Text style={styles.buttonText}>Обновить данные</Text>
      </TouchableOpacity>
      <Text style={styles.subHeader}>Статьи</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.articleScrollContainer}
      >
        {articles.map((article) => (
          <View key={article.id} style={styles.articleCard}>
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleContent}>{article.content}</Text>
            <Text style={styles.articleMeta}>
              Автор: {article.author} | Дата:{" "}
              {new Date(article.created_at).toLocaleDateString()}
            </Text>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.titleResult}>Вычисления</Text>
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
  subHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  articleScrollContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  articleCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginRight: 10,
    width: Dimensions.get("window").width - 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  articleTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  articleContent: {
    fontSize: 16,
    lineHeight: 22,
    color: "#555",
    marginBottom: 10,
  },
  articleMeta: {
    fontSize: 14,
    color: "#888",
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
  titleResult: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
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
  button: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 15,
    padding: 20,
    alignItems: "center",
    margin: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ResultScreen;
