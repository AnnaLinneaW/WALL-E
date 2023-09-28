import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCardUser = createAsyncThunk(
  "addCardSlice/getCardUser",
  async () => {
    let response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    return data;
  }
);

const createCardSlice = createSlice({
  name: "card",
  initialState: {
    cards: [
      {
        firstName: "",
        lastName: "",
        cardNumber: "5003 1234 5678 9012",
        cvv: "988",
        expirationMonth: "12",
        expirationYear: "23",
        cardVendor: "EveCard",
        cardActive: true,
      },
    ],
  },
  reducers: {
    addName: (state, action) => {
      state.cards = action.payload;
    },
    getCardUser: async () => {},

    addCard: (state, action) => {
      state.cards.push({ ...action.payload });
    },
    deleteCard: (state, action) => {
      state.cards.splice(action.payload, 1);
    },
    activeCard: (state, action) => {
      const cardIndex = action.payload.index;
      const updatedCards = state.cards.map((card, index) => {
        if (index === cardIndex) {
          return { ...card, cardActive: true };
        } else {
          return { ...card, cardActive: false };
        }
      });

      state.cards = updatedCards;
    },
  },
  extraReducers: {
    [getCardUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCardUser.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.card = payload;
      state.cards[0].firstName = payload.results[0].name.first;
      state.cards[0].lastName = payload.results[0].name.last;
    },
    [getCardUser.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default createCardSlice.reducer;
export const { addName, increment } = createCardSlice.actions;
export const { addCard, deleteCard, activeCard } = createCardSlice.actions;
export const selectCard = (state) => state.addName.card;
