import { createSlice } from "@reduxjs/toolkit";

const initialArray = [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

export const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
        items: [...initialArray],
        filter: "",
    },
    reducers: {
        filterContacts(state, action) {
            state.filter = action.payload;
        },
        addContact(state, action) {
            state.items.push(action.payload);
        },
        deleteContact(state, action) {
            state.items = state.items.filter(contact => {
                return contact.id !== action.payload;
            });
        },
    },
});

export const { addContact, deleteContact, filterContacts } =
    contactsSlice.actions;
