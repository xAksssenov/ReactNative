import { getInterpretation, interpretation, questions } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";

const CalculatorScreen = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<number | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const postResult = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
      await axios.post(
        "http://127.0.0.1:8080/api/calculator/",
        {
          result,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } catch (error) {
      console.log("Ошибка:", error);
    }
  };

  const handleOptionSelect = (questionId: number, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const calculateResult = () => {
    const total = Object.values(answers).reduce((sum, value) => sum + value, 0);
    setResult(total);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Калькулятор</Text>

        {questions.map((question) => (
          <View key={question.id} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.text}</Text>
            {question.options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={
                  answers[question.id] === option.value
                    ? styles.selectedOption
                    : styles.option
                }
                onPress={() => handleOptionSelect(question.id, option.value)}
              >
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={calculateResult}>
          <Text style={styles.buttonText}>Рассчитать</Text>
        </TouchableOpacity>

        {result !== null && (
          <View style={styles.result}>
            <Text style={styles.resultText}>Результат: {result}</Text>
            <Text style={styles.interpretationText}>
              Интерпретация: {getInterpretation(result)}
            </Text>
          </View>
        )}

        <View style={styles.interpretationTable}>
          <Text style={styles.tableHeader}>
            Интерпретация полученных результатов
          </Text>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Сумма баллов</Text>
            <Text style={styles.tableCell}>Степень тяжести</Text>
          </View>
          {interpretation.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.range}</Text>
              <Text style={styles.tableCell}>{item.description}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={postResult} style={styles.button}>
          <Text style={styles.buttonText}>Отправить результат</Text>
        </TouchableOpacity>
      </ScrollView>

      {showMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            Ваш результат: {result} записан
          </Text>
          <Text style={styles.messageText}>Спасибо за ответ!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
    paddingBottom: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  result: {
    padding: 20,
    marginBottom: 15,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 15,
    borderStyle: "solid",
  },
  resultText: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  interpretationText: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
  interpretationTable: {
    marginBottom: 20,
    borderColor: "#ddd",
    paddingTop: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    marginBottom: 10,
  },
  tableCell: {
    fontSize: 16,
    width: "45%",
    textAlign: "center",
  },
  messageContainer: {
    position: "absolute",
    width: "70%",
    top: 30,
    right: 20,
    backgroundColor: "#b53232",
    padding: 20,
    borderRadius: 8,
  },
  messageText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
  },
});

export default CalculatorScreen;
