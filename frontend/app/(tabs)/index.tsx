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

interface Question {
  id: number;
  text: string;
  options: { label: string; value: number }[];
}

const CalculatorScreen = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<number | null>(null);

  const postResult = async () => {
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
          },
        }
      );
    } catch (error) {
      console.log("Ошибка:", error);
    }
  };

  const questions: Question[] = [
    {
      id: 1,
      text: "Боль или дискомфорт в течение ночи",
      options: [
        { label: "Нет", value: 0 },
        { label: "При движении или в некоторых позах", value: 1 },
        { label: "Без движения", value: 2 },
      ],
    },
    {
      id: 2,
      text: "Продолжительность утренней скованности или боли после подъема",
      options: [
        { label: "Нет", value: 0 },
        { label: "< 15 минут", value: 1 },
        { label: ">= 15 минут", value: 2 },
      ],
    },
    {
      id: 3,
      text: "Усиление боли в положении стоя в течение 30 минут",
      options: [
        { label: "Нет", value: 0 },
        { label: "Да", value: 1 },
      ],
    },
    {
      id: 4,
      text: "Боль при ходьбе",
      options: [
        { label: "Нет", value: 0 },
        { label: "При прохождении определённого расстояния", value: 1 },
        { label: "В начале движения", value: 2 },
      ],
    },
    {
      id: 5,
      text: "Боль в положении сидя после 2 часов",
      options: [
        { label: "Нет", value: 0 },
        { label: "Да", value: 1 },
      ],
    },
    {
      id: 6,
      text: "Ограничение дистанции ходьбы",
      options: [
        { label: "Нет", value: 0 },
        { label: "Больше 1 км, но с трудом", value: 1 },
        { label: "Около 1 км (около 15 минут)", value: 2 },
        { label: "Около 500 - 900 метров (8 - 15 минут)", value: 3 },
        { label: "300 - 500 метров", value: 4 },
        { label: "100 - 300 метров", value: 5 },
        { label: "Меньше 100 метров", value: 6 },
      ],
    },
    {
      id: 7,
      text: "Потребность во вспомогательных средствах",
      options: [
        { label: "Нет", value: 0 },
        { label: "1 трость или костыль", value: 1 },
        { label: "2 трости или костыля", value: 2 },
      ],
    },
    {
      id: 8,
      text: "Возможность подъема на один лестничный пролет вверх (для тазобедренного сустава)",
      options: [
        { label: "Легко", value: 0 },
        { label: "С некоторыми трудностями", value: 0.5 },
        { label: "С умеренным трудом", value: 1 },
        { label: "С выраженным трудом", value: 1.5 },
        { label: "Нет", value: 2 },
      ],
    },
    {
      id: 9,
      text: "Возможность спуска на один лестничный пролет вниз (для тазобедренного сустава)",
      options: [
        { label: "Легко", value: 0 },
        { label: "С некоторыми трудностями", value: 0.5 },
        { label: "С умеренным трудом", value: 1 },
        { label: "С выраженным трудом", value: 1.5 },
        { label: "Нет", value: 2 },
      ],
    },
    {
      id: 10,
      text: "Возможность сидения на корточках или на коленях (для тазобедренного сустава)",
      options: [
        { label: "Легко", value: 0 },
        { label: "С некоторыми трудностями", value: 0.5 },
        { label: "С умеренным трудом", value: 1 },
        { label: "С выраженным трудом", value: 1.5 },
        { label: "Нет", value: 2 },
      ],
    },
    {
      id: 11,
      text: "Ходьба по пересеченной местности (для тазобедренного сустава)",
      options: [
        { label: "Легко", value: 0 },
        { label: "С некоторыми трудностями", value: 0.5 },
        { label: "С умеренным трудом", value: 1 },
        { label: "С выраженным трудом", value: 1.5 },
        { label: "Нет", value: 2 },
      ],
    },
    {
      id: 12,
      text: "Возможность подъема на один лестничный пролет вверх (для коленного сустава)",
      options: [
        { label: "Легко", value: 0 },
        { label: "С некоторыми трудностями", value: 0.5 },
        { label: "С умеренным трудом", value: 1 },
        { label: "С выраженным трудом", value: 1.5 },
        { label: "Нет", value: 2 },
      ],
    },
    {
      id: 13,
      text: "Возможность спуска на один лестничный пролет вниз (для коленного сустава)",
      options: [
        { label: "Легко", value: 0 },
        { label: "С некоторыми трудностями", value: 0.5 },
        { label: "С умеренным трудом", value: 1 },
        { label: "С выраженным трудом", value: 1.5 },
        { label: "Нет", value: 2 },
      ],
    },
    {
      id: 14,
      text: "Возможность сидения на корточках или на коленях (для коленного сустава)",
      options: [
        { label: "Легко", value: 0 },
        { label: "С некоторыми трудностями", value: 0.5 },
        { label: "С умеренным трудом", value: 1 },
        { label: "С выраженным трудом", value: 1.5 },
        { label: "Нет", value: 2 },
      ],
    },
    {
      id: 15,
      text: "Ходьба по пересеченной местности (для коленного сустава)",
      options: [
        { label: "Легко", value: 0 },
        { label: "С некоторыми трудностями", value: 0.5 },
        { label: "С умеренным трудом", value: 1 },
        { label: "С выраженным трудом", value: 1.5 },
        { label: "Нет", value: 2 },
      ],
    },
  ];

  const interpretation = [
    { range: "0", description: "Отсутствует" },
    { range: "1 - 4", description: "Легкая" },
    { range: "5 - 7", description: "Средняя" },
    { range: "8 - 10", description: "Тяжелая" },
    { range: "11 - 13", description: "Очень тяжелая" },
    { range: ">=14", description: "Чрезвычайно тяжелая" },
  ];

  const handleOptionSelect = (questionId: number, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const calculateResult = () => {
    const total = Object.values(answers).reduce((sum, value) => sum + value, 0);
    setResult(total);
  };

  const getInterpretation = (score: number) => {
    if (score === 0) return interpretation[0].description;
    if (score <= 4) return interpretation[1].description;
    if (score <= 7) return interpretation[2].description;
    if (score <= 10) return interpretation[3].description;
    if (score <= 13) return interpretation[4].description;
    return interpretation[5].description;
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
});

export default CalculatorScreen;
