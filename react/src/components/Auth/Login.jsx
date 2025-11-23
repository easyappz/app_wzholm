import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatusMessage('Авторизация пока не настроена (демо интерфейс, без запроса к серверу).');
  };

  return (
    <div
      data-easytag="id1-react/src/components/Auth/Login.jsx"
      className="page form-page"
    >
      <h1 className="page-title">Вход</h1>
      <p className="page-subtitle">
        Введите свои данные, чтобы войти в аккаунт и участвовать в чате.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="login-username">
            Имя пользователя
          </label>
          <input
            id="login-username"
            type="text"
            className="form-input"
            placeholder="Ваше имя пользователя"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="login-password">
            Пароль
          </label>
          <input
            id="login-password"
            type="password"
            className="form-input"
            placeholder="Введите пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit" className="button-primary form-submit">
          Войти
        </button>

        {statusMessage && (
          <div className="form-status">{statusMessage}</div>
        )}
      </form>
    </div>
  );
}

export default Login;
