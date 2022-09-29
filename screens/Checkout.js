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
import { CardField, useStripe } from "@stripe/stripe-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Checkout({ cart }) {
  const [paymentInfo, setPaymentInfo] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState("");
  const [paymentSession, setPaymentSession] = useState({});

  const { confirmPayment } = useStripe();

  const handlePaymentInputChange = (card) => {
    setPaymentInfo(card);
  };

  const handleAddressInputChange = (address) => {
    setShippingAddress(address);
  };

  const handlePayment = async () => {
    const clientSecret = paymentSession.client_secret;

    // TODO: Update the object with proper values from the user's input
    const billingDetails = {
      email: "email@stripe.com",
      phone: "+48888000888",
      addressCity: "Houston",
      addressCountry: "US",
      addressLine1: "1459  Circle Drive",
      addressLine2: "Texas",
      addressPostalCode: "77063",
    };
    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      type: "Card",
      billingDetails,
    });
    if (error) {
      console.log(error);
    }
    if (paymentIntent) {
      console.log(paymentIntent);
    }
  };

  // Calling the API when user presses the "Place Order" button
  const placeOrder = async () => {
    // Getting cart id from async storage
    let cart_id = await AsyncStorage.getItem("cart_id");
    // Post shipping address to server
    axios
      .post(`${baseURL}/store/carts/${cart_id}`, {
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
        axios
          .post(`${baseURL}/store/carts/${cart_id}/payment-session`, {
            provider_id: "stripe",
          })
          .then(({ data }) => {
            console.log("data =>", data.cart.payment_session);
            setPaymentSession(data.cart.payment_session);
          });
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
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={{
              backgroundColor: "#FFFFFF",
              textColor: "#000000",
            }}
            style={{
              width: "100%",
              height: 50,
              marginVertical: 30,
            }}
            onCardChange={(cardDetails) => {
              handlePaymentInputChange(cardDetails);
            }}
            onFocus={(focusedField) => {
              console.log("focusField", focusedField);
            }}
          />
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
