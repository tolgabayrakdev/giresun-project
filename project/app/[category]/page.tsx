import CategoryPageClient from "./CategoryPageClient";

export default function CategoryPage({ params }: { params: { category: string } }) {
  return <CategoryPageClient category={params.category} />;
} 