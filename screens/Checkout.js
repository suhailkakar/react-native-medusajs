import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import baseURL from "../constants/url";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightToDp, widthToDp } from "rn-responsive-screen";
import Button from "../components/Button";
import ShippingAddress from "../components/ShippingAddress";
import Payment from "../components/Payment";
import RadioButton from "../components/RadioButton";
import { secret_key, publishable_key } from "../constants/stripe";

export default function Checkout({ cart }) {
  const [paymentInfo, setPaymentInfo] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState("");

  const handlePaymentInputChange = (card) => {
    setPaymentInfo(card.values);
  };

  const handleAddressInputChange = (address) => {
    setShippingAddress(address);
  };

  const createTokenId = async () => {
    // Creating a token id
    let card = {
      "card[number]": paymentInfo.number.replace(/ /g, ""),
      "card[exp_month]": paymentInfo.expiry.split("/")[0],
      "card[exp_year]": paymentInfo.expiry.split("/")[1],
      "card[cvc]": paymentInfo.cvc,
    };
    // Sending a post request to the stripe api to create a token id
    return axios
      .post(
        "https://api.stripe.com/v1/tokens",
        Object.keys(card)
          .map((key) => key + "=" + card[key])
          .join("&"),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${publishable_key}`,
          },
        }
      )
      .then((res) => {
        // Returning the token id
        return res.data.id;
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handlePayment = async () => {
    const card = {
      amount: Number(cart?.total),
      currency: "eur",
      source: await createTokenId(), // Creating a token id
      description: "User payment",
    };

    // Sending the card object to the Stripe API
    axios
      .post(
        `https://api.stripe.com/v1/charges`,
        Object.keys(card)
          .map((key) => key + "=" + card[key])
          .join("&"),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${secret_key}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status == "succeeded") {
          // Showing a success message to the user
          alert("Payment successful");
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  // Calling the API when user presses the "Place Order" button
  const placeOrder = async () => {
    // Getting cart id from async storage
    let cart_id = await AsyncStorage.getItem("cart_id");
    // Post shipping address to server
    axios
      .post(`${baseURL}/store/carts/${cartId}`, {
        shipping_address: shippingAddress,
      })
      .then(({ data }) => {
        // Post shipping method to server
        axios
          .post(`${baseURL}/store/carts/${cart_id}/shipping-methods`, {
            option_id: selectedShippingOption,
          })
          .then(({ data }) => {
            // Calling the handle Payment API
            handlePayment();
          });
      });
  };

  const fetchPaymentOption = async () => {
    // Getting cart id from async storage
    let cart_id = await AsyncStorage.getItem("cart_id");

    // Fetch shipping options from server
    axios
      .get(`${baseURL}/store/shipping-options/${cart_id}`)
      .then(({ data }) => {
        // Set shipping options to state
        setShippingOptions(data.shipping_options);
        // Initializing payment session
        InitializePaymentSessions();
      });
  };

  const InitializePaymentSessions = async () => {
    // Getting cart id from async storage

    let cart_id = await AsyncStorage.getItem("cart_id");

    // Intializing payment session
    axios
      .post(`${baseURL}/store/carts/${cart_id}/payment-sessions`)
      .then(({ data }) => {
        console.log(data.cart.payment_session);
      });
  };

  useEffect(() => {
    // Calling the function to fetch the payment options when the component mounts
    fetchPaymentOption();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header title="Checkout" />
        <View style={styles.address}>
          <Text style={styles.title}>Shipping Address</Text>
          <ShippingAddress onChange={handleAddressInputChange} />
        </View>

        <View style={styles.payment}>
          <Text style={styles.title}>Payment</Text>
          <Payment onChange={handlePaymentInputChange} />
        </View>
        <View style={styles.shipping}>
          <Text style={styles.title}>Shipping Options</Text>
          {shippingOptions.map((option) => (
            <View style={styles.shippingOption}>
              <RadioButton
                onPress={() => setSelectedShippingOption(option.id)}
                key={option.id}
                selected={selectedShippingOption === option.id}
                children={option.name}
              />
            </View>
          ))}

          <Button onPress={placeOrder} large title="Place Order" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  address: {
    marginHorizontal: widthToDp(5),
  },
  payment: {
    marginHorizontal: widthToDp(5),
    marginTop: heightToDp(4),
  },
  shipping: {
    marginHorizontal: widthToDp(5),
  },
  title: {
    fontSize: widthToDp(4.5),
  },
  shippingOption: {
    marginTop: heightToDp(2),
  },
});
