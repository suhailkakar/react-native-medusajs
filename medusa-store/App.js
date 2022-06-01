import { Router, Scene, Stack } from "react-native-router-flux";
import Products from "./screens/Products";
import ProductInfo from "./screens/ProductInfo";

export default function App() {
  return (
    <Router>
      <Stack key="root">
        <Scene key="products" component={Products} hideNavBar />
        <Scene key="ProductInfo" component={ProductInfo} hideNavBar />
      </Stack>
    </Router>
  );
}
