import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_RECIPIES } from '../../utils/queries';

const AllRecipies = () => {

    const {data} = useQuery(QUERY_ALL_RECIPIES);
    let recipee;
    if (data) {
        recipee = data.recipee;
    }

    return (
        <div className='text-white'>
            {recipee.map((recipe) => (
            <li key={recipe} style={{border: '1px solid red'}}>
                <h3>{recipe.recipeText}</h3>
                <p>{recipe.username}</p>
                <p>{recipe.description}</p>
                <p>{recipe.directions}</p>
                <button type='submit'>Edit</button>
            </li>
            ))}
            This is working
        </div>
    );
};

export default AllRecipies;