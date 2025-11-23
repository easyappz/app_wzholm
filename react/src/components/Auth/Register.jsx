import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerMember } from '../../api/auth';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatusMessage('');
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Пожалуйста, введите имя пользователя и пароль.');
      return;
    }

    setIsSubmitting(true);

    try {
      await registerMember({ username, password });
      setStatusMessage('Аккаунт успешно создан. Теперь вы можете войти.');
      navigate('/login');
    } catch (error) {
      let message = 'Не удалось создать аккаунт. Попробуйте ещё раз.';

      if (error.response && error.response.data) {
        const data = error.response.data;

        if (typeof data === 'string') {
          message = data;
        } else if (data.detail && typeof data.detail === 'string') {
          message = data.detail;
        } else if (data.username && Array.isArray(data.username) && data.username.length > 0) {
          message = data.username[0];
        }
      }

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
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

        <button
          type="submit"
          className="button-primary form-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Создание аккаунта...' : 'Создать аккаунт'}
        </button>

        {errorMessage && <div className="form-status form-status-error">{errorMessage}</div>}
        {statusMessage && !errorMessage && (
          <div className="form-status">{statusMessage}</div>
        )}
      </form>
    </div>
  );
}

export default Register;
