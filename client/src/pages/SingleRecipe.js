import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_RECIPE } from '../utils/queries';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import RecipeUpdate from '../components/RecipeUpdate';
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
    <div className='text-white justify-content-center container-fluid m-0 p-0 h-100 row'>
      <div className='col-lg-3'/>
      <div className='col-lg-9'>
      <div className='mb-5'>
        <p className='text-c-blue' style={{ fontWeight: 1000 }}>
            {recipe.name}
        </p>
        <p className='text-c-green'>
          <span style={{ fontWeight: 700 }}>
            {recipe.createdBy}
          </span>{' '}
           on {recipe.createdAt}
        </p>
        <div className=''>
          <p className='text-c-green'>{recipe.description}</p>
          <p className='text-c-green'>{recipe.instructions}</p>
        </div>
      </div>
      <div>
        <RecipeUpdate recipeId={recipe._id} ></RecipeUpdate>
      </div>

      <span className='text-c-blue' style={{ fontWeight: 1000 }}>Comments</span>
      <div className='row sticky-top'>
        {Auth.loggedIn() && <CommentForm recipeId={recipe._id} />}
      </div>
      
      <div className='row'>
        {recipe.commentCount > 0 && <CommentList comments={recipe.comments} />}
      </div>

      </div>
    </div>
  );
};

export default SingleRecipe;