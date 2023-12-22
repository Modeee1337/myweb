// store.ts
import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from './apiSlice.ts';
import {rtkQueryErrorLogger} from './rtkQueryErrorLogger.ts';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, rtkQueryErrorLogger),
});

export default store;