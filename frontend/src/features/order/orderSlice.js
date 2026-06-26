import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

// creating order 
export const createOrder = createAsyncThunk('order/createOrder', async(order,{rejectWithValue})=>{
    try{
        const config  = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data} = await axios.post("/api/v1/new/order",order,config);
        return data;
        

    }catch(error){
        return rejectWithValue(
        error.response?.data || "An error occurred while creating your order"
    );
    }
})

// Get user order 
export const getAllMyOrders = createAsyncThunk('order/getAllMyOrders', async(_,{rejectWithValue})=>{
    try{
        const {data} = await axios.get('/api/v1/orders/user')
        return data;
    }catch(error){
        return rejectWithValue(
        error.response?.data || "An error occurred while fetching your orders"
    );
    }
})

// Get  order details
export const getOrderDetails = createAsyncThunk('order/getOrderDetails', async(orderId,{rejectWithValue})=>{
    try{
        const {data} = await axios.get(`/api/v1/order/${orderId}`);
        return data;
    }catch(error){
        return rejectWithValue(
        error.response?.data || "An error occurred while fetching the order details"
    );
    }
})

const orderSlice = createSlice({
    name:'order',
    initialState:{
        success:false,
        loading:false,
        error:null,
        orders:[],
        order:{}
    },
    reducers:{
        removeErrors: (state) => {
            state.error = null;
        },

        removeSuccess: (state) => {
        state.success = false;
        }
    },
    extraReducers:(builder)=>{
        // create order
        builder
        .addCase(createOrder.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(createOrder.fulfilled,(state,action)=>{
            state.loading = false
            state.order = action.payload.order
            state.success = action.payload.success

        })
        .addCase(createOrder.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload?.message || 'An error occurred while creating your order';           
        }),


        // Get user order 
        builder
        .addCase(getAllMyOrders.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllMyOrders.fulfilled,(state,action)=>{
            state.loading = false
            state.orders = action.payload.orders
            state.success = action.payload.success

        })
        .addCase(getAllMyOrders.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload?.message || 'An error occurred while fetching your orders';           
        })
        // get order details
        builder
        .addCase(getOrderDetails.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getOrderDetails.fulfilled,(state,action)=>{
            state.loading = false
            state.order = action.payload.order
            state.success = action.payload.success

        })
        .addCase(getOrderDetails.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload?.message || 'An error occurred while fetching the order details';           
        })
    }

})
export const {removeErrors, removeSuccess} = orderSlice.actions;
export default orderSlice.reducer;