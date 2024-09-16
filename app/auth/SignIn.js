import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router"; // Hook para navegación

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter(); // Hook para navegación

  // Validar formato de email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validar contraseña (al menos un carácter especial)
  const validatePassword = (password) => {
    const re = /[!@#$%^&*(),.?":{}|<>]/;
    return re.test(password);
  };

  // Manejo del clic en "Log in"
  const handleLoginPress = () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        "Error",
        "La contraseña debe contener al menos un carácter especial."
      );
      return;
    }

    // Si pasa todas las validaciones, navega a la pantalla de inicio
    router.push("/auth/Inicio"); // Redirige a la página de inicio después de validación exitosa
  };

  return (
    <ImageBackground
      source={require("../../assets/images/mascotas.png")}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logopetmatch.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.welcomeText}>Bienvenido a PetMatch</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Text style={styles.eyeIconText}>
              {passwordVisible ? "👁️" : "👁️‍🗨️"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Usa TouchableOpacity para manejar el clic */}
        <TouchableOpacity onPress={handleLoginPress} style={styles.button}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    marginBottom: -20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  loginContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 1,
  },
  eyeIconText: {
    fontSize: 18,
    color: "#aaa",
  },
  button: {
    backgroundColor: "#FFA500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
  },
});

export default Login;
