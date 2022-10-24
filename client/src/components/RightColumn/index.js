import React from 'react';


function RightColumn(props) {
  const { setYourRecipes,
          setAllRecipes,
          setNewRecipe
        } = props;
  return (
    <section>
        <ul>
            <li>
                <button>
                    <span onClick={() => {
                        setYourRecipes(true);
                        setAllRecipes(false);
                        setNewRecipe(false);
                    }}>Your Recipes</span>
                </button>
            </li>
            <li>
                <button>
                    <span onClick={() => {
                        setYourRecipes(false);
                        setNewRecipe(false);
                        setAllRecipes(true);
                    }}>All Recipes</span>
                </button>
            </li>
            <li>
                <button>
                    <span onClick={() => {
                        setYourRecipes(false);
                        setAllRecipes(false);
                        setNewRecipe(true);
                    }}>New Recipe</span>
                </button>
            </li>

        </ul>
    </section>
  );
}
export default RightColumn;