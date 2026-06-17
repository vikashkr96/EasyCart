import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Register User 
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

// Login User 
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
export const loadUser = createAsyncThunk(
'user/loadUser',
async (_, { rejectWithValue }) => {
    try {

        const {data} = await axios.get(
            '/api/v1/profile',
            {
                withCredentials:true
            }
        );

        return data;

    } catch(error){

        return rejectWithValue(
            error.response?.data || "Error"
        );
    }
});

// logout functionality 
export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(
            '/api/v1/logout',
            {}, { withCredentials:true }) 
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || 'Log out failed');
    }
});

// Update profile functionality
export const updateProfile = createAsyncThunk('user/updateProfile', async (userData, { rejectWithValue }) => {
    try {
        const config = {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        const { data } = await axios.put(
            '/api/v1/profile/update',
            userData,config);
            return data;
    } catch (error) {
        return rejectWithValue(error.response.data || {message:'Profile update failed! Please try again later..'});
    }
});

// Update password functionality 
export const updatePassword = createAsyncThunk('user/updatePassword', async (formData, { rejectWithValue }) => {
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const { data } = await axios.put(
            '/api/v1/password/update',
            formData,config);
            return data;
    } catch (error) {
        return rejectWithValue(error.response.data || 'Password update failed');
    }
});

// Forgot password functionality
export const forgotPassword = createAsyncThunk('user/forgotPassword', async (email, { rejectWithValue }) => {
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const { data } = await axios.post(
            '/api/v1/password/forgot',
            email,config);
            return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || {message: 'Email Sent Failed'});
    }
});



const userSlice = createSlice({
    name: 'user',

    initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: false,
    isLoadingUser: true,
    message:null
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
                state.isLoadingUser = true;
                state.error = null;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.isLoadingUser = false;
                state.error = null;
                state.user = action.payload?.user || null;
                state.isAuthenticated = Boolean(action.payload?.user);
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.isLoadingUser = false;
                state.error = null;
                state.user = null;
                state.isAuthenticated = false;
            })

            
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

         // Update user profile 
        builder
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user =  action.payload?.user || null;
                state.success =  action.payload?.success ;
                state.message =  action.payload?.message ;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Profile update failed! Please try again later..';
            });

        // Update password 
        builder
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success =  action.payload?.success ;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Password update failed';
            });

        // Forgot password 
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success =  action.payload?.success ;
                state.message =  action.payload?.message ;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Email Sent Failed';
            });
    }
});

export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;