import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { widthToDp } from "rn-responsive-screen";
import axios from "axios";
import Header from "../components/Header";
import { Actions } from "react-native-router-flux";
import baseURL from "../constants/url";
import Button from "../components/Button";
import { Feather } from "@expo/vector-icons";

export default function Products() {
  const [products, setProducts] = useState([]);

  function fetchProducts() {
    axios.get(`${baseURL}/store/products`).then((res) => {
      setProducts(res.data.products);
    });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Medusa's Store" />
      <ScrollView>
        <View style={styles.products}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              onPress={() => Actions.ProductInfo({ productId: product.id })}
            >
              <ProductCard product={product} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.addToCart}>
        <Feather
          name="shopping-cart"
          size={24}
          color="white"
          onPress={() => Actions.cart()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  products: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: widthToDp(100),
    paddingHorizontal: widthToDp(4),
    justifyContent: "space-between",
  },
  addToCart: {
    position: "absolute",
    bottom: 30,
    right: 10,
    backgroundColor: "#C37AFF",
    width: widthToDp(12),
    height: widthToDp(12),
    borderRadius: widthToDp(10),
    alignItems: "center",
    padding: widthToDp(2),
    justifyContent: "center",
  },
});
