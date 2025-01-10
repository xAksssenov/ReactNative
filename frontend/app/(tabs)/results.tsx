import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";

interface LoginResponse {
  token: string;
  username: string;
}

const FormScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (isLogin) {
      try {
        const response = await axios.post<LoginResponse>(
          "http://192.168.0.108:8080/api/login/",
          {
            email,
            password,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const { username } = response.data;
          localStorage.setItem("user", username);
          localStorage.setItem("auth", "true");
        }
      } catch (error) {
        let errorMessage = "Неизвестная ошибка";
        if (axios.isAxiosError(error) && error.response) {
          errorMessage = `Ошибка: ${error.response.status}`;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        return <Text>{errorMessage}</Text>;
      }
    } else {
      try {
        await axios.post(
          "http://192.168.0.108:8080/api/login/",
          {
            username,
            email,
            password,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        let errorMessage = "Неизвестная ошибка";
        if (axios.isAxiosError(error) && error.response) {
          errorMessage = `Ошибка: ${error.response.status}`;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        return <Text>{errorMessage}</Text>;
      } finally {
        setIsLogin(true);
        setEmail("");
        setPassword("");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.header}>{isLogin ? "Результаты" : "Регистрация"}</Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    width: "100%",
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  switchButton: {
    marginTop: 10,
  },
  switchButtonText: {
    color: "#007BFF",
    fontSize: 16,
  },
});

export default FormScreen;
