import { categories } from '@/data/categories';
import CategoryPageClient from './CategoryPageClient';

export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.id,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = categories.find((c) => c.id === slug);
  if (!category) {
    return { title: 'Không tìm thấy danh mục' };
  }
  return {
    title: `${category.name} - Đức Giáp Cơ Khí Nhôm Kính`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = categories.find((c) => c.id === slug);

  if (!category) {
    return (
      <div className="category-page-not-found">
        <h1>Không tìm thấy danh mục</h1>
        <p>Danh mục bạn đang tìm kiếm không tồn tại.</p>
      </div>
    );
  }

  return <CategoryPageClient category={category} allCategories={categories} />;
}
