import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Router, Route, Link } from "expo-router";

const Home = () => (
  <View style={styles.container}>
    <Text>Home Screen</Text>
    <Link href="/profile" style={styles.link}>
      Go to Profile
    </Link>
  </View>
);

const Profile = () => (
  <View style={styles.container}>
    <Text>Profile Screen</Text>
    <Link href="/" style={styles.link}>
      Go to Home
    </Link>
  </View>
);

const App = () => (
  <Router>
    <Route path="/" component={Home} />
    <Route path="/profile" component={Profile} />
  </Router>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: "blue",
    marginTop: 20,
  },
});

export default App;
