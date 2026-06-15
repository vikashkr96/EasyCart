import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Register User API call
export const register = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post('/api/v1/register', userData, config);
        console.log("Register data: ", data);
        
        return data;
    } catch (error) {
    console.log("REGISTER ERROR:", error.response);
    return rejectWithValue(
        error.response?.data || "An error occurred while registering"
    );
}
});

// Login User API call
export const login = createAsyncThunk('user/login', async ({email,password}, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post('/api/v1/login', {email, password}, config);
        console.log("Login data: ", data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || 'An error occurred while logging-in');
    }
});

// getting user information .  

export const loadUser = createAsyncThunk('user/loadUser', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/v1/profile');
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || 'An error occurred while loading the user profile');
    }
});

// logout functionality 
export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/api/v1/logout',{withCredetials:true});
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || 'Log out failed');
    }
});



const userSlice = createSlice({
    name: 'user',

    initialState: {
        user: null,
        loading: false,
        error: null,
        success: false,
        isAuthenticated: false
    },

    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },

        removeSuccess: (state) => {
        state.success = false;
}
    },
    extraReducers: (builder) => {
        // Registration cases
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.user = action.payload?.user || null;
                state.isAuthenticated = Boolean(action.payload?.user);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'An error occurred while registering';
                state.user = null;
                state.isAuthenticated = false;
            });

            // login cases
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.user = action.payload?.user || null;
                state.isAuthenticated = Boolean(action.payload?.user);
                console.log(state.user);
                
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'An error occurred while Logging-in';
                state.user = null;
                state.isAuthenticated = false;
            });

        // loading user 
        builder
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload?.user || null;
                state.isAuthenticated = Boolean(action.payload?.user);
                
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'An error occurred while loading the user profile';
                state.user = null;
                state.isAuthenticated = false;
            });

             // Logout user 
        builder
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user =  null;
                state.isAuthenticated = false;
                
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Log out failed';
            });



    }
});

export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;