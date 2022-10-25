import React    from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({ comments }) => {
  return (
    <div>
      <div>
        <span>Comments</span>
      </div>
      <div>
        {comments && comments.map(comment => (
          <p key={comment._id}>
            {comment.body} {'// '}
            <Link to={`/profile/${comment.createdBy}`} style={{ fontWeight: 700 }}>
              {comment.createdBy} on {comment.createdAt}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
};

export default CommentList;