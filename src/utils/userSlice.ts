import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    name: string;
    email: string;
    role: string;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    name: '',
    email: '',
    role: '',
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.isAuthenticated = true;
        },
        clearUser(state) {
            state.name = '';
            state.email = '';
            state.role = '';
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
