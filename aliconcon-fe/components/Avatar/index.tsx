import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';

export default function UserAvatar({ value, image, base64ImageUrl = undefined, ...props }) {
  const [img, setImg] = useState(undefined);
  useEffect(() => {
    if (image) {
      setImg(image);
    }
  }, [image]);

  if (base64ImageUrl || img) {
    return <Avatar {...props} src={!!base64ImageUrl ? base64ImageUrl : img} />;
  }
  return <Avatar {...props}>{value}</Avatar>;
}
