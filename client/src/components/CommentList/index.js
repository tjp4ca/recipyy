import React    from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({ comments }) => {
  return (
    <div>
      <div>
        <div className='row my-3 p-0 border-cb-gold mx-auto' style={{ maxWidth: '200px' }}></div>
      </div>
      <div>
        {comments && comments.map(comment => (
          <p key={comment._id} className='text-center'>
            <div className='text-c-red' style={{ fontWeight: 600 }}>
              {comment.body}
            </div>
            <Link to={`/profile/${comment.createdBy}`} style={{ fontWeight: 300 }} className='text-c-redorange'>
              <div style={{ fontWeight: 600 }}>{comment.createdBy}</div> on {comment.createdAt}
            </Link>
            <div className='row my-0 p-0 border-cb-gold mx-auto' style={{ maxWidth: '200px' }}></div>
          </p>
        ))}
      </div>
    </div>
  );
};

export default CommentList;