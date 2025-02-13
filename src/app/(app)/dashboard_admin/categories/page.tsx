import { fetchCategories } from "@/app/action";
import CategoryList from "@/components/dashboard_admin/categories/CategoryList";

export default async function page() {
    const categories = await fetchCategories();
    return (
        <>
            <CategoryList categories={categories}/>
        </>
    )
}