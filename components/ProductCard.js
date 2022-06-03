import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { widthToDp, heightToDp } from "rn-responsive-screen";
import Button from "./Button";

export default function ProductCard({ key, product }) {
  return (
    <View style={styles.container} key={key}>
      <Image
        source={{
          uri: product.thumbnail,
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.category}>{product.handle}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>
          ${product.variants[0].prices[1].amount / 100}
        </Text>

        <Button title="BUY" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    borderRadius: 10,
    marginBottom: heightToDp(4),
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 5,
    padding: 10,
    width: widthToDp(42),
    backgroundColor: "#fff",
  },
  image: {
    height: heightToDp(40),
    borderRadius: 7,
    marginBottom: heightToDp(2),
  },
  title: {
    fontSize: widthToDp(3.7),
    fontWeight: "bold",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: heightToDp(3),
  },
  category: {
    fontSize: widthToDp(3.4),
    color: "#828282",
    marginTop: 3,
  },
  price: {
    fontSize: widthToDp(4),
    fontWeight: "bold",
  },
});
