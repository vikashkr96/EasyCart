import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Add items to cart
export const AddItemsToCart = createAsyncThunk('cart/AddItemsToCart', async ({id, quantity}, { rejectWithValue }) => {
    try {
        const {data} = await axios.get(`/api/v1/product/${id}`);
        console.log('Add items to cart - ', data);
        
        return data;

    } catch (error) {
    console.log("REGISTER ERROR:", error.response);
    return rejectWithValue(
        error.response?.data || "An Error Occurred"
    );
}
});





const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems:[],
        loading:false,
        error:null,
        success:false,
        message:null
    },
    reducers:{
        removeError:(state)=>{
            state.error= null
        },
        removeMessage:(state)=>{
            state.message= null
        },
    },extraReducers:(builder)=>{

        //Add items to cart
        builder
            .addCase(AddItemsToCart.pending, (state)=>{
                state.loading = true,
                state.error= null

            })
            .addCase(AddItemsToCart.fulfilled, (state, action)=>{
                const item = action.payload
                console.log(item);;
                
            })
            .addCase(AddItemsToCart.rejected, (state)=>{
                state.loading = false,
                state.error = action.payload?.message || 'An Error Occurred'
            })


    }
})

export const {removeError, removeMessage} = cartSlice.actions;
export default reducer;