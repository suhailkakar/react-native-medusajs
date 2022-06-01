import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "../components/ProductInfo/Image";
import baseURL from "../constants/url";
import { Actions } from "react-native-router-flux";
import { Ionicons } from "@expo/vector-icons";
import MetaInfo from "../components/ProductInfo/MetaInfo";

export default function ProductInfo({ productId }) {
  const [productInfo, setproductInfo] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/store/products/${productId}`).then((res) => {
      setproductInfo(res.data.product);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => Actions.pop()}>
        <Ionicons
          style={styles.icon}
          name="arrow-back-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <ScrollView>
        {productInfo && (
          <View>
            <Images images={productInfo.images} />
            <MetaInfo product={productInfo} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  icon: {
    marginLeft: 10,
  },
});
