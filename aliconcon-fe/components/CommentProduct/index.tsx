import React from 'react';
import Editor from './Editor';
import { Comment, Divider, Rate } from 'antd';
import CommentItem from './CommentItem';

const CommentProduct = ({ onFinish, disabled = false, comments }) => {
  return (
    <div className="w-full bg-white p-4">
      <Editor onFinish={onFinish} disabled={disabled} />
      <Divider />
      <div>
        {comments?.map((comment, index) => (
          <CommentItem
            rate={comment?.rate}
            content={comment?.content}
            avatar={comment?.user_avatar}
            author={comment?.user_name}
            key={comment?.id ?? index}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentProduct;
