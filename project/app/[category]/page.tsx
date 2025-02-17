import CategoryPageClient from "./CategoryPageClient";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  return <CategoryPageClient category={params.category} />;
} 