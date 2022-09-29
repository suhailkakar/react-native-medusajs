import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { height, heightToDp } from "rn-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import Button from "../Button";
import axios from "axios";
import baseURL from "../../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function MetaInfo({ product }) {
  const [activeSize, setActiveSize] = useState(0);

  const addToCart = async () => {
    const cartId = await AsyncStorage.getItem("cart_id");

    axios
      .post(baseURL + "/store/carts/" + cartId + "/line-items", {
        variant_id: product.variants[0].id,
        quantity: 1,
      })
      .then(({ data }) => {
        alert(`Item ${product.title} added to cart`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{product.title}</Text>
        <View>
          <Text style={styles.price}>
            ${product.variants[0].prices[1].amount / 100}
          </Text>
          <Text style={styles.star}>⭐⭐⭐</Text>
        </View>
      </View>
      <Text style={styles.heading}>Available Sizes</Text>
      <View style={styles.row}>
        {product.options[0].values.map((size, index) => (
          <TouchableOpacity onPress={() => setActiveSize(index)}>
            <Text
              style={[
                styles.sizeTag,
                {
                  borderWidth: activeSize === index ? 3 : 0,
                },
              ]}
            >
              {size.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.heading}>Description</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button onPress={addToCart} title="Add to Cart" large={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: heightToDp(-5),
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: heightToDp(5),
  },
  title: {
    fontSize: heightToDp(6),
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: heightToDp(5),
    fontWeight: "bold",
    color: "#C37AFF",
  },
  heading: {
    fontSize: heightToDp(5),
    marginTop: heightToDp(3),
  },
  star: {
    fontSize: heightToDp(3),
    marginTop: heightToDp(1),
  },
  sizeTag: {
    borderColor: "#C37AFF",
    backgroundColor: "#F7F6FB",
    color: "#000",
    paddingHorizontal: heightToDp(7),
    paddingVertical: heightToDp(2),
    borderRadius: heightToDp(2),
    marginTop: heightToDp(2),
    overflow: "hidden",
    fontSize: heightToDp(4),
    marginBottom: heightToDp(2),
  },
  description: {
    fontSize: heightToDp(4),
    color: "#aaa",
    marginTop: heightToDp(2),
  },
});
