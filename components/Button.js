import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { widthToDp } from "rn-responsive-screen";

export default function Button({ title, onPress, style, textSize, large }) {
  return (
    <View style={[styles.container, style, large && styles.large]}>
      <Text
        style={[
          styles.text,
          { fontSize: textSize ? textSize : widthToDp(3.5) },
          ,
        ]}
        onPress={onPress}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C37AFF",
    padding: 5,
    width: widthToDp(20),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 59,
  },
  large: {
    width: "100%",
    marginTop: 10,
    height: widthToDp(12),
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
