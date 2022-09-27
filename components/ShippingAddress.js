// Importing a few package and components
import { View, StyleSheet, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { heightToDp } from "rn-responsive-screen";

export default function ShippingAddress({ onChange }) {
  // Passing onChange as a prop

  // Declaring a few states to store the user's input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [AddressLine1, setAddressLine1] = useState("");
  const [AddressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  // Function to handle the user's input
  const handleChange = () => {
    // Creating an object to store the user's input
    let address = {
      first_name: firstName,
      last_name: lastName,
      address_1: AddressLine1,
      address_2: AddressLine2,
      city,
      province,
      postal_code: postalCode,
      phone,
      company,
    };
    // Calling the onChange function and passing the address object as an argument
    onChange(address);
  };

  return (
    // Creating a view to hold the user's input
    <View style={styles.container}>
      {/* Creating a text input for the user's first name */}
      <TextInput
        onChangeText={(e) => {
          // Setting the user's input to the firstName state
          setFirstName(e);
          // Calling the handleChange function
          handleChange();
        }}
        placeholder="First Name"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setLastName(e);
          handleChange();
        }}
        placeholder="Last Name"
        style={styles.input}
      />
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput
        onChangeText={(e) => {
          setAddressLine1(e);
          handleChange();
        }}
        placeholder="Address Line 1"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setAddressLine2(e);
          handleChange();
        }}
        placeholder="Address Line 2"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setCity(e);
          handleChange();
        }}
        placeholder="City"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setCountry(e);
          handleChange();
        }}
        placeholder="Country"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setProvince(e);
          handleChange();
        }}
        placeholder="Province"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setPostalCode(e);
          handleChange();
        }}
        placeholder="Postal Code"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setPhone(e);
          handleChange();
        }}
        placeholder="Phone"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setCompany(e);
          handleChange();
        }}
        placeholder="Company"
        style={styles.input}
      />
    </View>
  );
}

// Creating a stylesheet to style the view
const styles = StyleSheet.create({
  container: {
    marginTop: heightToDp(2),
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderColor: "#E5E5E5",
    borderRadius: 5,
    marginTop: 10.2,
  },
});
