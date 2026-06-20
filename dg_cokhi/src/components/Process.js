'use client';
import { useEffect, useRef } from 'react';
import { ClipboardList, MapPin, Calculator, Hammer, CheckCircle2 } from 'lucide-react';

const steps = [
  { icon: ClipboardList, number: '01', title: 'Tiếp Nhận', desc: 'Tiếp nhận yêu cầu và tư vấn giải pháp phù hợp' },
  { icon: MapPin, number: '02', title: 'Khảo Sát', desc: 'Khảo sát thực tế, đo đạc và đánh giá công trình' },
  { icon: Calculator, number: '03', title: 'Báo Giá', desc: 'Lập báo giá chi tiết, minh bạch, hợp lý' },
  { icon: Hammer, number: '04', title: 'Thi Công', desc: 'Thi công chuyên nghiệp, đúng tiến độ cam kết' },
  { icon: CheckCircle2, number: '05', title: 'Bàn Giao', desc: 'Bàn giao & bảo hành dài hạn' },
];

export default function Process() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.3 }
    );

    if (timelineRef.current) observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section process-section" id="process">
      <div className="container">
        <div className="section-header-redesign">
          <span className="subtitle-orange">QUY TRÌNH THI CÔNG</span>
          <div className="title-row">
            <h2 className="main-title-blue">Quy Trình <span>5 Bước</span> Chuyên Nghiệp</h2>
            <div className="title-line-striped"></div>
          </div>
          <p className="section-desc" style={{ marginTop: '24px' }}>
            Quy trình làm việc khoa học, minh bạch, đảm bảo chất lượng 
            và tiến độ cho mọi công trình.
          </p>
        </div>

        <div className="process-timeline" ref={timelineRef}>
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div className="process-step" key={step.number}>
                <div className="process-step-number">{step.number}</div>
                <div className="process-step-icon">
                  <Icon style={{ width: 18, height: 18 }} />
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
