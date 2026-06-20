'use client';
import { useEffect, useRef, useState } from 'react';
import { Calendar, Briefcase, ShieldCheck } from 'lucide-react';

function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="stat-number">
      {count}<span className="suffix">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {/* Stat 1 */}
          <div className="stat-card">
            <div className="stat-icon">
              <Calendar style={{ width: 26, height: 26 }} />
            </div>
            <AnimatedCounter end={10} suffix="+" />
            <div className="stat-label">Năm kinh nghiệm</div>
          </div>

          {/* Stat 2 */}
          <div className="stat-card">
            <div className="stat-icon">
              <Briefcase style={{ width: 26, height: 26 }} />
            </div>
            <AnimatedCounter end={500} suffix="+" />
            <div className="stat-label">Hạng mục hoàn thành</div>
          </div>

          {/* Stat 3 (Static, Trusted Badge) */}
          <div className="stat-card">
            <div className="stat-icon">
              <ShieldCheck style={{ width: 26, height: 26 }} />
            </div>
            <span className="stat-number static-text">Hỗ trợ 24/7</span>
            <div className="stat-label">Bảo hành rõ ràng</div>
          </div>
        </div>
      </div>
    </section>
  );
}
