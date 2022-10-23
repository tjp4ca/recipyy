import './HeaderFooter.css';
import './Login.css';
import './Signup.css';
import './Home.css';

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
import Footer from './components/Footer';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Recipies from './pages/Recipies';
import Ingredients from './pages/Ingredients';
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';

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

                  {/* Nino */}
                  {/* <Route 
                      path="/" 
                      element={<Home />} 
                  /> */}


                  <Route 
                    path="/login" 
                    element={<Login />} 
                  />
                  <Route 
                    path="/signup" 
                    element={<Signup />} 
                  />

                  <Route 
                    path="/recipies" 
                    element={<Recipies />} 
                  />

                  <Route 
                    path="/ingredients" 
                    element={<Ingredients />} 
                  />

                  <Route 
                    path="/" 
                    element={<Home />}
                  />
                  {/*path will be changed later*/}

                  <Route 
                    path="*" 
                    element={<PageNotFound />} 
                  />

                </Routes>
              </div>


            <Footer />


          </div>
        </Router>
    </ApolloProvider>



    </div>
  );
}

export default App;
