// файл стоврення стореджа redux
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import { contactsSlice } from "./contactsSlice";

const contactsReducer = contactsSlice.reducer;

const persistConfig = {
    key: "contacts",
    storage,
};

const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);

export const store = configureStore({
    reducer: {
        contacts: persistedContactsReducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        });
    },
});

export const persistor = persistStore(store);
