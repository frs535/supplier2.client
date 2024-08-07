import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createLogger } from 'redux-logger';
import {ecomSlice, EcomState} from "./slices/ecomSlice";
import offersSlice, {OffersState} from "./slices/offersSlice";
import {offerApi} from "../api/api.ts";
import {combineReducers, configureStore} from "@reduxjs/toolkit";

export interface ConfigState {
    "ecom": EcomState;
    "offers": OffersState;
}

const logger = createLogger();

const reducers = {
    [ecomSlice.name]: ecomSlice.reducer,
    [offersSlice.name]: offersSlice.reducer,
    "offerApi" : offerApi.reducer,
};

const rootReducer = combineReducers<typeof reducers>(reducers);

const initialState = {};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        }).concat([
            logger,
            offerApi.middleware
        ]);
    },
    devTools: import.meta.env.NODE_ENV !== 'production',
    preloadedState: initialState,
    // enhancers: (defaultEnhancers) => [...defaultEnhancers]
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

