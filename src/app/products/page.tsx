import ProductPage from "@/components/ProductPage";
import LoginLinks from "../LoginLinks";
import Footer from "@/components/Footer";
import { fetchProducts } from "../action";

export default async function page() {
  const products = await fetchProducts();
  return (
    <div>
      <LoginLinks />
      <ProductPage products={products}/>
      <Footer />
    </div>
  );
}
