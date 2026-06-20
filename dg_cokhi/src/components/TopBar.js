'use client';
import { Phone, Mail, Clock, MessageCircle } from 'lucide-react';

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-left">
          <a href="tel:0909123456" className="topbar-item">
            <Phone />
            <span>Hotline: 0909.123.456</span>
          </a>
          <a href="mailto:contact@dgcokhi.vn" className="topbar-item">
            <Mail />
            <span>contact@dgcokhi.vn</span>
          </a>
          <span className="topbar-item">
            <Clock />
            <span>T2 - CN: 7:00 - 18:00</span>
          </span>
        </div>
        <div className="topbar-right">
          <a href="#" className="topbar-social" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a href="#" className="topbar-social" aria-label="Zalo">
            <MessageCircle />
          </a>
        </div>
      </div>
    </div>
  );
}
