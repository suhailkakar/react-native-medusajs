import { Router, Scene, Stack } from "react-native-router-flux";
import ProductInfo from "./screens/ProductInfo";
import Products from "./screens/Products";

export default function App() {
  return (
    <Router>
      <Stack key="root">
        <Scene key="products" component={Products} hideNavBar />
        <Scene key="productsInfo" component={ProductInfo} hideNavBar />
      </Stack>
    </Router>
  );
}
