'use client';
import { useState, useMemo } from 'react';
import { categories } from '@/data/categories';

/* ── Mock Data ── */
const MOCK_SUBMISSIONS = [
  { id: 1, name: 'Nguyễn Văn An',   phone: '0901 234 567', service: 'nhom-kinh',   message: 'Cần thi công cửa nhôm kính Xingfa 4 cánh cho nhà mặt tiền.', time: '2026-07-01T08:15:00', status: 'new' },
  { id: 2, name: 'Trần Thị Bảo',    phone: '0912 345 678', service: 'cua-sat',     message: 'Báo giá cổng sắt mỹ nghệ cho nhà phố 2 tầng, cao khoảng 2.5m.', time: '2026-07-01T09:42:00', status: 'contacted' },
  { id: 3, name: 'Lê Minh Cường',   phone: '0923 456 789', service: 'mai-poly',   message: 'Cần mái che sân thượng poly lấy sáng khoảng 20m².', time: '2026-06-30T14:05:00', status: 'new' },
  { id: 4, name: 'Phạm Thu Dung',   phone: '0934 567 890', service: 'mai-ton',    message: 'Muốn làm nhà tiền chế 3 gian, báo giá trọn gói.', time: '2026-06-30T10:30:00', status: 'done' },
  { id: 5, name: 'Hoàng Đức Em',    phone: '0945 678 901', service: 'nhom-kinh',   message: 'Vách ngăn kính cường lực văn phòng ~15m².', time: '2026-06-29T16:20:00', status: 'contacted' },
  { id: 6, name: 'Vũ Thị Phương',   phone: '0956 789 012', service: 'sua-chua-nha', message: 'Sửa chữa mái nhà bị dột, chống thấm tường ngoài.', time: '2026-06-29T08:00:00', status: 'new' },
  { id: 7, name: 'Bùi Quang Giáp',  phone: '0967 890 123', service: 'cua-sat',    message: 'Lan can cầu thang sắt nghệ thuật 2 tầng.', time: '2026-06-28T13:50:00', status: 'done' },
  { id: 8, name: 'Đỗ Hương Hà',     phone: '0978 901 234', service: 'nhom-kinh',  message: 'Cửa nhôm kính mở lùa cho phòng ngủ 1.2m x 2.2m.', time: '2026-06-28T09:10:00', status: 'contacted' },
];

const SERVICE_LABELS = {
  'nhom-kinh':    'Cửa nhôm kính & Vách kính',
  'nhomkinh':     'Cửa nhôm kính & Vách kính',
  'cua-sat':      'Cửa sắt, Hàng rào & Lan can',
  'cuasat':       'Cửa sắt, Hàng rào & Lan can',
  'mai-poly':     'Mái Poly lấy sáng',
  'maipoly':      'Mái Poly lấy sáng',
  'mai-ton':      'Mái tôn & Nhà tiền chế',
  'maiton':       'Mái tôn & Nhà tiền chế',
  'sua-chua-nha': 'Chống thấm, sửa chữa nhà',
  'suachuanha':   'Chống thấm, sửa chữa nhà',
};

const SERVICE_COLORS = {
  'nhom-kinh':    { color: '#0284c7', bg: '#f0f9ff' },
  'nhomkinh':     { color: '#0284c7', bg: '#f0f9ff' },
  'cua-sat':      { color: '#7c3aed', bg: '#faf5ff' },
  'cuasat':       { color: '#7c3aed', bg: '#faf5ff' },
  'mai-poly':     { color: '#059669', bg: '#f0fdf4' },
  'maipoly':      { color: '#059669', bg: '#f0fdf4' },
  'mai-ton':      { color: '#b45309', bg: '#fffbeb' },
  'maiton':       { color: '#b45309', bg: '#fffbeb' },
  'sua-chua-nha': { color: '#dc2626', bg: '#fff1f2' },
  'suachuanha':   { color: '#dc2626', bg: '#fff1f2' },
};

const STATUS_CONFIG = {
  new:       { label: 'Mới',         color: '#0ea5e9', bg: '#f0f9ff', dot: '#38bdf8' },
  contacted: { label: 'Đã liên hệ', color: '#d97706', bg: '#fffbeb', dot: '#fbbf24' },
  done:      { label: 'Hoàn thành', color: '#16a34a', bg: '#f0fdf4', dot: '#4ade80' },
};

/* ── Helpers ── */
function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    + ' · ' + d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
}

function getInitials(name) {
  return name.trim().split(' ').slice(-2).map(w => w[0]).join('').toUpperCase();
}

/* ── Icon components ── */
const IconDashboard = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="8" height="5" rx="1.5"/>
    <rect x="13" y="3" width="8" height="9" rx="1.5"/>
    <rect x="3" y="11" width="8" height="10" rx="1.5"/>
    <rect x="13" y="15" width="8" height="6" rx="1.5"/>
  </svg>
);

const IconClipboard = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="1"/>
    <line x1="9" y1="12" x2="15" y2="12"/>
    <line x1="9" y1="16" x2="13" y2="16"/>
  </svg>
);

const IconLayers = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);

const IconSettings = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

/* ── Nav items ── */
const NAV = [
  { id: 'dashboard',   label: 'Tổng quan',       icon: <IconDashboard /> },
  { id: 'submissions', label: 'Yêu cầu báo giá', icon: <IconClipboard /> },
  { id: 'products',    label: 'Sản phẩm',         icon: <IconLayers />    },
  { id: 'settings',    label: 'Cài đặt website',  icon: <IconSettings />  },
];

/* ═══════════════════════════════════════════════
   MAIN DASHBOARD
═══════════════════════════════════════════════ */
export default function AdminDashboard() {
  const [activeTab, setActiveTab]         = useState('dashboard');
  const [mobileSidebarOpen, setMobileOpen] = useState(false);
  const [submissions, setSubmissions]     = useState(MOCK_SUBMISSIONS);
  const [products, setProducts]           = useState(() =>
    categories.flatMap(cat =>
      cat.items.map(item => ({ ...item, category: cat.id, categoryName: cat.name, active: true }))
    )
  );
  const [filterStatus, setFilterStatus]   = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [filterCat, setFilterCat]         = useState('all');
  const [searchQuery, setSearchQuery]     = useState('');
  const [selectedSub, setSelectedSub]     = useState(null);
  const [editProduct, setEditProduct]     = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [siteSettings, setSiteSettings] = useState({
    companyName: 'CÔNG TY TNHH SẢN XUẤT VÀ THƯƠNG MẠI ĐỨC GIÁP',
    taxCode: '0909.123.456',
    address: 'Đường Liễu Hạnh Công Chúa, TDP Hà Thôn, Phường Đồng Hới, Tỉnh Quảng Trị',
    hotline: '0839.652.962',
    hotlinePerson: 'Anh Giáp',
    email: 'contact@dgcokhi.vn',
    workingHours: 'Thứ 2 – Chủ nhật: 7:00 – 18:00',
    slogan: 'Đức Giáp - Cơ Khí Nhôm Kính | Thiết Kế & Thi Công Chuyên Nghiệp'
  });

  /* ── Stats ── */
  const stats = useMemo(() => ({
    total:    submissions.length,
    new:      submissions.filter(s => s.status === 'new').length,
    contacted:submissions.filter(s => s.status === 'contacted').length,
    done:     submissions.filter(s => s.status === 'done').length,
    products: products.length,
    active:   products.filter(p => p.active).length,
  }), [submissions, products]);

  /* ── Filtered ── */
  const filteredSubs = useMemo(() => submissions.filter(s => {
    const q = searchQuery.toLowerCase();
    return (filterStatus === 'all' || s.status === filterStatus)
      && (filterService === 'all' || s.service === filterService)
      && (!q || s.name.toLowerCase().includes(q) || s.phone.includes(q) || s.message.toLowerCase().includes(q));
  }), [submissions, filterStatus, filterService, searchQuery]);

  const filteredProds = useMemo(() => products.filter(p => {
    const q = searchQuery.toLowerCase();
    return (filterCat === 'all' || p.category === filterCat)
      && (!q || p.title.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q));
  }), [products, filterCat, searchQuery]);

  /* ── Actions ── */
  const changeStatus = (id, status) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    setSelectedSub(prev => prev?.id === id ? { ...prev, status } : prev);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery('');
    setSelectedSub(null);
    setMobileOpen(false);
  };

  /* ─────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────── */
  return (
    <div className="dg-admin">

      {/* ── Mobile overlay ── */}
      {mobileSidebarOpen && (
        <div className="dg-overlay" onClick={() => setMobileOpen(false)} />
      )}

      {/* ══════════ SIDEBAR ══════════ */}
      <aside className={`dg-sidebar ${mobileSidebarOpen ? 'open' : ''}`}>
        {/* Brand */}
        <div className="dg-brand">
          <div className="dg-brand-icon" style={{ background: '#fff', padding: '4px' }}>
            <img src="/images/logo.png" alt="Đức Giáp Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div>
            <p className="dg-brand-name">Đức Giáp</p>
            <p className="dg-brand-sub">Admin Panel</p>
          </div>
          <button className="dg-sidebar-close" onClick={() => setMobileOpen(false)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Section label */}
        <p className="dg-nav-label">MENU CHÍNH</p>

        {/* Nav */}
        <nav className="dg-nav">
          {NAV.map(item => (
            <button
              key={item.id}
              className={`dg-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleTabChange(item.id)}
            >
              <span className="dg-nav-icon">{item.icon}</span>
              {item.label}
              {item.id === 'submissions' && stats.new > 0 && (
                <span className="dg-nav-badge">{stats.new}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="dg-sidebar-footer">
          <a href="/" target="_blank" className="dg-footer-link">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6"/>
              <path d="M10 14 21 3"/>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            </svg>
            Xem trang web
          </a>
        </div>
      </aside>

      {/* ══════════ MAIN ══════════ */}
      <div className="dg-main">

        {/* ── Header ── */}
        <header className="dg-header">
          <div className="dg-header-left">
            <button className="dg-hamburger" onClick={() => setMobileOpen(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="5" y1="8" x2="19" y2="8"/>
                <line x1="5" y1="12" x2="14" y2="12"/>
                <line x1="5" y1="16" x2="19" y2="16"/>
              </svg>
            </button>
            <h1 className="dg-header-title">
              {NAV.find(n => n.id === activeTab)?.label ?? 'Admin'}
            </h1>
          </div>
          <div className="dg-header-right">
            <a href="/" target="_blank" className="dg-header-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6"/><path d="M10 14 21 3"/>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              </svg>
              <span>Trang web</span>
            </a>
            <div className="dg-header-user">
              <span>Admin</span>
            </div>
          </div>
        </header>

        {/* ══════════ DASHBOARD TAB ══════════ */}
        {activeTab === 'dashboard' && (
          <div className="dg-page">
            {/* Stat cards */}
            <div className="dg-stats-grid">
              <StatCard label="Yêu cầu mới" value={stats.new}       accent="#0284c7" sub="Chờ liên hệ hôm nay"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    <line x1="9" y1="10" x2="15" y2="10"/>
                    <line x1="12" y1="7" x2="12" y2="13"/>
                  </svg>
                }
              />
              <StatCard label="Đã liên hệ" value={stats.contacted}  accent="#c2410c" sub="Đang xử lý"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    <polyline points="16 2 20 6 16 10" />
                    <line x1="20" y1="6" x2="13" y2="6" />
                  </svg>
                }
              />
              <StatCard label="Hoàn thành" value={stats.done}       accent="#15803d" sub="Đã xử lý xong"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                }
              />
              <StatCard label="Sản phẩm" value={stats.active}       accent="#007F78" sub={`/${stats.products} tổng cộng`}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2"/>
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                    <line x1="12" y1="12" x2="12" y2="17"/>
                    <line x1="9" y1="14.5" x2="15" y2="14.5"/>
                  </svg>
                }
              />
            </div>

            {/* Recent section */}
            <div className="dg-section-header">
              <h2 className="dg-section-title">Yêu cầu mới nhất</h2>
              <button className="dg-link-btn" onClick={() => handleTabChange('submissions')}>Xem tất cả →</button>
            </div>
            <div className="dg-card">
              <SubmissionRows
                submissions={submissions.slice(0, 6)}
                onSelect={setSelectedSub}
                onStatusChange={changeStatus}
                compact
              />
            </div>
          </div>
        )}

        {/* ══════════ SUBMISSIONS TAB ══════════ */}
        {activeTab === 'submissions' && (
          <div className="dg-page">
            {/* Toolbar */}
            <div className="dg-toolbar-row">
              <div className="dg-search-wrap">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input className="dg-search" placeholder="Tên, SĐT, nội dung..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <select className="dg-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="all">Tất cả trạng thái</option>
                <option value="new">Mới</option>
                <option value="contacted">Đã liên hệ</option>
                <option value="done">Hoàn thành</option>
              </select>
              <select className="dg-select" value={filterService} onChange={e => setFilterService(e.target.value)}>
                <option value="all">Tất cả dịch vụ</option>
                {Object.entries(SERVICE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>

            <div className="dg-split">
              {/* List panel */}
              <div className="dg-list-panel">
                <p className="dg-count-label">{filteredSubs.length} yêu cầu</p>
                <div className="dg-card">
                  <SubmissionRows
                    submissions={filteredSubs}
                    onSelect={setSelectedSub}
                    onStatusChange={changeStatus}
                    selectedId={selectedSub?.id}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════ PRODUCTS TAB ══════════ */}
        {activeTab === 'products' && (
          <div className="dg-page">
            {/* Toolbar */}
            <div className="dg-toolbar-row">
              <div className="dg-search-wrap">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input className="dg-search" placeholder="Tìm sản phẩm..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <select className="dg-select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
                <option value="all">Tất cả danh mục</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
              <button className="dg-add-btn" onClick={() => setShowAddProduct(true)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Thêm sản phẩm
              </button>
            </div>

            <p className="dg-count-label">{filteredProds.length} sản phẩm</p>

            <div className="dg-product-grid">
              {filteredProds.map(product => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  onEdit={() => setEditProduct(product)}
                  onToggle={() => setProducts(prev => prev.map(p => p.slug === product.slug ? { ...p, active: !p.active } : p))}
                  onDelete={() => {
                    if (window.confirm('Xoá sản phẩm này?'))
                      setProducts(prev => prev.filter(p => p.slug !== product.slug));
                  }}
                />
              ))}
              {filteredProds.length === 0 && (
                <div className="dg-empty">Không tìm thấy sản phẩm nào</div>
              )}
            </div>

            {showAddProduct && (
              <ProductModal
                title="Thêm Sản Phẩm Mới"
                onClose={() => setShowAddProduct(false)}
                onSave={data => {
                  const cat = categories.find(c => c.id === data.category);
                  setProducts(prev => [{
                    ...data,
                    slug: data.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-'),
                    categoryName: cat?.name || '',
                    active: true,
                    specs: {},
                  }, ...prev]);
                  setShowAddProduct(false);
                }}
              />
            )}

            {editProduct && (
              <ProductModal
                title="Sửa Sản Phẩm"
                product={editProduct}
                onClose={() => setEditProduct(null)}
                onSave={data => {
                  const cat = categories.find(c => c.id === data.category);
                  setProducts(prev => prev.map(p =>
                    p.slug === editProduct.slug ? { ...p, ...data, categoryName: cat?.name || p.categoryName } : p
                  ));
                  setEditProduct(null);
                }}
              />
            )}
          </div>
        )}

        {/* ══════════ SETTINGS TAB ══════════ */}
        {activeTab === 'settings' && (
          <div className="dg-page">
            <div className="dg-card" style={{ padding: '24px', maxWidth: '640px' }}>
              <div style={{ marginBottom: '20px', borderBottom: '1px solid var(--dg-border)', paddingBottom: '12px' }}>
                <h2 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--dg-t1)', margin: 0 }}>Cấu hình thông tin Website</h2>
                <p style={{ fontSize: '11px', color: 'var(--dg-t3)', marginTop: '4px' }}>Cập nhật các thông tin liên hệ và giới thiệu chung hiển thị ngoài trang Landing Page</p>
              </div>

              <form onSubmit={e => { e.preventDefault(); alert('Cập nhật cấu hình website thành công!'); }} className="dg-modal-body" style={{ padding: 0, gap: '16px' }}>
                <div className="dg-field">
                  <label>Tên doanh nghiệp / Xưởng</label>
                  <input value={siteSettings.companyName} onChange={e => setSiteSettings({...siteSettings, companyName: e.target.value})} />
                </div>
                
                <div className="dg-field-row">
                  <div className="dg-field">
                    <label>Mã số thuế</label>
                    <input value={siteSettings.taxCode} onChange={e => setSiteSettings({...siteSettings, taxCode: e.target.value})} />
                  </div>
                  <div className="dg-field">
                    <label>Hotline tư vấn</label>
                    <input value={siteSettings.hotline} onChange={e => setSiteSettings({...siteSettings, hotline: e.target.value})} />
                  </div>
                </div>

                <div className="dg-field-row">
                  <div className="dg-field">
                    <label>Người trực hotline</label>
                    <input value={siteSettings.hotlinePerson} onChange={e => setSiteSettings({...siteSettings, hotlinePerson: e.target.value})} />
                  </div>
                  <div className="dg-field">
                    <label>Email liên hệ</label>
                    <input value={siteSettings.email} onChange={e => setSiteSettings({...siteSettings, email: e.target.value})} />
                  </div>
                </div>

                <div className="dg-field">
                  <label>Trụ sở chính</label>
                  <input value={siteSettings.address} onChange={e => setSiteSettings({...siteSettings, address: e.target.value})} />
                </div>

                <div className="dg-field">
                  <label>Giờ làm việc</label>
                  <input value={siteSettings.workingHours} onChange={e => setSiteSettings({...siteSettings, workingHours: e.target.value})} />
                </div>

                <div className="dg-field">
                  <label>Slogan trang chủ</label>
                  <textarea rows={2} value={siteSettings.slogan} onChange={e => setSiteSettings({...siteSettings, slogan: e.target.value})} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--dg-border)', paddingTop: '16px', marginTop: '8px' }}>
                  <button type="submit" className="dg-btn-save">Lưu cấu hình</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* ── Detail Modal Overlay ── */}
      {selectedSub && (
        <div className="dg-modal-overlay" onClick={() => setSelectedSub(null)}>
          <div className="dg-modal" onClick={e => e.stopPropagation()}>
            <div className="dg-modal-head">
              <span className="dg-modal-title">Chi tiết yêu cầu</span>
              <button className="dg-close-btn" onClick={() => setSelectedSub(null)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="dg-modal-body" style={{ padding: '20px 24px 24px' }}>
              {/* Customer info */}
              <div className="dg-detail-customer" style={{ padding: '0 0 16px 0' }}>
                <div>
                  <p className="dg-detail-name">{selectedSub.name}</p>
                  <p className="dg-detail-phone">{selectedSub.phone}</p>
                </div>
              </div>

              {/* Meta */}
              <div className="dg-detail-meta" style={{ margin: '14px 0 0 0' }}>
                <div className="dg-meta-row">
                  <span className="dg-meta-key">Thời gian</span>
                  <span className="dg-meta-val">{formatTime(selectedSub.time)}</span>
                </div>
                <div className="dg-meta-row">
                  <span className="dg-meta-key">Dịch vụ</span>
                  <ServiceTag service={selectedSub.service} />
                </div>
                <div className="dg-meta-row">
                  <span className="dg-meta-key">Trạng thái</span>
                  <StatusDot status={selectedSub.status} />
                </div>
              </div>

              {/* Message */}
              <div className="dg-detail-message" style={{ margin: '14px 0 0 0' }}>
                <p className="dg-meta-key" style={{ marginBottom: '8px' }}>Nội dung</p>
                <p>{selectedSub.message}</p>
              </div>

              {/* Status change */}
              <div className="dg-status-change" style={{ padding: '14px 0 0 0', marginTop: '14px', borderTop: '1px solid var(--dg-border2)' }}>
                <p className="dg-meta-key" style={{ marginBottom: '8px' }}>Cập nhật trạng thái</p>
                <div className="dg-status-btns">
                  {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                    <button
                      key={key}
                      className={`dg-status-btn ${selectedSub.status === key ? 'active' : ''}`}
                      style={{ '--sc': cfg.color, '--sb': cfg.bg }}
                      onClick={() => changeStatus(selectedSub.id, key)}
                    >
                      {cfg.label}
                    </button>
                  ))}
                </div>
                <a href={`tel:${selectedSub.phone.replace(/\s/g, '')}`} className="dg-call-btn" style={{ marginTop: '10px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg>
                  Gọi {selectedSub.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════════
   STAT CARD
═══════════════════════════════════════════════ */
function StatCard({ label, value, accent, sub, icon }) {
  return (
    <div className="dg-stat-card" style={{ '--accent': accent }}>
      <div className="dg-stat-strip" />
      <div className="dg-stat-body">
        <div className="dg-stat-icon">{icon}</div>
        <div>
          <p className="dg-stat-label">{label}</p>
          <p className="dg-stat-value" style={{ color: accent }}>{String(value).padStart(2, '0')}</p>
          <p className="dg-stat-sub">{sub}</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SERVICE TAG
═══════════════════════════════════════════════ */
function ServiceTag({ service }) {
  const cfg = SERVICE_COLORS[service] || { color: '#64748b', bg: '#f1f5f9' };
  return (
    <span className="dg-service-tag" style={{ color: cfg.color, background: cfg.bg }}>
      {SERVICE_LABELS[service] || service}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   STATUS DOT
═══════════════════════════════════════════════ */
function StatusDot({ status }) {
  const cfg = STATUS_CONFIG[status] || { label: status, color: '#888', bg: '#f0f0f0', dot: '#888' };
  return (
    <span className="dg-status-dot" style={{ color: cfg.color, background: cfg.bg }}>
      <span style={{ background: cfg.dot, width: '6px', height: '6px', borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />
      {cfg.label}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   SUBMISSION ROWS
═══════════════════════════════════════════════ */
function SubmissionRows({ submissions, onSelect, onStatusChange, selectedId, compact }) {
  if (submissions.length === 0) {
    return <div className="dg-table-empty">Không có yêu cầu nào</div>;
  }
  return (
    <table className="dg-table">
      <thead>
        <tr>
          <th>Khách hàng</th>
          <th>Dịch vụ</th>
          {!compact && <th>Nội dung</th>}
          <th>Thời gian</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map(s => (
          <tr
            key={s.id}
            className={`dg-tr ${selectedId === s.id ? 'selected' : ''} ${s.status === 'new' ? 'is-new' : ''}`}
            onClick={() => onSelect(s)}
          >
            <td>
              <div className="dg-cell-person">
                <div>
                  <p className="dg-cell-name">{s.name}</p>
                  <p className="dg-cell-phone">{s.phone}</p>
                </div>
              </div>
            </td>
            <td><ServiceTag service={s.service} /></td>
            {!compact && <td className="dg-cell-msg">{s.message}</td>}
            <td className="dg-cell-time">{formatTime(s.time)}</td>
            <td><StatusDot status={s.status} /></td>
            <td onClick={e => e.stopPropagation()}>
              <select
                className="dg-select sm"
                value={s.status}
                onChange={e => onStatusChange(s.id, e.target.value)}
              >
                {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ═══════════════════════════════════════════════
   PRODUCT CARD
═══════════════════════════════════════════════ */
function ProductCard({ product, onEdit, onToggle, onDelete }) {
  return (
    <div className={`dg-prod-card ${!product.active ? 'hidden-prod' : ''}`}>
      {product.active && <div className="dg-prod-strip" />}
      <div className="dg-prod-img">
        <img src={product.image} alt={product.title} loading="lazy" />
        <div className="dg-prod-overlay">
          <button className="dg-prod-act" onClick={onEdit}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Sửa
          </button>
          <button className="dg-prod-act danger" onClick={onDelete}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
            Xoá
          </button>
        </div>
        {!product.active && <span className="dg-prod-hidden-tag">Đã ẩn</span>}
      </div>
      <div className="dg-prod-body">
        <p className="dg-prod-cat">{product.categoryName}</p>
        <p className="dg-prod-title">{product.title}</p>
        
        {/* Render Specs list inside card for details review */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed var(--dg-border)' }}>
            {Object.entries(product.specs).slice(0, 4).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--dg-t3)' }}>
                <span style={{ fontWeight: '600' }}>{k}:</span>
                <span style={{ textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '110px' }} title={v}>{v}</span>
              </div>
            ))}
            {Object.keys(product.specs).length > 4 && (
              <span style={{ fontSize: '9px', color: 'var(--dg-t4)', fontStyle: 'italic', marginTop: '2px' }}>
                +{Object.keys(product.specs).length - 4} thông số khác
              </span>
            )}
          </div>
        )}

        <div className="dg-prod-footer" style={{ marginTop: '12px' }}>
          <span className="dg-prod-price">{product.price}</span>
          <label className="dg-toggle" title={product.active ? 'Ẩn' : 'Hiện'}>
            <input type="checkbox" checked={product.active} onChange={onToggle} />
            <span className="dg-toggle-track"><span className="dg-toggle-thumb" /></span>
          </label>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PRODUCT MODAL
═══════════════════════════════════════════════ */
function ProductModal({ title, product, onClose, onSave }) {
  const [form, setForm] = useState({
    title: product?.title || '',
    category: product?.category || categories[0]?.id || '',
    price: product?.price || 'Liên hệ',
    image: product?.image || '',
    description: product?.description || '',
  });

  const [specs, setSpecs] = useState(() =>
    Object.entries(product?.specs || {}).map(([key, value]) => ({ key, value }))
  );

  const set = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

  const handleSpecChange = (index, field, val) => {
    setSpecs(prev => prev.map((s, i) => i === index ? { ...s, [field]: val } : s));
  };
  const handleAddSpec = () => {
    setSpecs(prev => [...prev, { key: '', value: '' }]);
  };
  const handleRemoveSpec = (index) => {
    setSpecs(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const specsObj = {};
    specs.forEach(s => {
      if (s.key.trim()) {
        specsObj[s.key.trim()] = s.value.trim();
      }
    });
    onSave({ ...form, specs: specsObj });
  };

  return (
    <div className="dg-modal-overlay" onClick={onClose}>
      <div className="dg-modal" onClick={e => e.stopPropagation()}>
        <div className="dg-modal-head">
          <div>
            <h3 className="dg-modal-title">{title}</h3>
            <p className="dg-modal-sub">{product ? `Đang sửa: ${product.title}` : 'Điền thông tin sản phẩm mới'}</p>
          </div>
          <button className="dg-close-btn" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="dg-modal-body">
          <div className="dg-field">
            <label>Tên sản phẩm *</label>
            <input required value={form.title} onChange={e => set('title', e.target.value)} placeholder="VD: Cửa nhôm kính Xingfa 4 cánh..." />
          </div>
          <div className="dg-field-row">
            <div className="dg-field">
              <label>Danh mục *</label>
              <select required value={form.category} onChange={e => set('category', e.target.value)}>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>
            <div className="dg-field">
              <label>Giá</label>
              <input value={form.price} onChange={e => set('price', e.target.value)} placeholder="Liên hệ / 2.500.000đ" />
            </div>
          </div>
          <div className="dg-field">
            <label>URL Hình ảnh</label>
            <input value={form.image} onChange={e => set('image', e.target.value)} placeholder="/images/ten-anh.jpg" />
          </div>
          <div className="dg-field">
            <label>Mô tả sản phẩm</label>
            <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Mô tả chi tiết..." />
          </div>

          <div className="dg-field">
            <label>Thông số kỹ thuật chi tiết</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
              {specs.map((spec, index) => (
                <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    required
                    style={{ flex: 1, padding: '7px 10px', fontSize: '12px' }}
                    placeholder="Tên (VD: Chất liệu)"
                    value={spec.key}
                    onChange={e => handleSpecChange(index, 'key', e.target.value)}
                  />
                  <input
                    required
                    style={{ flex: 1, padding: '7px 10px', fontSize: '12px' }}
                    placeholder="Giá trị (VD: Nhôm Xingfa)"
                    value={spec.value}
                    onChange={e => handleSpecChange(index, 'value', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(index)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      border: '1px solid var(--dg-border)',
                      background: 'none',
                      color: '#ef4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSpec}
                style={{
                  alignSelf: 'flex-start',
                  background: 'none',
                  border: 'none',
                  color: 'var(--dg-teal)',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  padding: '4px 0'
                }}
              >
                + Thêm thông số mới
              </button>
            </div>
          </div>

          <div className="dg-modal-footer">
            <button type="button" className="dg-btn-cancel" onClick={onClose}>Huỷ</button>
            <button type="submit" className="dg-btn-save">Lưu sản phẩm</button>
          </div>
        </form>
      </div>
    </div>
  );
}
