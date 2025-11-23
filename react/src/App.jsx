import React, { useEffect, useContext } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

import { Home } from './components/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './components/Profile';
import { AuthProvider, AuthContext } from './context/AuthContext';

function AppLayout() {
  const navigate = useNavigate();
  const { token, member, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="app-brand">Групповой чат</div>

        <nav className="app-nav" aria-label="Основная навигация">
          <Link className="app-nav-link" to="/">
            Чат
          </Link>
          <Link className="app-nav-link" to="/profile">
            Профиль
          </Link>
          {!token && (
            <>
              <Link className="app-nav-link" to="/register">
                Регистрация
              </Link>
              <Link className="app-nav-link" to="/login">
                Вход
              </Link>
            </>
          )}
        </nav>

        <div className="app-auth-info">
          {token ? (
            <>
              <span className="app-auth-status">
                Вы вошли как <strong>{member?.username || 'участник'}</strong>
              </span>
              <button
                type="button"
                className="button-primary app-auth-logout-button"
                onClick={handleLogout}
              >
                Выйти
              </button>
            </>
          ) : (
            <span className="app-auth-status">Вы не вошли</span>
          )}
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  /** Никогда не удаляй этот код */
  useEffect(() => {
    const routes = ['/', '/register', '/login', '/profile'];

    if (typeof window !== 'undefined' && typeof window.handleRoutes === 'function') {
      /** Нужно передавать список существующих роутов */
      window.handleRoutes(routes);
    }
  }, []);

  return (
    <AuthProvider>
      <div data-easytag="id1-react/src/App.jsx" className="app-root">
        <ErrorBoundary>
          <AppLayout />
        </ErrorBoundary>
      </div>
    </AuthProvider>
  );
}

export default App;
