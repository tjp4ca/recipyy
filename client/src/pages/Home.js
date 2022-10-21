import React, {useState} from "react";
// import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
// import Cart from "../components/Cart";
import RightColumn from '../components/RightColumn';
import Recipies from '../components/Recipies';

const Home = () => {

  const documentWidth = document.body.clientWidth;
  const documentWidthString = documentWidth.toString() + 'px';
  const fullWidth = {
    width: documentWidthString
  }

  const [yourRecipies, setYourRecipies] = useState(false);

  return (
    <div className="container border border-success mx-0 px-0 justify-content-left home-box" style={fullWidth}>
      {/*interior divs can be moved into componants at a later date */}
      {/* <CategoryMenu />
      <ProductList />
      <Cart /> */}
      <div className="row mx-0 px-0">
        <div className="col-lg-3 border border-warning text-white">
          <h1>left column {documentWidthString}</h1>
        </div>
        <div className="col-lg-6 border border-danger text-white">
          <h1>middle column</h1>
          {yourRecipies ? (
            <section>
              <p1>Your recipies are displayed here</p1>
              <Recipies></Recipies>
            </section>
          ) : (<p1>All recipies being shown</p1>) }
        </div>
        <div className="col-lg-3 border border-warning text-white">
          <h1>right column</h1>
          <RightColumn setYourRecipies={setYourRecipies} ></RightColumn>
        </div>
      </div>
    </div>
  );
};

export default Home;
