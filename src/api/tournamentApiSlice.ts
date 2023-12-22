// tournamentApiSlice.ts
import { apiSlice } from './apiSlice.ts';
import {Tournament} from "./types.ts";

export const tournamentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTournaments: builder.query<Tournament[], void>({
            query: () => ({url : '/tournaments', method: 'GET'}),
            providesTags: (result) => result ? result.map(({ id }) => ({ type: 'Tournament', id })) : [],
        }),
        getTournamentById: builder.query<Tournament, string>({
            query: (id) => ({url : `/tournaments/${id}`, method: 'GET'}),
            providesTags: (result) => [{ type: 'Tournament', id: result!.id }],
        }),
        createTournament: builder.mutation<void, Omit<Tournament, 'id'>>({
            query: (newTournament) => ({
                url: '/tournaments',
                method: 'POST',
                body: newTournament,
            }),
            invalidatesTags: [{ type: 'Tournament' }],
        }),
        deleteTournament: builder.mutation<void, string>({
            query: (id) => ({
                url: `/tournaments/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, id) => [{ type: 'Tournament', id }],
        }),
        updateTournament: builder.mutation<void, Tournament>({
            query: (updatedTournament) => ({
                url: `/tournaments/${updatedTournament.id}`,
                method: 'PUT',
                body: updatedTournament,
            }),
            invalidatesTags: (_result, _error, {id}) => [{ type: 'Tournament', id }],
        }),
    }),
})

export const {
    useGetTournamentsQuery,
    useGetTournamentByIdQuery,
    useCreateTournamentMutation,
    useDeleteTournamentMutation,
    useUpdateTournamentMutation,
} = tournamentApiSlice;