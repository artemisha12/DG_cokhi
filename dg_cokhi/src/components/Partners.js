'use client';
import { Building2 } from 'lucide-react';

const partners = [
  'Xingfa Aluminum', 'Tostem', 'PMA Window', 'Eurowindow',
  'Việt Pháp', 'Austdoor', 'PMI Glass', 'Hải Long',
  'Xingfa Aluminum', 'Tostem', 'PMA Window', 'Eurowindow',
  'Việt Pháp', 'Austdoor', 'PMI Glass', 'Hải Long',
];

export default function Partners() {
  return (
    <section className="partners-section">
      <div className="container">
        <p className="partners-label">Đối tác tin cậy của chúng tôi</p>
      </div>
      <div className="partners-marquee">
        <div className="partners-track">
          {partners.map((name, i) => (
            <div className="partner-item" key={`${name}-${i}`}>
              <Building2 style={{ width: 20, height: 20, color: 'var(--primary)', opacity: 0.6 }} />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
