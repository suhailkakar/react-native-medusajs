import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ProductInfo from "./screens/ProductInfo";
import { Provider as PaperProvider } from "react-native-paper";
import { Router, Scene, Stack } from "react-native-router-flux";
import Products from "./screens/Products";

export default function App() {
  return (
    <Router>
      <Stack key="root">
        <Scene
          key="products"
          component={Products}
          title="Products"
          hideNavBar
        />
      </Stack>
    </Router>
  );
}
