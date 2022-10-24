import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_RECIPIES } from '../../utils/queries';

const AllRecipies = () => {

    // const {data} = useQuery(QUERY_ALL_RECIPIES);
    // let recipe;
    // if (data) {
    //     recipe = data.recipe;
    // }
    // function testFunction() {
    //     console.log(recipe);
    // }

    // const recipies = useQuery({ query: QUERY_ALL_RECIPIES });
    // // cache.writeQuery({
    // //   query: QUERY_ALL_RECIPIES,
    // //   data: { recipies: [...recipies] },
    // // });
    // function testFunction() {
    //     console.log(recipies);
    // }


    const { loading, data } = useQuery(QUERY_ALL_RECIPIES);

    const recipies = data?.recipies || [];
    console.log(recipies);







    return (
        <div className='text-white'>
            {/* {recipe.map((recipe) => (
            <li key={recipe} style={{border: '1px solid red'}}>
                <h3>{recipe.recipeText}</h3>
                <p>{recipe.username}</p>
                <p>{recipe.description}</p>
                <p>{recipe.directions}</p>
                <button type='submit'>Edit</button>
            </li>
            ))} */}
            This is working
            <button type='submit'>test</button>
        </div>
    );
};

export default AllRecipies;