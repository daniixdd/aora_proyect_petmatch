import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { Link } from "expo-router";

const Home = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/mascotas.png")}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/logopetmatch.png")}
          style={styles.logo}
        />
        <View style={styles.spacer} />

        {/* Botón para Log in */}
        <Link href="/auth/SignIn" style={styles.button}>
          <Text style={styles.buttonText}>Log in</Text>
        </Link>

        {/* Texto para Sign up con un Link */}
        <Text style={styles.signupText}>
          ¿No tienes una cuenta?{" "}
          <Link href="/auth/SignIn" style={styles.signupLink}>
            Sign up
          </Link>
        </Text>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 230,
    height: 230,
    marginBottom: 30,
    marginTop: 200,
  },
  spacer: {
    flex: 1,
  },
  button: {
    backgroundColor: "#FFA500",
    paddingVertical: 11,
    paddingHorizontal: 80,
    borderRadius: 20,
    width: "90%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupText: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
  },
  signupLink: {
    color: "#FFA500",
    fontWeight: "bold",
  },
});

export default Home;
