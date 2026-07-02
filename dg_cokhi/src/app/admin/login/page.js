'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Giả lập kiểm tra đăng nhập (Tài khoản mẫu: admin / admin123)
    setTimeout(() => {
      if (username.trim() === 'admin' && password === 'admin123') {
        localStorage.setItem('dg_admin_logged', 'true');
        router.push('/admin');
      } else {
        setError('Tài khoản hoặc mật khẩu không chính xác!');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="dg-login-page">
      <div className="dg-login-bg-decor1"></div>
      <div className="dg-login-bg-decor2"></div>

      <div className="dg-login-card">
        {/* Brand/Logo */}
        <div className="dg-login-brand">
          <div className="dg-login-logo">
            <img src="/images/logo.png" alt="Đức Giáp Logo" />
          </div>
          <h2>CƠ KHÍ ĐỨC GIÁP</h2>
          <p>Hệ thống quản trị website</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="dg-login-form">
          {error && (
            <div className="dg-login-error">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span>{error}</span>
            </div>
          )}

          <div className="dg-login-field">
            <label htmlFor="username">Tên đăng nhập</label>
            <div className="dg-login-input-wrap">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input
                id="username"
                type="text"
                required
                placeholder="Nhập tài khoản quản trị"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="dg-login-field">
            <label htmlFor="password">Mật khẩu</label>
            <div className="dg-login-input-wrap">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input
                id="password"
                type="password"
                required
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="dg-login-btn">
            {loading ? (
              <span className="dg-login-spinner"></span>
            ) : (
              'Đăng nhập hệ thống'
            )}
          </button>
        </form>

        {/* Demo credentials hint */}
        <div className="dg-login-hint">
          <p><strong>Tài khoản mẫu:</strong> <code>admin</code></p>
          <p><strong>Mật khẩu mẫu:</strong> <code>admin123</code></p>
        </div>
      </div>
    </div>
  );
}
