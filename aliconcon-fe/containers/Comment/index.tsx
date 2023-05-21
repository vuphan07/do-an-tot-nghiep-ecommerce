import React from 'react';
import CommentProduct from '../../components/CommentProduct';

const CommentContainer = (props) => {
  return (
    <div>
      <CommentProduct {...props} />
    </div>
  );
};

export default CommentContainer;
