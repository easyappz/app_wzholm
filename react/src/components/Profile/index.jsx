import React from 'react';

function Profile() {
  return (
    <div
      data-easytag="id1-react/src/components/Profile/index.jsx"
      className="page profile-page"
    >
      <h1 className="page-title">Профиль</h1>
      <p className="page-subtitle">
        Информация о пользователе будет показана здесь после подключения к серверу.
      </p>

      <div className="profile-placeholder-card">
        <p className="profile-placeholder-line">
          Имя пользователя:{' '}
          <span className="placeholder-pill">demo_user</span>
        </p>
        <p className="profile-placeholder-line">
          Статус:{' '}
          <span className="placeholder-pill">демонстрационный режим</span>
        </p>
        <p className="profile-placeholder-note">
          После реализации авторизации здесь появятся реальные данные текущего участника.
        </p>
      </div>
    </div>
  );
}

export default Profile;
