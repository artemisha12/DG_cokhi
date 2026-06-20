'use client';
import { MapPin, Phone, Mail, Clock, FileText, Building2 } from 'lucide-react';
import { useScrollReveal } from './ScrollReveal';

export default function BusinessInfo() {
  const sectionRef = useScrollReveal();

  return (
    <section className="business-info-section" ref={sectionRef}>
      <div className="container">
        <div className="business-info-card reveal">
          <div className="business-info-header">
            <div className="business-info-icon">
              <Building2 style={{ width: 28, height: 28 }} />
            </div>
            <div>
              <span className="business-info-label">THÔNG TIN DOANH NGHIỆP</span>
              <h2 className="business-info-name">CÔNG TY TNHH SẢN XUẤT VÀ THƯƠNG MẠI ĐỨC GIÁP</h2>
              <p className="business-info-subtitle">Cơ Khí & Nhôm Kính</p>
            </div>
          </div>

          <div className="business-info-grid">
            <div className="business-info-item">
              <div className="business-info-item-icon">
                <FileText style={{ width: 20, height: 20 }} />
              </div>
              <div>
                <span className="info-item-label">MÃ SỐ THUẾ</span>
                <span className="info-item-value mst-badge">0909.123.456</span>
              </div>
            </div>

            <div className="business-info-item">
              <div className="business-info-item-icon">
                <MapPin style={{ width: 20, height: 20 }} />
              </div>
              <div>
                <span className="info-item-label">TRỤ SỞ</span>
                <span className="info-item-value">Đường Liễu Hạnh Công Chúa, TDP Hà Thôn, Phường Đồng Hới, Tỉnh Quảng Trị</span>
              </div>
            </div>

            <div className="business-info-item">
              <div className="business-info-item-icon">
                <Phone style={{ width: 20, height: 20 }} />
              </div>
              <div>
                <span className="info-item-label">HOTLINE TƯ VẤN</span>
                <a href="tel:0839652962" className="info-item-value info-phone">0839.652.962</a>
                <span className="info-item-sub">Trực hotline: Anh Giáp</span>
              </div>
            </div>

            <div className="business-info-item">
              <div className="business-info-item-icon">
                <Mail style={{ width: 20, height: 20 }} />
              </div>
              <div>
                <span className="info-item-label">EMAIL</span>
                <a href="mailto:contact@dgcokhi.vn" className="info-item-value">contact@dgcokhi.vn</a>
              </div>
            </div>

            <div className="business-info-item">
              <div className="business-info-item-icon">
                <Clock style={{ width: 20, height: 20 }} />
              </div>
              <div>
                <span className="info-item-label">GIỜ LÀM VIỆC</span>
                <span className="info-item-value">Thứ 2 – Chủ nhật: 7:00 – 18:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
