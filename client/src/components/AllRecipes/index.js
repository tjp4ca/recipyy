import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_RECIPES, QUERY_RECIPES } from '../../utils/queries';

const AllRecipes = () => {

    // const {data} = useQuery(QUERY_ALL_RECIPES);
    // let recipe;
    // if (data) {
    //     recipe = data.recipe;
    // }
    // function testFunction() {
    //     console.log(recipe);
    // }

    // const recipes = useQuery({ query: QUERY_ALL_RECIPES });
    // // cache.writeQuery({
    // //   query: QUERY_ALL_RECIPES,
    // //   data: { recipes: [...recipes] },
    // // });
    // function testFunction() {
    //     console.log(recipes);
    // }


    const { aloading, adata } = useQuery(QUERY_ALL_RECIPES);

    const arecipes = adata?.recipes || [];
    console.log(arecipes);

    const { loading, data } = useQuery(QUERY_RECIPES);

    const recipes = data?.recipes || [];
    console.log(recipes);






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

export default AllRecipes;