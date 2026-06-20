'use client';
import { ShieldCheck, HardHat, Gem, Leaf, ArrowRight } from 'lucide-react';
import { ScrollRevealWrapper } from './ScrollReveal';

const features = [
  { icon: ShieldCheck, label: 'Thi Công Chắc Chắn' },
  { icon: HardHat, label: 'An Toàn Kỹ Thuật' },
  { icon: Gem, label: 'Thẩm Mỹ Tinh Gọn' },
  { icon: Leaf, label: 'Bền Bỉ Lâu Dài' },
];

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Text Content (Left Column) */}
          <ScrollRevealWrapper direction="left">
            <div className="about-content">
              <div className="section-header-redesign">
                <span className="subtitle-orange">GIỚI THIỆU VỀ</span>
                <div className="title-row">
                  <h2 className="main-title-blue">ĐỨC GIÁP</h2>
                  <div className="title-line-striped"></div>
                </div>
              </div>
              <p className="about-text">
                Đức Giáp là đơn vị chuyên thiết kế, gia công và thi công các hạng mục cơ khí – nhôm kính
                cho nhà ở, công trình dân dụng và công trình kinh doanh. Chúng tôi thực hiện đa dạng
                hạng mục như cửa nhôm kính, cửa sắt – inox, lan can, cầu thang, mái che, nhà tiền chế
                và các sản phẩm cơ khí theo yêu cầu.
              </p>

              <p className="about-text">
                Với kinh nghiệm thực tế trong nhiều công trình, Đức Giáp luôn chú trọng khảo sát kỹ,
                tư vấn đúng nhu cầu, báo giá minh bạch và thi công chắc chắn. Mỗi sản phẩm được hoàn thiện
                với tiêu chí bền bỉ, an toàn, thẩm mỹ và phù hợp với ngân sách của khách hàng.
              </p>

              <div className="about-features">
                {features.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div className="about-feature" key={f.label}>
                      <div className="feature-icon">
                        <Icon style={{ width: 20, height: 20 }} />
                      </div>
                      <span className="feature-label">{f.label}</span>
                    </div>
                  );
                })}
              </div>

              <a href="#services" className="btn btn-primary">
                Xem Dịch Vụ
                <ArrowRight style={{ width: 18, height: 18 }} />
              </a>
            </div>
          </ScrollRevealWrapper>

          {/* Image Assets (Right Column) */}
          <ScrollRevealWrapper direction="right">
            <div className="about-images">
              <div className="about-img-main">
                <img
                  src="/images/about-main.jpg"
                  alt="Đội ngũ thi công Đức Giáp Cơ Khí"
                />
              </div>
              <div className="about-img-secondary">
                <img
                  src="/images/about-secondary.jpg"
                  alt="Sản phẩm nhôm kính Đức Giáp"
                />
              </div>
              <div className="about-exp-badge">
                <span className="exp-number">10+</span>
                <span className="exp-text">Năm</span>
              </div>
            </div>
          </ScrollRevealWrapper>
        </div>
      </div>
    </section>
  );
}
