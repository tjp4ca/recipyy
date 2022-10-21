import React from 'react';


function RightColumn(props) {
  const { setYourRecipies } = props;
  return (
    <section>
        <ul>
            <li>
                <button>
                    <span onClick={() => {
                        setYourRecipies(true);
                    }}>Your Recipies</span>
                </button>
            </li>
            <li>
                <button>
                    <span onClick={() => {
                        setYourRecipies(false);
                    }}>All Recipies</span>
                </button>
            </li>
            <li>
                <button>
                    <span onClick={() => {
                        alert("This works but doesn't do anything yet");
                    }}>New Recipe</span>
                </button>
            </li>

        </ul>
    </section>
  );
}
export default RightColumn;
