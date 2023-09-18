import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCardUser = createAsyncThunk(
    "addCardSlice/getCardUser",  
    async () => {
        let response = await fetch("https://randomuser.me/api/")
        const data = await response.json();
        return data;
    });


const addNameSlice = createSlice({
    name: "addNameSlice",
    initialState: {
        card: "",
        status: null,
    },
    reducers: {
        addName: (state, action) => {
            state.card = action.payload;
        },            
        getCardUser: async () => {},
    },
    extraReducers: {
        [getCardUser.pending]: (state, action) => {
            state.status = "loading";
        }
        ,
        [getCardUser.fulfilled]: (state, { payload }) => {
            state.status = "success";
            state.card = payload;
        }
        ,
        [getCardUser.rejected]: (state, action) => {
            state.status = "failed";
        }
    }
});

export default addNameSlice.reducer;
export const { addName, increment} = addNameSlice.actions;
