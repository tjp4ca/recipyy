import './HeaderFooter.css';
import './Login.css';
import './Signup.css';
import './Home.css';
import './Donation.css'
import './Team.css'

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SingleRecipe from './pages/SingleRecipe';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';
import Donation from './pages/Donation';
import Team from './pages/Team';

// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache
// })

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">



      <ApolloProvider client={client}>
        <Router>
          <div>
            <Header />
              <div>
                <Routes>

                  <Route 
                    path="/" 
                    element={<Home />}
                  />

                  <Route 
                    path="/login" 
                    element={<Login />} 
                  />
                  <Route 
                    path="/signup" 
                    element={<Signup />} 
                  />

                  <Route path="/profile">
                    <Route path=":username" element={<Profile />} />
                    <Route path="" element={<Profile />} />
                  </Route>

                  <Route
                    path="/recipe/:id"
                    element={<SingleRecipe />}
                  />

                  <Route 
                    path="/team" 
                    element={<Team />}
                  />

                  <Route 
                    path="/donation" 
                    element={<Donation />} 
                  />

                  <Route 
                    path="*" 
                    element={<PageNotFound />} 
                  />

                </Routes>
              </div>



          </div>
        </Router>
    </ApolloProvider>



    </div>
  );
}

export default App;
