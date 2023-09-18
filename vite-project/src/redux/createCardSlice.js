import { createSlice } from "@reduxjs/toolkit";

const addCardSlice = createSlice({
    name: "cardSlice",
    initialState: {
    cards:[
       {firstName: "",
        lastName: "",
        cardNumber: "",
        CVV: "",
        expirationDate: "",
        expirationYear: "",
        cardVendor: "",
        cardActive: false,}
    ]
    },
    reducers: {
        addCard: (state, action) => {
            state.cards.push(action.payload);
        },
    }
});

export default addCardSlice.reducer;
export const { addCard, increment, } = addCardSlice.actions;