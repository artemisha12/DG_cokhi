'use client';
import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { categories } from '@/data/categories';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const navLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu', href: '/#about' },
    {
      label: 'Sản phẩm',
      href: '/#services',
      isMegamenu: true,
      dropdown: categories,
    },
    {
      label: 'Dịch vụ',
      href: '/#services',
      dropdown: [
        { label: 'Thi công mái tôn', href: '/danh-muc/mai-ton' },
        { label: 'Thi công nhà tiền chế', href: '/danh-muc/mai-ton' },
        { label: 'Lắp đặt mái poly', href: '/danh-muc/mai-poly' },
        { label: 'Thi công cửa sắt, lan can', href: '/danh-muc/cua-sat' },
        { label: 'Chống thấm, sửa chữa nhà', href: '/danh-muc/sua-chua-nha' },
      ],
    },
    { label: 'Quy trình', href: '/#process' },
    { label: 'Tin tức', href: '/#news' },
    { label: 'Liên hệ', href: '#contact' },
  ];

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
    setActiveMobileDropdown(null);
  };

  const toggleMobileDropdown = (label) => {
    setActiveMobileDropdown(activeMobileDropdown === label ? null : label);
  };

  const handleDropdownItemClick = (e, item) => {
    if (item.href === '#contact') {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('select-quote-service', { detail: 'suachuanha' }));
      const formEl = document.getElementById('contact');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileOpen(false);
    setActiveMobileDropdown(null);
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
              <div className={`nav-dropdown ${link.isMegamenu ? 'nav-megamenu' : ''}`} key={link.label}>
                <a href={link.href} className="nav-link nav-dropdown-trigger">
                  {link.label}
                  <ChevronDown />
                </a>
                {link.isMegamenu ? (
                  <div className="nav-dropdown-menu nav-megamenu-menu">
                    <div className="megamenu-grid">
                      {categories.map((cat) => (
                        <div className="megamenu-column" key={cat.id}>
                          <a href={`/danh-muc/${cat.id}`} className="megamenu-category-title">
                            {cat.name}
                          </a>
                          <div className="megamenu-items">
                            {cat.items.map((item) => (
                              <a href={`/san-pham/${item.slug}`} className="megamenu-item" key={item.title}>
                                {item.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                    <div className="nav-dropdown-menu">
                      {link.dropdown.map((item) => (
                        <a 
                          href={item.href} 
                          className="dropdown-item" 
                          key={item.label}
                          onClick={(e) => handleDropdownItemClick(e, item)}
                        >
                          <ChevronDown style={{ transform: 'rotate(-90deg)', width: 14, height: 14 }} />
                          {item.label}
                        </a>
                      ))}
                    </div>
                )}
              </div>
            ) : (
              <a href={link.href} className="nav-link" key={link.label}>
                {link.label}
              </a>
            )
          )}
        </nav>

        <a href="#contact" className="btn btn-primary header-cta">
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
            {link.dropdown ? (
              <>
                <div className="mobile-nav-link-wrapper">
                  <a
                    href="#"
                    className="mobile-nav-link"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMobileDropdown(link.label);
                    }}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      style={{
                        width: 18,
                        height: 18,
                        transition: 'transform 0.2s ease',
                        transform: activeMobileDropdown === link.label ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </a>
                </div>
                <div
                  className="mobile-dropdown-items"
                  style={{
                    display: activeMobileDropdown === link.label ? 'block' : 'none',
                  }}
                >
                  {link.isMegamenu ? (
                    categories.map((cat) => (
                      <div key={cat.id} className="mobile-megamenu-category">
                        <span className="mobile-megamenu-cat-title">{cat.name}</span>
                        <div className="mobile-megamenu-product-links">
                          {cat.items.map((item) => (
                            <a href={`/san-pham/${item.slug}`} key={item.slug} onClick={handleNavClick}>
                              {item.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    link.dropdown.map((item) => (
                      <a 
                        href={item.href} 
                        key={item.label} 
                        onClick={(e) => handleDropdownItemClick(e, item)}
                      >
                        {item.label}
                      </a>
                    ))
                  )}
                </div>
              </>
            ) : (
              <a
                href={link.href}
                className="mobile-nav-link"
                onClick={handleNavClick}
              >
                {link.label}
              </a>
            )}
          </div>
        ))}
        <a href="#contact" className="btn btn-primary" onClick={handleNavClick}>
          Nhận báo giá
        </a>
      </div>
    </header>
  );
}
