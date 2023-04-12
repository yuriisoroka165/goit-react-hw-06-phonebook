import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Початковий стан для тестів
const initialState = [
    { id: 0, name: "Yurii Soroka", number: "111-11-11" },
    { id: 1, name: "Maria Soroka", number: "222-22-22" },
    { id: 2, name: "Maxim Soroka", number: "333-33-33" },
    { id: 3, name: "Victoria Soroka", number: "444-44-44" },
];

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        addContact: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(contactsData) {
                return {
                    payload: {
                        ...contactsData,
                    },
                };
            },
        },
        deleteContact(state, action) {
            const index = state.findIndex(
                contact => contact.id === action.payload
            );
            state.splice(index, 1);
        },
    },
});

const contactsReducer = contactsSlice.reducer;

const persistConfig = {
    key: "root",
    storage,
};

export const persistedContactsReducer = persistReducer(
    persistConfig,
    contactsReducer
);
export const { addContact, deleteContact } = contactsSlice.actions;
