import React    from 'react';
import { Link } from 'react-router-dom';

const RecipeList = ({ recipes, title }) => {
  if (!recipes.length) {
    return <h3>No recipes yet</h3>;
  }

  return (
    <div>
      <h3 className='text-c-blue border-cb-blue mb-3'>{title}</h3>
      {recipes &&
        recipes.map(recipe => (
          <div key={recipe._id} className="mb-3 border-cb-green">
            <div>
              <Link to={`/recipe/${recipe._id}`}>
                <h2 className="text-c-green">{recipe.name}</h2>
                <p className="text-c-green">{recipe.description}</p>
                <p className="text-c-blue">
                  Comments: {recipe.commentCount} | Click to{' '}
                  {recipe.commentCount ? 'see' : 'start'} the discussion!
                </p>
              </Link>
              <p className="text-c-blue">
                <Link className="text-c-green"
                  to={`/profile/${recipe.createdBy}`}
                  style={{ fontWeight: 1000 }}
                >
                {recipe.createdBy}
                </Link>{' '}
                created on {recipe.createdAt}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RecipeList;