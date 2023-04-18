import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Початковий стан для тестів
const initialState = {
    items: [
        { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
        { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
        { id: "id-3", name: "Eden Clements", number: "645-17-79" },
        { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
};

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        addContact: {
            reducer(state, action) {
                state.items.push(action.payload);
            },
            prepare(contactsData) {
                return {
                    payload: { ...contactsData },
                };
            },
        },
        deleteContact(state, action) {
            const index = state.items.findIndex(
                contact => contact.id === action.payload
            );
            state.items.splice(index, 1);
        },
    },
});

export const contactsReducer = contactsSlice.reducer;

const persistConfig = {
    key: "root",
    storage,
};

export const persistedContactsReducer = persistReducer(
    persistConfig,
    contactsReducer
);
export const { addContact, deleteContact } = contactsSlice.actions;
