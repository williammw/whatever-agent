// src/components/Notification.tsx
import React, { useEffect, useState } from "react";
import { onMessageListener, requestForToken } from "../firebaseMessaging";

const Notification: React.FC = () => {
  const [notification, setNotification] = useState<{ title: string, body: string } | null>(null);

  useEffect(() => {
    requestForToken();

    onMessageListener()
      .then(payload => {
        setNotification({ title: payload.notification.title, body: payload.notification.body });
      })
      .catch(err => console.log('failed: ', err));
  }, []);

  return (
    <div className="notification">
      {notification && (
        <div className="notification-item">
          <h4>{notification.title}</h4>
          <p>{notification.body}</p>
        </div>
      )}
    </div>
  );
};

export default Notification;
