// Toast.jsx

import React from 'react';
import { notification } from 'antd';

const Toast = ({ type, message, description }) => {
  const openNotificationWithIcon = () => {
    notification[type]({
      message,
      description,
    });
  };

  return (
    <React.Fragment>
      {openNotificationWithIcon()}
    </React.Fragment>
  );
};

export default Toast;
