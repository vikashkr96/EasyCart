import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Add items to cart
export const AddItemsToCart = createAsyncThunk('cart/AddItemsToCart', async ({id, quantity}, { rejectWithValue }) => {
    try {
        const {data} = await axios.get(`/api/v1/product/${id}`);
        return {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }

    } catch (error) {
    return rejectWithValue(
        error.response?.data || "An Error Occurred"
    );
}
});





const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems:JSON.parse(localStorage.getItem('cartItems')) || [],
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
                state.loading = true
                state.error= null

            })
            .addCase(AddItemsToCart.fulfilled, (state, action)=>{
                const item = action.payload

                const existingItem = state.cartItems.find((i)=>i.product === item.product)
                if(existingItem){
                    existingItem.quantity += item.quantity;
                    state.message = `${item.name} quantity updated in your cart`;
                }else{
                    state.cartItems.push(item);
                    state.message = `${item.name} has been added to your cart`;
                }

                state.loading = false
                state.error= null
                state.success= true

                localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
                
            })
            .addCase(AddItemsToCart.rejected, (state,action)=>{
                state.loading = false
                state.error = action.payload?.message || 'An Error Occurred'
                state.success = false;
            })


    }
})

export const {removeError, removeMessage} = cartSlice.actions;
export default cartSlice.reducer;