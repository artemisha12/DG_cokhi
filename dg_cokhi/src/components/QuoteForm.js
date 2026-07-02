'use client';
import { useState, useEffect, useRef } from 'react';
import { Send, Clock, ShieldCheck, BadgePercent, Phone } from 'lucide-react';
import { ScrollRevealWrapper } from './ScrollReveal';

const benefits = [
  { icon: Clock, title: 'Phản hồi nhanh chóng', desc: 'Báo giá trong vòng 24 giờ' },
  { icon: ShieldCheck, title: 'Tư vấn miễn phí', desc: 'Đội ngũ kỹ sư tư vấn tận tâm' },
  { icon: BadgePercent, title: 'Giá cạnh tranh', desc: 'Cam kết giá tốt nhất thị trường' },
];

function triggerConfetti(canvasEl) {
  if (!canvasEl) return;
  const ctx = canvasEl.getContext('2d');
  const width = canvasEl.width = canvasEl.offsetWidth;
  const height = canvasEl.height = canvasEl.offsetHeight;

  const colors = ['#007F78', '#45C900', '#55C7C3', '#FFD700', '#FF4D4D', '#3388FF'];
  const particles = [];

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: width / 2,
      y: height / 2 - 20,
      radius: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 10 - 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      opacity: 1
    });
  }

  let animationFrame;

  function update() {
    ctx.clearRect(0, 0, width, height);

    let active = false;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3; // Gravity
      p.vx *= 0.98; // Drag
      p.rotation += p.rotationSpeed;
      
      if (p.y > height - 10) {
        p.vy = -p.vy * 0.4;
        p.vx *= 0.8;
      }

      if (p.vy > 1) {
        p.opacity -= 0.015;
      }

      if (p.opacity > 0) {
        active = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillRect(-p.radius, -p.radius * 1.5, p.radius * 2, p.radius * 3);
        ctx.restore();
      }
    });

    if (active) {
      animationFrame = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  }

  update();

  return () => {
    cancelAnimationFrame(animationFrame);
  };
}

export default function QuoteForm({ prefilledService = '', prefilledProduct = '' }) {
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(6);
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    let initialService = prefilledService;
    let initialProduct = prefilledProduct;

    if (!initialService && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get('service');
      const productParam = params.get('product');
      if (serviceParam) {
        initialService = serviceParam;
      }
      if (productParam) {
        initialProduct = productParam;
      }
    }

    // Map specific sub-services based on product keywords
    if (initialProduct) {
      const productLower = initialProduct.toLowerCase();
      if (productLower.includes('nhà tiền chế') || productLower.includes('nhà thép') || productLower.includes('mái tôn') || productLower.includes('lợp tôn')) {
        initialService = 'maiton';
      } else if (productLower.includes('poly') || productLower.includes('nhựa poly') || productLower.includes('lấy sáng')) {
        initialService = 'maipoly';
      } else if (productLower.includes('nhôm') || productLower.includes('kính') || productLower.includes('xingfa')) {
        initialService = 'nhomkinh';
      } else if (productLower.includes('sắt') || productLower.includes('cổng') || productLower.includes('hàng rào') || productLower.includes('cầu thang') || productLower.includes('lan can') || productLower.includes('khung bảo vệ') || productLower.includes('inox') || productLower.includes('không gỉ')) {
        initialService = 'cuasat';
      } else if (productLower.includes('chống thấm') || productLower.includes('sửa chữa')) {
        initialService = 'suachuanha';
      }
    }

    setService(initialService ? initialService.replace(/-/g, '') : '');
    setMessage(initialProduct ? `Tôi cần tư vấn và nhận báo giá cho sản phẩm: ${initialProduct}` : '');
  }, [prefilledService, prefilledProduct]);

  useEffect(() => {
    const handleSelectService = (e) => {
      if (e.detail) {
        setService(e.detail);
      }
    };
    window.addEventListener('select-quote-service', handleSelectService);
    return () => window.removeEventListener('select-quote-service', handleSelectService);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setCountdown(6);
  };

  useEffect(() => {
    if (!submitted) return;

    let cleanupConfetti;
    if (canvasRef.current) {
      cleanupConfetti = triggerConfetti(canvasRef.current);
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSubmitted(false);
          return 6;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      if (cleanupConfetti) cleanupConfetti();
    };
  }, [submitted]);

  return (
    <section className="section quote-section" id="contact">
      <div className="container">
        <div className="quote-grid">
          <ScrollRevealWrapper direction="left">
            <div className="quote-content">
              <h2>
                Nhận <span>Báo Giá Miễn Phí</span><br />Cho Công Trình Của Bạn
              </h2>
              <p>
                Để lại thông tin, chúng tôi sẽ liên hệ tư vấn và báo giá chi tiết 
                trong thời gian sớm nhất. Hoàn toàn miễn phí, không ràng buộc.
              </p>

              <div className="quote-benefits">
                {benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div className="quote-benefit" key={b.title}>
                      <div className="benefit-icon">
                        <Icon style={{ width: 20, height: 20 }} />
                      </div>
                      <div>
                        <h4>{b.title}</h4>
                        <p>{b.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollRevealWrapper>

          <ScrollRevealWrapper direction="right">
            <div className="quote-form-card" style={{ position: 'relative', overflow: 'hidden' }}>
              {submitted ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '48px 24px', minHeight: '380px' }}>
                  <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, borderRadius: 'var(--radius-xl)' }} />
                  
                  <div style={{ position: 'relative', zIndex: 2, marginBottom: '24px' }}>
                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" style={{ width: '80px', height: '80px', borderRadius: '50%', display: 'block', strokeWidth: '2', stroke: '#fff', strokeMiterlimit: '10', boxShadow: 'inset 0px 0px 0px #45C900', animation: 'fill .4s ease-in-out .4s forwards, scale .3s ease-in-out 0s both' }}>
                      <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" style={{ strokeDasharray: '166', strokeDashoffset: '166', strokeWidth: '3', strokeMiterlimit: '10', stroke: '#45C900', fill: 'none', animation: 'stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards' }} />
                      <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" style={{ transformOrigin: '50% 50%', strokeDasharray: '48', strokeDashoffset: '48', strokeWidth: '3', animation: 'stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards' }} />
                    </svg>
                  </div>

                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '12px', position: 'relative', zIndex: 2 }}>Gửi Yêu Cầu Thành Công!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
                    Cảm ơn bạn đã tin tưởng Cơ khí Đức Giáp.<br />
                    Chúng tôi sẽ lập tức liên hệ tư vấn và báo giá chi tiết trong vòng 24 giờ tới.
                  </p>
                  
                  <div style={{ position: 'relative', zIndex: 2, padding: '8px 16px', background: 'var(--border-light)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary)' }}>
                    Quay lại biểu mẫu sau {countdown} giây...
                  </div>

                  <style dangerouslySetInnerHTML={{__html: `
                    @keyframes stroke {
                      100% { stroke-dashoffset: 0; }
                    }
                    @keyframes scale {
                      0%, 100% { transform: none; }
                      50% { transform: scale3d(1.1, 1.1, 1); }
                    }
                    @keyframes fill {
                      100% { box-shadow: inset 0px 0px 0px 40px #45C900; }
                    }
                  `}} />
                </div>
              ) : (
                <>
                  <h3 className="quote-form-title">Yêu Cầu Báo Giá</h3>
                  <p className="quote-form-subtitle">Điền thông tin bên dưới, chúng tôi sẽ liên hệ ngay</p>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Họ và tên *</label>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Nguyễn Văn A"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Số điện thoại *</label>
                        <input
                          type="tel"
                          id="phone"
                          className="form-control"
                          placeholder="0909 123 456"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="service">Dịch vụ quan tâm *</label>
                      <select
                        id="service"
                        className="form-control"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        required
                      >
                        <option value="">-- Chọn dịch vụ --</option>
                        <option value="nhomkinh">Cửa nhôm kính & Vách kính</option>
                        <option value="maipoly">Mái Poly lấy sáng</option>
                        <option value="maiton">Mái tôn & Nhà tiền chế</option>
                        <option value="cuasat">Cửa sắt, Hàng rào & Lan can</option>
                        <option value="suachuanha">Chống thấm, sửa chữa nhà</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Mô tả yêu cầu</label>
                      <textarea
                        id="message"
                        className="form-control"
                        placeholder="Mô tả chi tiết yêu cầu công trình của bạn..."
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-submit"
                    >
                      <Send style={{ width: 18, height: 18 }} />
                      Gửi Yêu Cầu Báo Giá
                    </button>
                  </form>
                </>
              )}
            </div>
          </ScrollRevealWrapper>
        </div>
      </div>
    </section>
  );
}
