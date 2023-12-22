// apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQueryWithJWT = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL!,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        else{
            localStorage.removeItem('token');
        }
        return headers;
    },
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithJWT,
    tagTypes: ['Tournament', 'Match', 'MatchMap', 'Auth'],
    endpoints: () => ({}), // No endpoints defined here
});