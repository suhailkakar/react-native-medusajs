import { View, Text } from "react-native";
import React from "react";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-credit-card-input";
export default function Payment({ onChange }) {
  return (
    <View
      style={{
        borderWidth: 1,
        padding: 3,
        borderColor: "#E5E5E5",
        borderRadius: 5,
        marginTop: 10.2,
        marginBottom: 10.2,
      }}
    >
      <LiteCreditCardInput onChange={onChange} />
    </View>
  );
}
