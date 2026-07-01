import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// fetch all products ..
export const fetchAdminProducts = createAsyncThunk('admin/fetchAdminProducts', async ( _, { rejectWithValue }) => {
    try {
        const {data} = await axios.get('/api/v1/admin/products');
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error While Fetching the Products");
    }
});

// create products ..
export const createProduct = createAsyncThunk('admin/createProduct', async ( productData,{ rejectWithValue }) => {
    try {
        const {data} = await axios.post('/api/v1/admin/product/create',productData);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Product Creation Failed!");
    }
});


// get single product for update
export const getAdminProductDetails = createAsyncThunk(
    'admin/getAdminProductDetails',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(`/api/v1/admin/product/${id}`);
            return data;
        } catch(error){
            return rejectWithValue(
                error.response?.data || "Product Details Fetch Failed!"
            );
        }
    }
);

// update product
export const updateProduct = createAsyncThunk(
    'admin/updateProduct',
    async ({id, productData}, {rejectWithValue}) => {
        try {
            const {data} = await axios.put(
                `/api/v1/admin/product/${id}`,
                productData
            );

            return data;

        } catch(error){
            return rejectWithValue(
                error.response?.data || "Product Update Failed!"
            );
        }
    }
);

// delete product
export const deleteProduct = createAsyncThunk(
    'admin/deleteProduct',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await axios.delete(
                `/api/v1/admin/product/${id}`
            );

            return {data, id};

        } catch(error){
            return rejectWithValue(
                error.response?.data || "Product Delete Failed!"
            );
        }
    }
);

// Fetch All Users
export const fetchUsers = createAsyncThunk(
    'admin/fetchUsers',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(`/api/v1/admin/users`);
            return data;
        } catch(error){
            return rejectWithValue(
                error.response?.data || "Failed to Fetch Users"
            );
        }
    }
);

// get single User
export const getSingleUser = createAsyncThunk('admin/getSingleUser',async (id, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(`/api/v1/admin/user/${id}`);
            return data;
        } catch(error){
            return rejectWithValue(
                error.response?.data || "Failed to Fetch this User"
            );
        }
    }
);

// update  User role
export const updateUserRole = createAsyncThunk('admin/updateUserRole',async ({userId,role}, {rejectWithValue}) => {
        try {
            const {data} = await axios.put(`/api/v1/admin/user/${userId}`, {role});
            return data;
        } catch(error){
            return rejectWithValue(
                error.response?.data || "Failed to Update User Role"
            );
        }
    }
);

// delete  User 
export const deleteUser = createAsyncThunk('admin/deleteUser', async (userId, {rejectWithValue}) => {
        try {
            const {data} = await axios.delete(`/api/v1/admin/user/${userId}`);
            return {...data,id:userId};
            
        }catch(error){
            return rejectWithValue(
                error.response?.data || "Failed to Delete this User"
            );
        }
    }
);



const adminSlice = createSlice({
    name:'admin',
    initialState:{
        products:[],
        product:null,
        success:false,
        deleteSuccess:false,
        loading:false,
        updateLoading:false,
        deleteLoading:false,
        error:null,
        users:[],
        user:{}
    },
    reducers:{
        removeErrors:(state)=>{
            state.error=null
        },
        removeSuccess:(state)=>{
            state.success=null
        },
        removeDeleteSuccess:(state)=>{
        state.deleteSuccess=false
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchAdminProducts.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled,(state,action)=>{
                state.loading = false;
                state.products = action.payload.products;
            })
            .addCase(fetchAdminProducts.rejected,(state,action)=>{
                state.loading = false;
                state.error  = action.payload?.message || 'Error While Fetching the Products'
            })
        builder
            .addCase(createProduct.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled,(state,action)=>{
                state.loading = false;
                state.success = action.payload.success;
                state.products.push(action.payload.product);
                console.log([...state.products]);
                
            })
            .addCase(createProduct.rejected,(state,action)=>{
                state.loading = false;
                state.error  = action.payload?.message || '"Product Creation Failed!"'
            })
        builder
            .addCase(getAdminProductDetails.pending,(state)=>{
                state.loading = true;
                 state.product=null;
                state.error = null;
            })

            .addCase(getAdminProductDetails.fulfilled,(state,action)=>{
                console.log("API DATA:", action.payload);
                state.loading=false;
                state.product=action.payload.product;
            })

            .addCase(getAdminProductDetails.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload?.message || "Product Details Failed";
            })
        builder
            .addCase(updateProduct.pending,(state)=>{
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled,(state,action)=>{
                state.updateLoading = false;
                state.success = action.payload.success;
                state.product = action.payload.product;
            })
            .addCase(updateProduct.rejected,(state,action)=>{
                state.updateLoading = false;
                state.error = action.payload?.message || "Product Update Failed";
            })
        builder
            .addCase(deleteProduct.pending,(state)=>{
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled,(state,action)=>{
                state.deleteLoading = false;
                state.deleteSuccess = true;

                state.products = state.products.filter(
                    product => product._id !== action.payload.id
                );
            })
            .addCase(deleteProduct.rejected,(state,action)=>{
                state.deleteLoading = false;
                state.error = action.payload?.message || "Product Delete Failed";
            })
        builder
            .addCase(fetchUsers.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled,(state,action)=>{
                state.loading = false;
                state.users = action.payload.users;
            })
            .addCase(fetchUsers.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload?.message || "Failed to Fetch Users";
            })
        builder
            .addCase(getSingleUser.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(getSingleUser.fulfilled,(state,action)=>{
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(getSingleUser.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload?.message || "Failed to Fetch this User";
            })
        builder
            .addCase(updateUserRole.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserRole.fulfilled,(state,action)=>{
                state.loading = false;
                state.success = action.payload.success;
            })
            .addCase(updateUserRole.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload?.message || "Failed to Update User Role";
            })
        builder
            .addCase(deleteUser.pending,(state)=>{
                state.deleteLoading  = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled,(state,action)=>{
                state.deleteLoading  = false;
                state.deleteSuccess = action.payload.success;
                state.users = state.users.filter(
                    user => user._id !== action.payload.id
                );
            })
            .addCase(deleteUser.rejected,(state,action)=>{
                state.deleteLoading  = false;
                state.error = action.payload?.message || "Failed to Delete this User";
            })
    }
})

export const {
    removeErrors,
    removeSuccess,
    removeDeleteSuccess
} = adminSlice.actions;
export default adminSlice.reducer;