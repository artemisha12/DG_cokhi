'use client';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-pattern">
        <div className="hero-grid"></div>
      </div>
      <div className="container hero-inner">
        {/* Content Column */}
        <div className="hero-content">
          <div className="hero-tagline-redesign">
            <span className="tagline-bar"></span>
            <span className="tagline-text">CƠ KHÍ – NHÔM KÍNH</span>
          </div>
          <h1>
            Giải pháp cơ khí và nhôm kính hiện đại
          </h1>
          <p className="hero-subtitle">
            Gia công cơ khí, cửa nhôm kính, lan can và hạng mục theo yêu cầu.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary btn-arrow">
              Nhận báo giá
              <ArrowRight style={{ width: 18, height: 18 }} />
            </a>
            <a href="#services" className="btn btn-white btn-arrow">
              Xem dịch vụ
              <ArrowRight style={{ width: 18, height: 18 }} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

