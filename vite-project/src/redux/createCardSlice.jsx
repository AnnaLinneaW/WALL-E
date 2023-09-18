import { createSlice } from "@reduxjs/toolkit";
import { AddCards } from "../routes/AddCards";

const {cardFirstName, cardLastName} = AddCards;

const addCardSlice = createSlice({
    name: "cardSlice",
    initialState: {
    cards:[
       {firstName: cardFirstName,
        lastName: cardLastName,
        cardNumber: "5003 1234 5678 9012",
        cvv: "988",
        expirationMonth: "12",
        expirationYear: "23",
        cardVendor: "VISA",
        cardActive: true,
    }
    ]
    },
    reducers: {
        addCard: (state, action) => {
            state.cards.push(action.payload);
        },
    },
});

export default addCardSlice.reducer;
export const { addCard, increment, } = addCardSlice.actions;