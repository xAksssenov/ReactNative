import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { LoginResponse } from "@/types";
import { useAuth } from "@/context/auth";

const FormScreen = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async () => {
    if (isLogin) {
      try {
        const response = await axios.post<LoginResponse>(
          "http://127.0.0.1:8080/api/login/",
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
          const { username, token } = response.data;
          await login(username, token);
          router.push("/(tabs)");
          setEmail("");
          setPassword("");
        }
      } catch (error) {
        console.log("Ошибка:", error);
      }
    } else {
      try {
        await axios.post(
          "http://127.0.0.1:8080/api/register/",
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
        console.log("Ошибка:", error);
      } finally {
        setIsLogin(true);
        setEmail("");
        setPassword("");
      }
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {isAuthenticated ? (
            <View style={styles.authenticatedContainer}>
              <Text style={styles.header}>Вы вошли под именем: {user}</Text>
              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Выйти</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.header}>
                {isLogin ? "Вход" : "Регистрация"}
              </Text>

              <View style={styles.form}>
                {!isLogin && (
                  <TextInput
                    style={styles.input}
                    placeholder="Имя"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#999"
                  />
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Почта"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholderTextColor="#999"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Пароль"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholderTextColor="#999"
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>
                    {isLogin ? "Вход" : "Регистрация"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.switchButton}
                  onPress={() => setIsLogin(!isLogin)}
                >
                  <Text style={styles.switchButtonText}>
                    {isLogin
                      ? "Нет аккаунта? Зарегистрироваться"
                      : "Уже есть аккаунт? Войти"}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
  authenticatedContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default FormScreen;
