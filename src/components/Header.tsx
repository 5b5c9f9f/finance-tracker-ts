import { Link, useNavigate } from 'react-router-dom';
import { Wallet, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './Header.module.css';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <div className={styles.logoIcon}>
          <Wallet size={22} />
        </div>
        <span>FinFlow</span>
      </Link>

      <nav className={styles.nav}>
        {user ? (
          <>
            <Link to="/dashboard" className={styles.loginLink} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LayoutDashboard size={18} />
              Дашборд
            </Link>
            <span style={{ fontWeight: 600, color: '#0f172a' }}>{user.name}</span>
            <button
              onClick={handleLogout}
              className={styles.loginLink}
              style={{ border: '1px solid #cbd5e1', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <LogOut size={16} />
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.loginLink}>
              Войти
            </Link>
            <Link to="/register" className={styles.registerBtn}>
              Создать аккаунт
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
