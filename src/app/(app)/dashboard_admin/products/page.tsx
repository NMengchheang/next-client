import { fetchCategories, fetchProducts } from '@/app/action';
import ProductList from "@/components/dashboard_admin/products/ProductList";

export default async function Page() {
    const products = await fetchProducts();
    const categories = await fetchCategories();
    return (
        <>
            <ProductList products={products} categories={categories} />
        </>
    );
}
