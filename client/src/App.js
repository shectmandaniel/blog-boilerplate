import React from 'react';
import PostCreate from './PostCreate';
import PostsList from './PostsList';

const App = () => {
  return (
    <div className="container">
      <PostCreate />
      <hr />
      <PostsList />
    </div>
  );
};

export default App;
