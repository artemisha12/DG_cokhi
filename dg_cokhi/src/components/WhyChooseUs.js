'use client';
import { Award, Sparkles, Users, Lightbulb, CircleDollarSign, HeartHandshake } from 'lucide-react';
import { useScrollReveal } from './ScrollReveal';

const reasons = [
  { icon: Award, title: 'Kinh Nghiệm Dày Dặn', desc: 'Hơn 10 năm hoạt động trong lĩnh vực cơ khí, nhôm kính với hàng trăm dự án lớn nhỏ.' },
  { icon: Sparkles, title: 'Chất Lượng Hàng Đầu', desc: 'Sử dụng nguyên vật liệu cao cấp, quy trình sản xuất theo tiêu chuẩn khắt khe.' },
  { icon: Users, title: 'Đội Ngũ Chuyên Nghiệp', desc: 'Kỹ sư giàu kinh nghiệm, công nhân tay nghề cao, đào tạo bài bản.' },
  { icon: Lightbulb, title: 'Giải Pháp Toàn Diện', desc: 'Đáp ứng mọi nhu cầu từ nhà ở đến công trình công nghiệp quy mô lớn.' },
  { icon: CircleDollarSign, title: 'Chi Phí Hợp Lý', desc: 'Tối ưu quy trình sản xuất, mang đến mức giá cạnh tranh nhất thị trường.' },
  { icon: HeartHandshake, title: 'Dịch Vụ Tận Tâm', desc: 'Luôn đặt khách hàng làm trung tâm, hỗ trợ nhanh chóng, bảo hành chu đáo.' },
];

export default function WhyChooseUs() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section why-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header-redesign reveal">
          <span className="subtitle-orange">NĂNG LỰC THỰC TẾ</span>
          <div className="title-row">
            <h2 className="main-title-blue"><span>6 Lý Do</span> Khách Hàng Tin Tưởng</h2>
            <div className="title-line-striped"></div>
          </div>
          <p className="section-desc" style={{ marginTop: '24px', color: 'rgba(255, 255, 255, 0.8)' }}>
            Chúng tôi tự hào là đơn vị uy tín hàng đầu trong lĩnh vực cơ khí, nhôm kính 
            với cam kết mang đến giá trị bền vững cho mọi công trình.
          </p>
        </div>

        <div className="why-grid stagger-children">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div className="why-card reveal" key={reason.title}>
                <div className="why-card-icon">
                  <Icon style={{ width: 28, height: 28 }} />
                </div>
                <h4>{reason.title}</h4>
                <p>{reason.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
