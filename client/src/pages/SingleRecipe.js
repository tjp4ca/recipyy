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
    <div className='text-white justify-content-center text-center container-fluid m-0 p-0 h-100'>
      <div className='col-lg-12 text-center'>
      <div className='mb-5'>
        <p className='text-c-gold' style={{ fontWeight: 1000 }}>
            {recipe.name}
        </p>
        <p className='text-c-orange'>
          <span style={{ fontWeight: 700 }}>
            {recipe.createdBy}
          </span>{' '}
           on {recipe.createdAt}
        </p>
        <div className=''>
          <p className='text-c-redorange'>{recipe.description}</p>
          <p className='text-c-red'>{recipe.instructions}</p>
        </div>
      </div>

      <div className='row justify-content-center'>
        {recipe.commentCount > 0 && <CommentList comments={recipe.comments} />}
      </div>
      <div className='row justify-content-center'>
        {Auth.loggedIn() && <CommentForm recipeId={recipe._id} />}
      </div>
      </div>
    </div>
  );
};

export default SingleRecipe;