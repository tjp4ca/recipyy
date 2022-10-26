import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_RECIPE } from '../utils/queries';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Auth from '../utils/auth';

const SingleRecipe = props => {
  const { id: recipeId } = useParams();

  const { loading, data } = useQuery(QUERY_RECIPE, {
    variables: { id: recipeId }
  });

  const recipe = data?.recipe || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className='text-white'>
      <div>
        <p>
            {recipe.name}
        </p>
        <p>
          <span style={{ fontWeight: 700 }}>
            {recipe.createdBy}
          </span>{' '}
          thought on {recipe.createdAt}
        </p>
        <div>
          <p>{recipe.description}</p>
          <p>{recipe.instructions}</p>
        </div>
      </div>

      {recipe.commentCount > 0 && <CommentList comments={recipe.comments} />}
      {Auth.loggedIn() && <CommentForm recipeId={recipe._id} />}
    </div>
  );
};

export default SingleRecipe;