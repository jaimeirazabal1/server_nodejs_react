import React, { useState } from 'react';
import { Provider } from 'react-redux';

import UserForm from './components/UserForm';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/slice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
const App = () => {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <Provider store={store}>
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Add Users</h1>
      <UserForm addUser={addUser} />
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Users:</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.name} - {user.email}</li>
          ))}
        </ul>
      </div>
    </div>
    </Provider>
  );
};

export default App;
