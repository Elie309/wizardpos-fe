
import { createSlice } from '@reduxjs/toolkit';

export interface OrderState {
    orders: any[];
}

const initialState: OrderState = {
    orders: [],
};
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder: (state, action) => {
        state.orders.push(action.payload);
        },
        removeOrder: (state, action) => {
        state.orders = state.orders.filter((order) => order.id !== action.payload);
        },
    },
    });
    

export const { addOrder, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;

