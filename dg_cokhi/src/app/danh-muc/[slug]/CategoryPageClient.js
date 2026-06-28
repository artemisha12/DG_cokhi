'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Home, Phone, ArrowLeft, ChevronDown } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import QuoteForm from '@/components/QuoteForm';

export default function CategoryPageClient({ category, allCategories }) {
  const router = useRouter();
  const [menuExpanded, setMenuExpanded] = useState(false);
  return (
    <>
      <TopBar />
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="category-hero">
          <div className="category-hero-overlay"></div>
          <div className="container category-hero-content">
            <div className="category-breadcrumb">
              <Link href="/" className="breadcrumb-link">
                <Home style={{ width: 16, height: 16 }} />
                Trang chủ
              </Link>
              <ChevronRight style={{ width: 14, height: 14, color: 'rgba(255,255,255,0.5)' }} />
              <Link href="/#services" className="breadcrumb-link">
                Sản phẩm
              </Link>
              <ChevronRight style={{ width: 14, height: 14, color: 'rgba(255,255,255,0.5)' }} />
              <span className="breadcrumb-current">{category.name}</span>
            </div>
            <h1 className="category-hero-title">{category.name}</h1>
            <p className="category-hero-desc">{category.description}</p>
          </div>
        </section>

        {/* Category Content */}
        <section className="category-content-section">
          <div className="container">
            <div className="category-layout">
              {/* Sidebar */}
              <aside className="category-sidebar">
                <div className="sidebar-card">
                  <h3 
                    className="sidebar-title" 
                    onClick={() => setMenuExpanded(!menuExpanded)}
                    style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span>Danh mục sản phẩm</span>
                    <ChevronDown 
                      className="mobile-category-toggle-icon" 
                      style={{ 
                        transition: 'transform 0.3s ease',
                        transform: menuExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                      }} 
                    />
                  </h3>
                  <ul className={`sidebar-menu ${menuExpanded ? 'expanded' : 'collapsed'}`}>
                    {allCategories.map((cat) => (
                      <li key={cat.id}>
                        <Link
                           href={`/danh-muc/${cat.id}`}
                           className={`sidebar-link ${cat.id === category.id ? 'active' : ''}`}
                        >
                           <ChevronRight style={{ width: 16, height: 16 }} />
                           {cat.name}
                           <span className="sidebar-count">{cat.items.length}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sidebar-card sidebar-cta">
                  <div className="sidebar-cta-icon">
                    <Phone style={{ width: 28, height: 28 }} />
                  </div>
                  <h4>Bạn cần tư vấn?</h4>
                  <p>Liên hệ ngay để được báo giá miễn phí</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                    <a href="tel:0909123456" className="btn btn-primary sidebar-cta-btn" style={{ margin: 0 }}>
                      <Phone style={{ width: 16, height: 16 }} />
                      Gọi ngay
                    </a>
                    <a href="#contact" className="btn btn-outline sidebar-cta-btn-outline" style={{ margin: 0 }}>
                      Nhận báo giá
                    </a>
                  </div>
                </div>
              </aside>

              {/* Products Grid */}
              <div className="category-main">
                <div className="category-main-header">
                  <h2 className="category-main-title">
                    {category.name}
                    <span className="product-count-badge">{category.items.length} sản phẩm</span>
                  </h2>
                </div>

                <div className="category-products-grid">
                  {category.items.map((item, index) => (
                    <Link
                      href={`/san-pham/${item.slug}`}
                      className="category-product-card"
                      key={index}
                    >
                      <div className="category-product-image">
                        <img src={item.image} alt={item.title} />
                        <div className="category-product-overlay">
                          <button
                            type="button"
                            className="btn btn-primary category-product-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              router.push(`/san-pham/${item.slug}#contact`);
                            }}
                          >
                            Nhận báo giá
                          </button>
                        </div>
                      </div>
                      <div className="category-product-body">
                        <h4 className="category-product-title">{item.title}</h4>
                        <div className="category-product-price">
                          <span>Giá:</span>
                          <span className="price-highlight">{item.price}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Back link */}
                <div className="category-back-row">
                  <Link href="/#services" className="category-back-link">
                    <ArrowLeft style={{ width: 18, height: 18 }} />
                    Quay lại tất cả sản phẩm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Embedded Contact Form */}
        <QuoteForm prefilledService={category.id} />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}


