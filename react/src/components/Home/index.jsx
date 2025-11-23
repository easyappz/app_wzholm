import React, { useState } from 'react';

export const Home = () => {
  const [messageText, setMessageText] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const mockMessages = [
    {
      id: 1,
      author: 'demo_user',
      text: 'Добро пожаловать в групповой чат!',
    },
    {
      id: 2,
      author: 'guest',
      text: 'Сейчас это только демонстрационный интерфейс без подключения к серверу.',
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!messageText.trim()) {
      setInfoMessage('Введите текст сообщения перед отправкой.');
      return;
    }

    setInfoMessage('Сообщение не отправлено (демо режим, без сервера).');
    setMessageText('');
  };

  return (
    <div
      data-easytag="id1-react/src/components/Home/index.jsx"
      className="page chat-page"
    >
      <h1 className="page-title">Групповой чат</h1>
      <p className="page-subtitle">
        Здесь будет отображаться общий чат всех участников. Пока что это статический интерфейс для демонстрации.
      </p>

      <div className="chat-layout">
        <div className="chat-messages" aria-label="Сообщения чата">
          {mockMessages.length === 0 ? (
            <div className="chat-empty">Сообщений пока нет</div>
          ) : (
            mockMessages.map((message) => (
              <div key={message.id} className="chat-message">
                <div className="chat-message-meta">
                  <span className="chat-message-author">{message.author}</span>
                </div>
                <div className="chat-message-text">{message.text}</div>
              </div>
            ))
          )}
        </div>

        <form className="chat-input-form" onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="chat-message">
            Новое сообщение
          </label>
          <textarea
            id="chat-message"
            className="form-textarea"
            placeholder="Напишите сообщение для всех участников..."
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
          />
          <div className="chat-input-actions">
            <button type="submit" className="button-primary">
              Отправить
            </button>
            {infoMessage && (
              <div className="form-helper-text">{infoMessage}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
