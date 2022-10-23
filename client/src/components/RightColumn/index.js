import React from 'react';


function RightColumn(props) {
  const { setYourRecipies,
          setAllRecipies,
          setNewRecipe
        } = props;
  return (
    <section>
        <ul>
            <li>
                <button>
                    <span onClick={() => {
                        setYourRecipies(true);
                        setAllRecipies(false);
                        setNewRecipe(false);
                    }}>Your Recipies</span>
                </button>
            </li>
            <li>
                <button>
                    <span onClick={() => {
                        setYourRecipies(false);
                        setNewRecipe(false);
                        setAllRecipies(true);
                    }}>All Recipies</span>
                </button>
            </li>
            <li>
                <button>
                    <span onClick={() => {
                        setYourRecipies(false);
                        setAllRecipies(false);
                        setNewRecipe(true);
                    }}>New Recipe</span>
                </button>
            </li>

        </ul>
    </section>
  );
}
export default RightColumn;