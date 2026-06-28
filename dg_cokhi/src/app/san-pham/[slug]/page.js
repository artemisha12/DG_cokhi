import Link from 'next/link';
import { ChevronRight, Home, Phone, ArrowLeft, MessageCircle } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import QuoteForm from '@/components/QuoteForm';
import { categories } from '@/data/categories';

// Helper to find product by slug
function getProductData(slug) {
  for (const category of categories) {
    const product = category.items.find(item => item.slug === slug);
    if (product) {
      return { product, category };
    }
  }
  return { product: null, category: null };
}

// Generate static params for SSG
export async function generateStaticParams() {
  const paths = [];
  categories.forEach((category) => {
    category.items.forEach((item) => {
      paths.push({ slug: item.slug });
    });
  });
  return paths;
}

// Dynamic Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { product } = getProductData(slug);
  
  if (!product) {
    return { title: 'Không tìm thấy sản phẩm' };
  }

  return {
    title: `${product.title} - Cơ Khí Đức Giáp`,
    description: product.description || `Thông tin chi tiết về sản phẩm ${product.title} của Cơ khí Đức Giáp.`,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const { product, category } = getProductData(slug);

  if (!product || !category) {
    return (
      <>
        <TopBar />
        <Header />
        <main className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', color: '#d9383a', marginBottom: '16px' }}>Không tìm thấy sản phẩm</h1>
          <p style={{ color: '#666', marginBottom: '24px' }}>Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link href="/" className="btn btn-primary">
            Quay lại trang chủ
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // Get related products (other products in same category, max 4 items)
  const relatedProducts = category.items
    .filter(item => item.slug !== slug)
    .slice(0, 4);

  return (
    <>
      <TopBar />
      <Header />
      <main className="product-page-main">
        {/* Breadcrumb Navigation */}
        <section className="product-breadcrumb-sec">
          <div className="container">
            <div className="product-breadcrumb">
              <Link href="/" className="breadcrumb-item-link">
                <Home style={{ width: 15, height: 15 }} />
                Trang chủ
              </Link>
              <ChevronRight style={{ width: 14, height: 14, color: '#a0aec0' }} />
              <Link href={`/danh-muc/${category.id}`} className="breadcrumb-item-link">
                {category.name}
              </Link>
              <ChevronRight style={{ width: 14, height: 14, color: '#a0aec0' }} />
              <span className="breadcrumb-item-current">{product.title}</span>
            </div>
          </div>
        </section>

        {/* Product Details Section */}
        <section className="product-detail-section">
          <div className="container">
            <div className="product-detail-layout-grid">
              
              {/* Left Column: Image Area */}
              <div className="product-image-column">
                <div className="product-main-image-box">
                  <img src={product.image} alt={product.title} />
                </div>
              </div>

              {/* Right Column: Information Area */}
              <div className="product-info-column">
                <span className="product-category-tag">{category.name}</span>
                <h1 className="product-main-title">{product.title}</h1>
                
                <div className="product-price-box-wrapper">
                  <div className="product-price-box">
                    <span className="price-title">Giá sản phẩm:</span>
                    <span className={`price-amount ${product.price === 'Liên hệ' || !product.price ? 'price-contact-text' : ''}`}>
                      {product.price || 'Liên hệ'}
                    </span>
                  </div>
                  <p className="price-disclaimer">
                    * Giá thực tế có thể thay đổi tùy thuộc vào kích thước bản vẽ, quy cách vật tư & điều kiện thi công cụ thể.
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="product-trust-badges">
                  <div className="trust-badge-item">
                    <span className="badge-icon">✓</span>
                    <span className="badge-text">Đo đạc & Khảo sát miễn phí tận nơi</span>
                  </div>
                  <div className="trust-badge-item">
                    <span className="badge-icon">✓</span>
                    <span className="badge-text">Bảo hành kết cấu lên đến 5 năm</span>
                  </div>
                  <div className="trust-badge-item">
                    <span className="badge-icon">✓</span>
                    <span className="badge-text">Thi công đúng tiến độ, thợ lành nghề, uy tín</span>
                  </div>
                </div>

                {/* Description */}
                <div className="product-desc-box">
                  <h3>Mô tả sản phẩm</h3>
                  <p>{product.description || 'Sản phẩm cơ khí nhôm kính chất lượng cao của cơ sở Đức Giáp, được thiết kế và chế tạo bằng công nghệ hiện đại, bền bỉ và thẩm mỹ.'}</p>
                </div>

                {/* Specs Grid */}
                {product.specs && Object.keys(product.specs).length > 0 && (
                  <div className="product-specs-box">
                    <h3>Thông số kỹ thuật</h3>
                    <div className="specs-table-container">
                      <table className="product-specs-table">
                        <tbody>
                          {Object.entries(product.specs).map(([key, val]) => (
                            <tr key={key}>
                              <td className="spec-label-col">{key}</td>
                              <td className="spec-val-col">{val}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Action CTA Buttons */}
                <div className="product-actions-box">
                  <a href="#contact" className="btn btn-primary product-action-quote-btn">
                    Nhận báo giá
                  </a>
                  
                  <div className="product-action-calls">
                    <a href="tel:0909123456" className="product-call-link call-phone">
                      <Phone style={{ width: 18, height: 18 }} />
                      <span>Gọi ngay: 0909.123.456</span>
                    </a>
                    <a href="https://zalo.me/0909123456" target="_blank" rel="noopener noreferrer" className="product-call-link call-zalo">
                      <MessageCircle style={{ width: 18, height: 18 }} />
                      <span>Chat Zalo</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="related-products-section">
            <div className="container">
              <div className="related-section-header">
                <h2>Sản phẩm cùng danh mục</h2>
                <div className="header-divider"></div>
              </div>

              <div className="products-grid">
                {relatedProducts.map((item, index) => (
                  <Link href={`/san-pham/${item.slug}`} className="product-card" key={index}>
                    <div className="product-image-wrapper">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="product-body">
                      <h4 className="product-title">{item.title}</h4>
                      <div className="product-price">
                        <span>Giá:</span>
                        <span className="price-value">{item.price}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back Row */}
        <section className="product-back-row-sec">
          <div className="container">
            <Link href={`/danh-muc/${category.id}`} className="product-back-category-link">
              <ArrowLeft style={{ width: 18, height: 18 }} />
              Quay lại danh mục {category.name}
            </Link>
          </div>
        </section>

        {/* Embedded Contact Form */}
        <QuoteForm prefilledService={category.id} prefilledProduct={product.title} />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
