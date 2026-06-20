'use client';
import { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="floating-buttons-redesign">
      <a
        href="https://zalo.me/0909123456"
        className="float-btn-redesign float-btn-zalo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Zalo"
      >
        <MessageCircle style={{ width: 24, height: 24 }} />
        <span className="float-btn-text">Zalo Chat</span>
      </a>
      <a
        href="tel:0909123456"
        className="float-btn-redesign float-btn-phone"
        aria-label="Gọi điện"
      >
        <Phone style={{ width: 24, height: 24 }} />
        <span className="float-btn-text">0909.123.456</span>
      </a>
      <button
        onClick={scrollToTop}
        className={`float-btn-redesign float-btn-scrolltop ${showScrollTop ? 'visible' : ''}`}
        aria-label="Cuộn lên đầu trang"
      >
        <ArrowUp style={{ width: 24, height: 24 }} />
        <span className="float-btn-text">Đầu trang</span>
      </button>
    </div>
  );
}
