'use client';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from './ScrollReveal';

const articles = [
  {
    image: '/images/news-1.jpg',
    date: '15/06/2026',
    category: 'Kinh nghiệm',
    title: 'Kinh nghiệm lựa chọn cửa nhôm kính chất lượng, bền đẹp',
    excerpt: 'Mỗi loại cửa nhôm kính sẽ được thiết kế và lắp đặt ở các vị trí khác nhau. Tùy theo môi trường, tính năng và mục đích sử dụng...',
  },
  {
    image: '/images/news-2.jpg',
    date: '12/06/2026',
    category: 'Thi công',
    title: 'Kinh nghiệm thi công nhà tiền chế không phải ai cũng biết',
    excerpt: 'Cần tạo ra bản thiết kế kiến trúc và nội thất hoàn chỉnh trước khi thi công. Nhiều chủ đầu tư muốn tiết kiệm chi phí...',
  },
  {
    image: '/images/news-3.jpg',
    date: '10/06/2026',
    category: 'Tư vấn',
    title: 'Nên làm cửa sắt hay inox cho cổng chính của gia đình?',
    excerpt: 'Những thông tin so sánh về ưu nhược điểm của 2 loại vật liệu sẽ giúp bạn dễ dàng tìm được đáp án cho vấn đề trên...',
  },
];

export default function News() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section news-section" id="news" ref={sectionRef}>
      <div className="container">
        <div className="section-header-redesign reveal">
          <span className="subtitle-orange">TIN TỨC & CHIA SẺ</span>
          <div className="title-row">
            <h2 className="main-title-blue">Kinh Nghiệm & Hoạt Động Thi Công</h2>
            <div className="title-line-striped"></div>
          </div>
          <p className="section-desc" style={{ marginTop: '24px' }}>
            Chia sẻ kinh nghiệm, kiến thức hữu ích về cơ khí, nhôm kính 
            giúp bạn đưa ra quyết định đúng đắn cho công trình.
          </p>
        </div>

        <div className="news-grid stagger-children">
          {articles.map((article) => (
            <a href="#" className="news-card reveal" key={article.title}>
              <div className="news-card-image">
                <img src={article.image} alt={article.title} />
                <span className="news-card-date">{article.date}</span>
              </div>
              <div className="news-card-body">
                <span className="news-card-category">{article.category}</span>
                <h4>{article.title}</h4>
                <p>{article.excerpt}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="news-more reveal">
          <a href="#" className="btn btn-outline">
            Xem Tất Cả Bài Viết
            <ArrowRight style={{ width: 18, height: 18 }} />
          </a>
        </div>
      </div>
    </section>
  );
}
