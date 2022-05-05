import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "../components/ProductInfo/Image";
import MetaInfo from "../components/ProductInfo/metaInfo";
import Button from "../components/Button";
import { widthToDp } from "rn-responsive-screen";
export default function ProductInfo({ productId }) {
  const [productInfo, setproductInfo] = useState(null);

  useEffect(() => {
    axios
      .get(`http://207.254.31.42:9000/store/products/${productId}`)
      .then((res) => {
        console.log(res.data.product);
        setproductInfo(res.data.product);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {productInfo && (
          <View>
            <Images images={productInfo.images} />
            <MetaInfo product={productInfo} />
          </View>
        )}
      </ScrollView>
      <Button
        style={{
          width: widthToDp(90),
          height: widthToDp(12),
        }}
        textSize={widthToDp(4)}
        title="Add to cart"
        onPress={() => AddToCart()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
