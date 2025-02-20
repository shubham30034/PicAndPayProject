import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "productSlice",
    initialState: {
        product: [] 
    },
    reducers: {
        addProduct: (state, action) => {
            if (state.product.length < 3) {
                state.product.push(action.payload); 
            }
        },
        removeProducts: (state) => {
            state.product = []; 
        }
    }
});

export const { addProduct, removeProducts } = productSlice.actions;
export default productSlice.reducer;
