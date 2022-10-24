import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import RecipeList from '../components/RecipeList';
import FriendList from '../components/FriendList';
import RecipeForm from '../components/RecipeForm';

import { ADD_FRIEND } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  const [addFriend] = useMutation(ADD_FRIEND);

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You must be logged in to view this page.
      </h4>
    );
  }

  return (
    <div>
      <div>
        <h2>
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        {userParam && (
          <button onClick={handleClick}>
            Add Friend
          </button>
        )}
      </div>

      <div>
        <div>
          <RecipeList recipes={user.recipes} title={`${user.username}'s recipes`} />
        </div>

        <div>
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div>{!userParam && <RecipeForm />}</div>
    </div>
  );
};

export default Profile;