'use client';
import { useScrollReveal } from './ScrollReveal';
import { Hammer, Scale, Calendar, CheckSquare } from 'lucide-react';

const projects = [
  {
    title: 'Hệ thống cửa nhôm Xingfa & Vách kính mặt dựng',
    location: 'Tòa nhà văn phòng Đông Hà, Quảng Trị',
    image: '/images/news-1.jpg',
    specs: [
      { label: 'Hệ nhôm', value: 'Xingfa Quảng Đông dày 2.0mm' },
      { label: 'Loại kính', value: 'Kính dán an toàn 2 lớp 10.38mm' },
      { label: 'Diện tích', value: '380 m²' },
      { label: 'Thời gian', value: 'Tháng 05/2026' }
    ]
  },
  {
    title: 'Mái che lấy sáng thông minh khung thép hộp',
    location: 'Biệt thự sân vườn KĐT Nam Đông Hà',
    image: '/images/service-maipoly.jpg',
    specs: [
      { label: 'Tấm lợp', value: 'Poly đặc SolarLite dày 4.8mm' },
      { label: 'Kết cấu đỡ', value: 'Thép hộp Hòa Phát 50x100x2.0mm' },
      { label: 'Sơn phủ', value: 'Sơn Epoxy 3 lớp chống ăn mòn' },
      { label: 'Thời gian', value: 'Tháng 04/2026' }
    ]
  },
  {
    title: 'Nhà thép tiền chế & Mái tôn nhà xưởng',
    location: 'Cơ sở gia công KCN Quán Ngang, Quảng Trị',
    image: '/images/news-2.jpg',
    specs: [
      { label: 'Khung cột', value: 'Thép hình H200, kèo thép tổ hợp' },
      { label: 'Tấm lợp', value: 'Tôn mát 3 lớp chống nóng Hoa Sen' },
      { label: 'Quy mô', value: 'Gia công lắp dựng 1.200 m²' },
      { label: 'Thời gian', value: 'Tháng 03/2026' }
    ]
  },
  {
    title: 'Cổng sắt hộp mỹ thuật uốn nghệ thuật',
    location: 'Nhà phố liền kề Phường 5, TP. Đông Hà',
    image: '/images/service-cuasat.jpg',
    specs: [
      { label: 'Vật liệu', value: 'Sắt đặc uốn rèn nghệ thuật thủ công' },
      { label: 'Bản lề', value: 'Bản lề cối tự động xoay chịu lực' },
      { label: 'Màu sơn', value: 'Sơn nhũ đồng giả cổ cao cấp' },
      { label: 'Thời gian', value: 'Tháng 02/2026' }
    ]
  }
];

export default function Projects() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section projects-section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="section-header-redesign reveal">
          <span className="subtitle-orange">CÔNG TRÌNH THỰC TẾ</span>
          <div className="title-row">
            <h2 className="main-title-blue">Dự Án <span>Đã Hoàn Thành</span> Tiêu Biểu</h2>
            <div className="title-line-striped"></div>
          </div>
          <p className="section-desc" style={{ marginTop: '24px' }}>
            Tổng hợp hình ảnh và thông số kỹ thuật thực tế từ các công trình cơ khí, 
            nhôm kính do đội ngũ Đức Giáp trực tiếp chế tạo và lắp đặt.
          </p>
        </div>

        {/* Asymmetric layout grid */}
        <div className="projects-layout-grid stagger-children">
          {projects.map((project, index) => (
            <div 
              className={`project-show-card reveal ${index % 2 === 1 ? 'project-card-shifted' : ''}`} 
              key={project.title}
            >
              <div className="project-img-container">
                <img src={project.image} alt={project.title} />
                <div className="project-badge-tag">
                  <CheckSquare style={{ width: 14, height: 14 }} />
                  Đã Nghiệm Thu
                </div>
              </div>
              
              <div className="project-details-wrap">
                <span className="project-location-label">{project.location}</span>
                <h3 className="project-title-name">{project.title}</h3>
                
                {/* Tech Specs Block */}
                <div className="project-tech-specs">
                  {project.specs.map((spec) => (
                    <div className="tech-spec-row" key={spec.label}>
                      <span className="tech-spec-label">{spec.label}:</span>
                      <span className="tech-spec-val">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
