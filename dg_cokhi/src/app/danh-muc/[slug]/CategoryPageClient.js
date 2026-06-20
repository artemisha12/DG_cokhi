'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Phone, ArrowLeft, X, ChevronLeft } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

export default function CategoryPageClient({ category, allCategories }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    setIsZoomed(false);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prevIndex) => (prevIndex + 1) % category.items.length);
    setIsZoomed(false);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prevIndex) => (prevIndex - 1 + category.items.length) % category.items.length);
    setIsZoomed(false);
  };

  const toggleZoom = (e) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

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
                  <h3 className="sidebar-title">Danh mục sản phẩm</h3>
                  <ul className="sidebar-menu">
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
                  <a href="tel:0909123456" className="btn btn-primary sidebar-cta-btn">
                    <Phone style={{ width: 16, height: 16 }} />
                    Gọi ngay
                  </a>
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
                    <div
                      className="category-product-card"
                      key={index}
                      onClick={() => openLightbox(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="category-product-image">
                        <img src={item.image} alt={item.title} />
                        <div className="category-product-overlay">
                          <Link
                            href="/#contact"
                            className="btn btn-primary category-product-btn"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Nhận báo giá
                          </Link>
                        </div>
                      </div>
                      <div className="category-product-body">
                        <h4 className="category-product-title">{item.title}</h4>
                        <div className="category-product-price">
                          <span>Giá:</span>
                          <span className="price-highlight">{item.price}</span>
                        </div>
                      </div>
                    </div>
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
      </main>
      <Footer />
      <FloatingButtons />

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox-modal" onClick={closeLightbox}>
          <div className="lightbox-backdrop"></div>
          
          <button className="lightbox-btn lightbox-close" onClick={closeLightbox} aria-label="Đóng">
            <X style={{ width: 28, height: 28 }} />
          </button>
          
          <button className="lightbox-btn lightbox-prev" onClick={prevImage} aria-label="Ảnh trước">
            <ChevronLeft style={{ width: 36, height: 36 }} />
          </button>
          
          <button className="lightbox-btn lightbox-next" onClick={nextImage} aria-label="Ảnh sau">
            <ChevronRight style={{ width: 36, height: 36 }} />
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className={`lightbox-image-wrapper ${isZoomed ? 'zoomed' : ''}`} onClick={toggleZoom}>
              <img
                src={category.items[lightboxIndex].image}
                alt={category.items[lightboxIndex].title}
                className="lightbox-image"
              />
            </div>
            
            <div className="lightbox-info">
              <h3 className="lightbox-title">{category.items[lightboxIndex].title}</h3>
              <p className="lightbox-price">{category.items[lightboxIndex].price}</p>
              <div className="lightbox-counter">
                {lightboxIndex + 1} / {category.items.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
