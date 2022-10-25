import React    from 'react';
import { Link } from 'react-router-dom';

const RecipeList = ({ recipes, title }) => {
  if (!recipes.length) {
    return <h3>No recipes yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {recipes &&
        recipes.map(recipe => (
          <div key={recipe._id}>
            <p>
              <Link
                to={`/profile/${recipe.createdBy}`}
                style={{ fontWeight: 700 }}
              >
                {recipe.createdBy}
              </Link>{' '}
              created on {recipe.createdAt}
            </p>
            <div>
              <Link to={`/recipe/${recipe._id}`}>
                <p>{recipe.name}</p>
                <p>{recipe.description}</p>
                <p>
                  Comments: {recipe.commentCount} | Click to{' '}
                  {recipe.commentCount ? 'see' : 'start'} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RecipeList;