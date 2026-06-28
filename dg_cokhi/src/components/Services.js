'use client';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useScrollReveal } from './ScrollReveal';
import { categories } from '@/data/categories';

export default function Services() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section services-section" id="services" ref={sectionRef}>
      <div className="container">
        <div className="section-header-redesign reveal">
          <span className="subtitle-orange">DANH MỤC SẢN PHẨM</span>
          <div className="title-row">
            <h2 className="main-title-blue">Sản Phẩm & Dịch Vụ Của <span>ĐỨC GIÁP</span></h2>
            <div className="title-line-striped"></div>
          </div>
          <p className="section-desc" style={{ marginTop: '24px' }}>
            Chúng tôi cung cấp đa dạng sản phẩm và dịch vụ cơ khí, nhôm kính chất lượng cao, 
            được thiết kế và thi công theo đúng tiêu chuẩn kỹ thuật chuyên nghiệp.
          </p>
        </div>

        <div className="categories-wrapper stagger-children">
          {categories.map((category) => (
            <div className="category-group reveal" key={category.id} id={category.id}>
              <div className="category-header">
                <h3 className="category-title">{category.name}</h3>
                <div className="category-line"></div>
                <Link href={`/danh-muc/${category.id}`} className="category-more">
                  Xem tất cả
                  <ChevronRight style={{ width: 16, height: 16 }} />
                </Link>
              </div>

              <div className="products-grid">
                {category.items.map((item, index) => (
                  <Link
                    href={`/san-pham/${item.slug}`}
                    className="product-card"
                    key={index}
                  >
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
          ))}
        </div>
      </div>
    </section>
  );
}
