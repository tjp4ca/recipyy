import React, { useState }         from 'react';
import { useMutation }             from '@apollo/client';
import { ADD_RECIPE }              from '../../utils/mutations';
import { QUERY_RECIPES, QUERY_ME } from '../../utils/queries';

const RecipeForm = () => {
  const [formState, setFormState] = useState({ name: '', description: '', instructions: '' });
  const [characterCount, setCharacterCount] = useState(0);
  const [addRecipe, { error }] = useMutation(ADD_RECIPE, {
    update(cache, { data: { addRecipe } }) {  
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, recipes: [...me.recipes, addRecipe] } },
        });
      } catch (e) {
        console.warn("First recipe submitted by user")
      }
  
      const { recipes } = cache.readQuery({ query: QUERY_RECIPES });
      cache.writeQuery({
        query: QUERY_RECIPES,
        data: { recipes: [addRecipe, ...recipes] },
      });
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
  
    try {
      await addRecipe({
        variables: { ...formState }
      });
  
      setFormState({ name: '', description: '', instructions: '' });
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p className={`${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span>Something went wrong...</span>}
      </p>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Recipe name"
          value={formState.name}
          onChange={handleChange}
        ></input>

        <textarea
          name="description"
          placeholder="Recipe description"
          value={formState.description}
          onChange={handleChange}
        ></textarea>

        <textarea
          name="instructions"
          placeholder="Recipe instructions"
          value={formState.instructions}
          onChange={handleChange}
        ></textarea>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;