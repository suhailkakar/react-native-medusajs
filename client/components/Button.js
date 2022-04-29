import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { widthToDp } from "rn-responsive-screen";

export default function Button({ title, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={onPress}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FD6648",
    padding: 5,
    width: widthToDp(20),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 59,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
