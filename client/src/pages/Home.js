import React, {useState}                                       from 'react';
import { useQuery }                                from '@apollo/client';
import RecipeList                                  from '../components/RecipeList';
import { QUERY_ME, QUERY_ME_BASIC, QUERY_RECIPES } from '../utils/queries';
import Auth                                        from '../utils/auth';
import FriendList                                  from '../components/FriendList';
import RecipeForm                                  from '../components/RecipeForm';

const Home = () => {
  const { loading, data } = useQuery(QUERY_RECIPES);
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const recipes = data?.recipes || [];
  console.log(recipes);

  const loggedIn = Auth.loggedIn();

  const [yourRecipies, setYourRecipies] = useState(false);
  const [allRecipies, setAllRecipies] = useState(false);
  const [newRecipe, setNewRecipe] = useState(false);

  return (
    <div className="container-fluid mx-0 px-0 justify-content-center home-box">
      <div className="row mx-0 px-0">

        <div className="col-lg-2 border border-warning text-white">
          {loggedIn && userData ? (
            <div>
              <h1 className="text-c-blue">{userData.me.username}</h1>
              <FriendList
                username={userData.me.username}
                friendCount={userData.me.friendCount}
                friends={userData.me.friends}
              />
            </div>
          ) : null}
        </div>

        <div className="col-lg-8 border border-danger text-white">
          <div className={`${loggedIn}`}>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <RecipeList recipes={recipes} title="Recently-added recipes" />
            )}
          </div>
        </div>

        <div className="col-lg-2 border border-success text-white">
          {loggedIn && (
            <div>
              <RecipeForm />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Home;