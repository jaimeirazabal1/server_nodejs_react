import { createSlice } from '@reduxjs/toolkit';
import { SERVER_URL} from '../config/config'

const initialState = {
    users:[],
    name: '',
    email:''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser:(state,action)=>{
        state.name = action.payload.name;
        state.email = action.payload.email;
        fetch(`${SERVER_URL}users`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(action.payload),
        })
        .then(response => response.json())
        .then(result => {
            // Lógica para manejar la respuesta del servidor
            // console.log(result);
            return result;
        })
        .catch(error => {
            // Lógica para manejar el error
            console.error('Error:', error);
        });
    },
    setUsers:(state,action)=>{
        state.users = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
        state.email = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
