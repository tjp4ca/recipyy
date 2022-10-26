import React, { useState }         from 'react';
import { useMutation }             from '@apollo/client';
import { UPDATE_RECIPE }              from '../../utils/mutations';
import { QUERY_RECIPES, QUERY_ME } from '../../utils/queries';

const RecipeUpdate = () => {
  const [formState, setFormState] = useState({ name: '', description: '', instructions: '' });
  const [characterCount, setCharacterCount] = useState(0);
  const [updateRecipe, { error }] = useMutation(UPDATE_RECIPE, {
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
        data: { recipes: [updateRecipe, ...recipes] },
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
      await updateRecipe({
        variables: { ...formState }
      });
  
      setFormState({ name: '', description: '', instructions: '' });
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='container-fluid'>
      <p className={`${characterCount === 10000 || error ? 'text-error' : ''}`}>
        {/* Character Count: {characterCount}/280 */}
        {error && <span>Something went wrong...</span>}
      </p>
      <div className='row'>Create a new recipe!</div>
      <form onSubmit={handleFormSubmit} className=''>
        <div>
        <input
          type="text"
          name="name"
          placeholder="Recipe name"
          value={formState.name}
          onChange={handleChange}
          style={{ minHeight: '50px' }}
          className='w-100 border-c-blue backgroud-c-dark mb-3'
        ></input>
        </div>

        <div>
        <textarea
          name="description"
          placeholder="Recipe description"
          value={formState.description}
          onChange={handleChange}
          style={{ minHeight: '100px' }}
          className='w-100 border-c-blue mb-3 p-0 text-c-green'
        ></textarea>
        </div>

        <div>
        <textarea
          name="instructions"
          placeholder="Recipe instructions"
          value={formState.instructions}
          onChange={handleChange}
          style={{ minHeight: '150px' }}
          className='w-100 border-c-blue mb-3 p-0'
        ></textarea>
        </div>


        <div>
        <button type="submit" className='btn-primary btn-lg'>
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeUpdate;