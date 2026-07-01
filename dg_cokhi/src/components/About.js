'use client';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ScrollRevealWrapper } from './ScrollReveal';

export default function About() {
  const trustPoints = [
    'Khảo sát thực tế, đo đạc & tư vấn tận nơi hoàn toàn miễn phí.',
    'Báo giá minh bạch, tối ưu phương án thi công giúp tiết kiệm chi phí.',
    'Thi công chắc chắn, đúng kỹ thuật, thợ cơ khí lành nghề.',
    'Bảo hành kết cấu công trình dài hạn lên đến 5 năm.'
  ];

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Text Content (Left Column) */}
          <ScrollRevealWrapper direction="left">
            <div className="about-content">
              <div className="section-header-redesign">
                <span className="subtitle-orange">Giới thiệu & Uy tín</span>
                <div className="title-row">
                  <h2 className="main-title-blue">ĐỨC GIÁP</h2>
                  <div className="title-line-striped"></div>
                </div>
              </div>
              
              <p className="about-text">
                Đức Giáp là đơn vị chuyên thiết kế, gia công và thi công trọn gói các hạng mục cơ khí – nhôm kính 
                cho nhà ở và các công trình dân dụng tại Quảng Trị. Chúng tôi chế tạo cửa nhôm kính Xingfa, 
                cửa sắt, lan can, cầu thang, mái che, và nhà thép tiền chế với cam kết bền bỉ và thẩm mỹ cao nhất.
              </p>

              {/* Asymmetric Stats Layout */}
              <div className="about-stats-panel">
                <div className="about-stat-item">
                  <span className="about-stat-num">10+</span>
                  <span className="about-stat-desc">Năm kinh nghiệm thi công</span>
                </div>
                <div className="about-stat-item">
                  <span className="about-stat-num">500+</span>
                  <span className="about-stat-desc">Hạng mục đã hoàn thành</span>
                </div>
              </div>

              {/* Clean Trust List */}
              <div className="about-trust-list">
                {trustPoints.map((point, index) => (
                  <div className="about-trust-item" key={index}>
                    <CheckCircle2 className="trust-item-icon" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <a href="#services" className="btn btn-primary" style={{ marginTop: '8px' }}>
                Xem Dịch Vụ
                <ArrowRight style={{ width: 18, height: 18 }} />
              </a>
            </div>
          </ScrollRevealWrapper>

          {/* Image Showcase (Right Column - Asymmetric Layout) */}
          <ScrollRevealWrapper direction="right">
            <div className="about-showcase">
              <div className="showcase-image-large">
                <img
                  src="/images/about-main.jpg"
                  alt="Thi công nhôm kính Đức Giáp"
                />
              </div>
              <div className="showcase-image-small">
                <img
                  src="/images/about-secondary.jpg"
                  alt="Sản phẩm cơ khí Đức Giáp"
                />
              </div>
            </div>
          </ScrollRevealWrapper>
        </div>
      </div>
    </section>
  );
}
