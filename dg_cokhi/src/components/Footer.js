'use client';
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight } from 'lucide-react';

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
  </svg>
);

const serviceLinks = [
  { label: 'Cửa nhôm kính, vách kính', href: '/danh-muc/nhom-kinh' },
  { label: 'Cửa sắt', href: '/danh-muc/cua-sat' },
  { label: 'Mái tôn', href: '/danh-muc/mai-ton' },
  { label: 'Nhà tiền chế', href: '/danh-muc/mai-ton' },
  { label: 'Mái poly', href: '/danh-muc/mai-poly' },
  { label: 'Hàng rào sắt', href: '/danh-muc/cua-sat' },
  { label: 'Vách ngăn panel', href: '/danh-muc/nhom-kinh' },
  { label: 'Inox & Cầu thang', href: '/danh-muc/cua-sat' },
];

const quickLinks = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Giới thiệu', href: '/#about' },
  { label: 'Sản phẩm', href: '/#services' },
  { label: 'Quy trình', href: '/#process' },
  { label: 'Tin tức', href: '/#news' },
  { label: 'Liên hệ', href: '/#contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <a href="/" className="logo">
                <img src="/images/logo.png" alt="Đức Giáp" style={{ height: 48 }} />
                <div className="logo-text">
                  <span className="brand-name">ĐỨC GIÁP</span>
                  <span className="brand-tagline">CƠ KHÍ & NHÔM KÍNH</span>
                </div>
              </a>
              <p>
                Chuyên cung cấp dịch vụ thiết kế, thi công và lắp đặt cơ khí chất lượng cao.
                Cam kết mang đến sản phẩm bền bỉ, thẩm mỹ và giá trị bền vững.
              </p>
              <div className="footer-socials">
                <a href="#" className="footer-social-link" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="#" className="footer-social-link" aria-label="Zalo">
                  <MessageCircle style={{ width: 18, height: 18 }} />
                </a>
                <a href="#" className="footer-social-link" aria-label="Youtube">
                  <YoutubeIcon />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="footer-heading">Dịch Vụ</h4>
              <div className="footer-links">
                {serviceLinks.map((link) => (
                  <a href={link.href} className="footer-link" key={link.label}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer-heading">Liên Kết</h4>
              <div className="footer-links">
                {quickLinks.map((link) => (
                  <a href={link.href} className="footer-link" key={link.label}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="footer-heading">Liên Hệ</h4>
              <div className="footer-contact-item">
                <MapPin />
                <span>Đường Liễu Hạnh Công Chúa,TDP Hà Thôn,<br />Phường Đồng Hới, Tỉnh Quảng Trị</span>
              </div>
              <div className="footer-contact-item">
                <Phone />
                <a href="tel:0839652962">0839.652.962</a>
              </div>
              <div className="footer-contact-item">
                <Mail />
                <a href="mailto:contact@dgcokhi.vn">contact@dgcokhi.vn</a>
              </div>
              <div className="footer-contact-item">
                <Clock />
                <span>T2 - CN: 7:00 - 18:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2026 Đức Giáp - Cơ Khí Nhôm Kính. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Chính sách bảo mật</a>
            <a href="#">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
