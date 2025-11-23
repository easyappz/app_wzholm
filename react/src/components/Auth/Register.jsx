import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatusMessage('Регистрация пока не настроена (демо интерфейс, без запроса к серверу).');
  };

  return (
    <div
      data-easytag="id1-react/src/components/Auth/Register.jsx"
      className="page form-page"
    >
      <h1 className="page-title">Регистрация</h1>
      <p className="page-subtitle">
        Создайте новый аккаунт, чтобы участвовать в групповом чате.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="register-username">
            Имя пользователя
          </label>
          <input
            id="register-username"
            type="text"
            className="form-input"
            placeholder="например, chat_user"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="register-password">
            Пароль
          </label>
          <input
            id="register-password"
            type="password"
            className="form-input"
            placeholder="Введите надёжный пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit" className="button-primary form-submit">
          Создать аккаунт
        </button>

        {statusMessage && (
          <div className="form-status">{statusMessage}</div>
        )}
      </form>
    </div>
  );
}

export default Register;
