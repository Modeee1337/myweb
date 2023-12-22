// matchesApiSlice.ts
import { apiSlice } from './apiSlice.ts';
import {EditCreateMatch, Match} from "./types.ts";

export const matchesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMatches: builder.query<Match[], string>({
            query: (tournamentId) => ({url : `/tournaments/${tournamentId}/matches`, method: 'GET'}),
            providesTags: (_result, _error, tournamentId) => [{ type: 'Match', id: tournamentId }],
        }),
        getMatchById: builder.query<Match, {tournamentId: string, matchId: string}>({
            query: ({tournamentId, matchId}) => ({url : `/tournaments/${tournamentId}/matches/${matchId}`, method: 'GET'}),
            providesTags: (_result, _error, {matchId}) => [{ type: 'Match', id: matchId }],
        }),
        createMatch: builder.mutation<Match, {tournamentId: string, match: EditCreateMatch}>({
            query: ({tournamentId, match}) => ({
                url: `/tournaments/${tournamentId}/matches`,
                method: 'POST',
                body: match,
            }),
            invalidatesTags: (_result, _error, {tournamentId}) => [{ type: 'Match', id: tournamentId }],
        }),
        deleteMatch: builder.mutation<void, {tournamentId: string, matchId: string}>({
            query: ({tournamentId, matchId}) => ({
                url: `/tournaments/${tournamentId}/matches/${matchId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, {tournamentId}) => [{ type: 'Match', id: tournamentId }],
        }),
        updateMatch: builder.mutation<Match, {tournamentId: string,matchId : string, match: EditCreateMatch}>({
            query: ({tournamentId,matchId, match}) => ({
                url: `/tournaments/${tournamentId}/matches/${matchId}`,
                method: 'PUT',
                body: match,
            }),
            invalidatesTags: (_result, _error, {tournamentId}) => [{ type: 'Match', id: tournamentId }],
        }),
    }),
})

export const {
    useGetMatchesQuery,
    useGetMatchByIdQuery,
    useCreateMatchMutation,
    useDeleteMatchMutation,
    useUpdateMatchMutation,
} = matchesApiSlice;