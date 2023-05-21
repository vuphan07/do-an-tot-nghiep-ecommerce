import { Comment, Rate } from 'antd';
import React from 'react';

type Props = {};

const CommentItem = ({ author, avatar, content, rate }) => {
  return (
    <Comment
      author={author}
      avatar={avatar}
      content={
        <>
          <Rate value={rate} allowHalf disabled />
          <p>{content}</p>
        </>
      }
    />
  );
};

export default CommentItem;
