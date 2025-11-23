import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginMember } from '../../api/auth';
import { AuthContext } from '../../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { token, member, login } = useContext(AuthContext);

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
      const data = await loginMember({ username, password });
      const receivedToken = data.token;
      const receivedMember = data.member;

      login(receivedToken, receivedMember);
      navigate('/');
    } catch (error) {
      let message = 'Не удалось выполнить вход. Попробуйте ещё раз.';

      if (error.response && error.response.data) {
        const data = error.response.data;

        if (typeof data === 'string') {
          message = data;
        } else if (data.detail && typeof data.detail === 'string') {
          message = data.detail;
        }
      }

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
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

      {token && (
        <div className="form-status">
          Вы уже вошли как <strong>{member?.username || 'участник'}</strong>.
        </div>
      )}

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

        <button
          type="submit"
          className="button-primary form-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Выполняется вход...' : 'Войти'}
        </button>

        {errorMessage && <div className="form-status form-status-error">{errorMessage}</div>}
        {statusMessage && !errorMessage && (
          <div className="form-status">{statusMessage}</div>
        )}
      </form>
    </div>
  );
}

export default Login;
