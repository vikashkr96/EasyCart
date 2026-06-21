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
        message:null,
        shippingInfo:{}
    },


    reducers:{

        removeError:(state)=>{
            state.error = null;
        },

        removeMessage:(state)=>{
            state.message = null;
        },


        updateCartQuantity:(state,action)=>{

            const {id, quantity} = action.payload;

            const item = state.cartItems.find(
                item=>item.product === id
            );

            if(item){
                item.quantity = quantity;
            }


            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.cartItems)
            );

        },


        removeCartItem:(state,action)=>{

            state.cartItems = state.cartItems.filter(
                item=>item.product !== action.payload
            );


            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.cartItems)
            );

        }

    },

        saveShippingInfo:(state,action)=>{
            state.shippingInfo = action.payload
            localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo));
    },


    extraReducers:(builder)=>{

        builder

        .addCase(AddItemsToCart.pending,(state)=>{

            state.loading=true;
            state.error=null;

        })


        .addCase(AddItemsToCart.fulfilled,(state,action)=>{
             state.error = null;
            const item = action.payload;


            const existingItem = state.cartItems.find(
                i=>i.product === item.product
            );


            if(existingItem){

                if(existingItem.quantity + item.quantity > item.stock){

                    state.error = `Only ${item.stock} items available`;
                    state.message = null;
                    state.success = false;
                    state.loading = false;

                    return;

                }

                existingItem.quantity += item.quantity;

                state.message = `${item.name} quantity updated in your cart`;

            }
            else{

                state.cartItems.push(item);

                state.message =
                `${item.name} has been added to your cart`;

            }


            state.loading=false;
            state.success=true;


            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.cartItems)
            );

        })


        .addCase(AddItemsToCart.rejected,(state,action)=>{

            state.loading=false;

            state.error =
            action.payload?.message || "An Error Occurred";

            state.message = null;
            state.success=false;

})

    }

});

export const {
    removeError,
    removeMessage,
    updateCartQuantity,
    removeCartItem,
    shippingInfo
} = cartSlice.actions;
export default cartSlice.reducer;