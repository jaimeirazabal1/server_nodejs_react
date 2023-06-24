import React, { useState } from 'react';
import {  useDispatch } from 'react-redux';
import { setUser } from '../redux/slice';

const UserForm = () => {
    const [user, setUserState] = useState({
        name:'',
        email:''
    })
 
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setUser(user));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    value={user.name}
                    onChange={(e) => setUserState({...user,name: e.target.value})}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    value={user.email}
                    onChange={(e) => setUserState({...user,email: e.target.value})}
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Add User
            </button>
        </form>
    );
};


export default UserForm;
