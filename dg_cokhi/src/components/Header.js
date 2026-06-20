'use client';
import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Giới thiệu', href: '/#about' },
  {
    label: 'Sản phẩm',
    href: '/#services',
    dropdown: [
      { label: 'Cửa nhôm kính, vách kính', href: '/danh-muc/nhom-kinh' },
      { label: 'Cửa sắt', href: '/danh-muc/cua-sat' },
      { label: 'Mái tôn', href: '/danh-muc/mai-ton' },
      { label: 'Nhà tiền chế', href: '/danh-muc/mai-ton' },
      { label: 'Mái poly', href: '/danh-muc/mai-poly' },
      { label: 'Hàng rào sắt', href: '/danh-muc/cua-sat' },
      { label: 'Vách ngăn panel', href: '/danh-muc/nhom-kinh' },
      { label: 'Inox & Cầu thang lan can', href: '/danh-muc/cua-sat' },
    ],
  },
  {
    label: 'Dịch vụ',
    href: '/#services',
    dropdown: [
      { label: 'Thi công mái tôn', href: '/danh-muc/mai-ton' },
      { label: 'Thi công nhà tiền chế', href: '/danh-muc/mai-ton' },
      { label: 'Chống thấm, sửa chữa nhà', href: '/#contact' },
    ],
  },
  { label: 'Quy trình', href: '/#process' },
  { label: 'Tin tức', href: '/#news' },
  { label: 'Liên hệ', href: '/#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} id="home">
      <div className="container header-inner">
        <a href="/" className="logo">
          <img src="/images/logo.png" alt="Đức Giáp Cơ Khí Nhôm Kính" />
          <div className="logo-text">
            <span className="brand-name">ĐỨC GIÁP</span>
            <span className="brand-tagline">CƠ KHÍ & NHÔM KÍNH</span>
          </div>
        </a>

        <nav className="nav">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div className="nav-dropdown" key={link.label}>
                <a href={link.href} className="nav-link nav-dropdown-trigger">
                  {link.label}
                  <ChevronDown />
                </a>
                <div className="nav-dropdown-menu">
                  {link.dropdown.map((item) => (
                    <a href={item.href} className="dropdown-item" key={item.label}>
                      <ChevronDown style={{ transform: 'rotate(-90deg)', width: 14, height: 14 }} />
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a href={link.href} className="nav-link" key={link.label}>
                {link.label}
              </a>
            )
          )}
        </nav>

        <a href="/#contact" className="btn btn-primary header-cta">
          Nhận báo giá
        </a>

        <button
          className={`hamburger ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <div key={link.label}>
            <a
              href={link.href}
              className="mobile-nav-link"
              onClick={handleNavClick}
            >
              {link.label}
            </a>
            {link.dropdown && (
              <div className="mobile-dropdown-items">
                {link.dropdown.map((item) => (
                  <a href={item.href} key={item.label} onClick={handleNavClick}>
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
        <a href="/#contact" className="btn btn-primary" onClick={handleNavClick}>
          Nhận báo giá
        </a>
      </div>
    </header>
  );
}
