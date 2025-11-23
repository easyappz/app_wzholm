import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { fetchProfile } from '../../api/auth';

function Profile() {
  const { token, member } = useContext(AuthContext);
  const [profile, setProfile] = useState(member || null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setErrorMessage('Для просмотра профиля необходимо войти.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    fetchProfile()
      .then((data) => {
        setProfile(data);
      })
      .catch(() => {
        setErrorMessage('Не удалось загрузить профиль. Попробуйте ещё раз.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return (
    <div
      data-easytag="id1-react/src/components/Profile/index.jsx"
      className="page profile-page"
    >
      <h1 className="page-title">Профиль</h1>
      <p className="page-subtitle">
        Информация о вашем аккаунте в групповом чате.
      </p>

      {!token && (
        <div className="profile-placeholder-card">
          <p className="profile-placeholder-line">
            Для просмотра профиля необходимо выполнить вход.
          </p>
          <p className="profile-placeholder-line">
            Перейдите на страницу <Link to="/login">входа</Link> или создайте
            новый аккаунт на странице <Link to="/register">регистрации</Link>.
          </p>
        </div>
      )}

      {token && (
        <div className="profile-placeholder-card">
          {loading && (
            <p className="profile-placeholder-line">Загрузка профиля...</p>
          )}

          {!loading && errorMessage && (
            <p className="profile-placeholder-line profile-placeholder-error">
              {errorMessage}
            </p>
          )}

          {!loading && !errorMessage && profile && (
            <>
              <p className="profile-placeholder-line">
                Имя пользователя:{' '}
                <span className="placeholder-pill">{profile.username}</span>
              </p>
              <p className="profile-placeholder-note">
                Профиль загружен с сервера. В дальнейшем здесь можно будет
                отображать дополнительную информацию об участнике.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
