import React, { useState } from 'react';
import { useMutation }     from '@apollo/client';
import { ADD_COMMENT }     from '../../utils/mutations';

const CommentForm = ({ recipeId }) => {
  const [body, setBody] = useState('');
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleChange = event => {
    setBody(event.target.value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      await addComment({
        variables: { recipeId, body }
      });

      setBody('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <textarea
          name="body"
          placeholder="Comment on this recipe..."
          value={body}
          onChange={handleChange}
        ></textarea>

        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;