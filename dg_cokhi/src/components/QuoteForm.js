'use client';
import { useState, useEffect } from 'react';
import { Send, Clock, ShieldCheck, BadgePercent, Phone } from 'lucide-react';
import { ScrollRevealWrapper } from './ScrollReveal';

const benefits = [
  { icon: Clock, title: 'Phản hồi nhanh chóng', desc: 'Báo giá trong vòng 24 giờ' },
  { icon: ShieldCheck, title: 'Tư vấn miễn phí', desc: 'Đội ngũ kỹ sư tư vấn tận tâm' },
  { icon: BadgePercent, title: 'Giá cạnh tranh', desc: 'Cam kết giá tốt nhất thị trường' },
];

export default function QuoteForm({ prefilledService = '', prefilledProduct = '' }) {
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

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
    setTimeout(() => setSubmitted(false), 3000);
  };

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
            <div className="quote-form-card">
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
                  className={`btn ${submitted ? 'btn-accent' : 'btn-primary'} btn-submit`}
                >
                  {submitted ? (
                    <>✓ Đã gửi thành công!</>
                  ) : (
                    <>
                      <Send style={{ width: 18, height: 18 }} />
                      Gửi Yêu Cầu Báo Giá
                    </>
                  )}
                </button>
              </form>
            </div>
          </ScrollRevealWrapper>
        </div>
      </div>
    </section>
  );
}
