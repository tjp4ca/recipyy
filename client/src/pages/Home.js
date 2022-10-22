import React, {useState} from "react";
// import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
// import Cart from "../components/Cart";
import RightColumn from '../components/RightColumn';
import Recipies from '../components/Recipies';
import Newrecipe from '../components/Newrecipe';

const Home = () => {

  const [yourRecipies, setYourRecipies] = useState(false);
  const [allRecipies, setAllRecipies] = useState(false);
  const [newRecipe, setNewRecipe] = useState(false);

  return (
    <div className="container-fluid mx-0 px-0 justify-content-center home-box">
      {/*interior divs can be moved into componants at a later date */}
      {/* <CategoryMenu />
      <ProductList />
      <Cart /> */}
      <div className="row mx-0 px-0">
        <div className="col-lg-2 border border-warning text-white">
          <h1>left column</h1>
        </div>
        <div className="col-lg-8 border border-danger text-white">
          <h1>middle column</h1>
          {yourRecipies ? (
            <section>
              <p>Your recipies are displayed here</p>
              <Recipies></Recipies>
            </section>
          ) : (<></>) }

          {allRecipies ? (
            <section>
              <p>All recipies are displayed here</p>
            </section>
          ) : (<></>) }

          {newRecipe ? (
            <section>
              <p>Make new recipe</p>
              <Newrecipe />
            </section>
          ) : (<></>) }

        </div>
        <div className="col-lg-2 border border-warning text-white">
          <h1>right column</h1>
          <RightColumn 
            setYourRecipies={setYourRecipies}
            setAllRecipies={setAllRecipies}
            setNewRecipe={setNewRecipe}
          ></RightColumn>
        </div>
      </div>
    </div>
  );
};

export default Home;
