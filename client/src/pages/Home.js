import React                                       from 'react';
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

  return (
    <main>
      <div>
        <div>
          {loggedIn && (
            <div>
              <RecipeForm />
            </div>
          )}
        </div>
        <div className={`${loggedIn}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <RecipeList recipes={recipes} title="Recently-added recipes" />
          )}
        </div>

        {loggedIn && userData ? (
          <div>
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;