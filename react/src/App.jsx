import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

import { Home } from './components/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './components/Profile';

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
    <div data-easytag="id1-react/src/App.jsx" className="app-root">
      <ErrorBoundary>
        <div className="app-layout">
          <header className="app-header">
            <div className="app-brand">Групповой чат</div>
            <nav className="app-nav" aria-label="Основная навигация">
              <Link className="app-nav-link" to="/">
                Чат
              </Link>
              <Link className="app-nav-link" to="/register">
                Регистрация
              </Link>
              <Link className="app-nav-link" to="/login">
                Вход
              </Link>
              <Link className="app-nav-link" to="/profile">
                Профиль
              </Link>
            </nav>
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
      </ErrorBoundary>
    </div>
  );
}

export default App;
