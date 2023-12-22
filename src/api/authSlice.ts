import { apiSlice } from './apiSlice.ts';
import {AuthData, User} from "./types.ts";

type AuthenticationResponse = {
    accessToken: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<AuthenticationResponse, User>({
            query: (newUser) => ({
                url: '/auth/register',
                method: 'POST',
                body: newUser,
            }),
        }),
        authenticate: builder.mutation<AuthenticationResponse, AuthData>({
            query: (authData) => ({
                url: '/auth/authenticate',
                method: 'POST',
                body: authData,
            }),
        }),
    }),
})

export const {
    useRegisterMutation,
    useAuthenticateMutation,
} = authApiSlice;