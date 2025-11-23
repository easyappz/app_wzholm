import React, { useCallback, useContext, useEffect, useState } from 'react';
import { fetchChatMessages, sendChatMessage } from '../../api/chat';
import { AuthContext } from '../../context/AuthContext';

export const Home = () => {
  const { token } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadMessages = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchChatMessages(50);
      setMessages(Array.isArray(data) ? data : []);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Не удалось загрузить сообщения. Попробуйте обновить страницу.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const fetchInitial = async () => {
      if (isCancelled) {
        return;
      }

      await loadMessages();
    };

    fetchInitial();

    const intervalId = setInterval(() => {
      if (!isCancelled) {
        loadMessages();
      }
    }, 5000);

    return () => {
      isCancelled = true;
      clearInterval(intervalId);
    };
  }, [loadMessages]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setInfoMessage('');

    if (!messageText.trim()) {
      setInfoMessage('Введите текст сообщения перед отправкой.');
      return;
    }

    if (!token) {
      setInfoMessage('Чтобы отправлять сообщения, войдите в систему.');
      return;
    }

    try {
      await sendChatMessage(messageText.trim());
      setMessageText('');
      setInfoMessage('');
      await loadMessages();
    } catch (error) {
      setInfoMessage('Не удалось отправить сообщение. Попробуйте ещё раз.');
    }
  };

  const formatTime = (isoString) => {
    if (!isoString) {
      return '';
    }

    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return '';
    }
  };

  return (
    <div
      data-easytag="id1-react/src/components/Home/index.jsx"
      className="page chat-page"
    >
      <h1 className="page-title">Групповой чат</h1>
      <p className="page-subtitle">
        Здесь отображается общий чат всех участников. Сообщения обновляются
        автоматически каждые несколько секунд.
      </p>

      <div className="chat-layout">
        <div className="chat-messages" aria-label="Сообщения чата">
          {isLoading && messages.length === 0 && (
            <div className="chat-empty">Загрузка сообщений...</div>
          )}

          {!isLoading && errorMessage && (
            <div className="chat-empty chat-error">{errorMessage}</div>
          )}

          {!isLoading && !errorMessage && messages.length === 0 && (
            <div className="chat-empty">Сообщений пока нет</div>
          )}

          {!isLoading && !errorMessage && messages.length > 0 && (
            messages.map((message) => (
              <div key={message.id} className="chat-message">
                <div className="chat-message-meta">
                  <span className="chat-message-author">
                    {message.member && message.member.username
                      ? message.member.username
                      : 'Неизвестный участник'}
                  </span>
                  {message.created_at && (
                    <span className="chat-message-time">
                      {formatTime(message.created_at)}
                    </span>
                  )}
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
