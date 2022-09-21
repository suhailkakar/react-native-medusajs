import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { widthToDp } from "rn-responsive-screen";
import { Feather } from "@expo/vector-icons";

export default function Toast({ message }) {
  return (
    <View style={styles.container}>
      <Feather name="shopping-cart" size={18} color="#D583FF" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7e6ff",
    borderRadius: 100,
    width: widthToDp("80%"),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    flexDirection: "row",
  },
  text: {
    color: "#D583FF",
    marginLeft: 10,
  },
});
