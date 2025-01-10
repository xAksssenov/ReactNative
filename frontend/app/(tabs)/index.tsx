import {
  StyleSheet,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const HomeScreen = () => {
  const [isAuth, setIsAuth] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await AsyncStorage.getItem("auth");
      setIsAuth(auth);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuth === null) return;

    if (!isAuth?.length) {
      router.push("/(tabs)/form");
    }
  }, [isAuth]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.header}>Калькулятор</Text>
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

export default HomeScreen;
