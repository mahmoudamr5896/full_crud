import React from 'react';

const ConditionalComponent = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome, User!</p>
      ) : (
        <p>Please log in to continue.</p>
      )}
    </div>
  );
};

export default ConditionalComponent;