// matchMapsApiSlice.ts
import { apiSlice } from './apiSlice.ts';
import {MatchMap} from "./types.ts";

export const matchMapsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMatchMaps: builder.query<MatchMap[], {tournamentId: string, matchId: string}>({
            query: ({tournamentId, matchId}) => ({url : `/tournaments/${tournamentId}/matches/${matchId}/match-maps`, method: 'GET'}),
            providesTags: (result, _error, { matchId }) => result ? result.map(() => ({ type: 'MatchMap', id: `${matchId}` })) : [],
        }),
        getMatchMapById: builder.query<MatchMap, {tournamentId: string, matchId: string, mapId: string}>({
            query: ({tournamentId, matchId, mapId}) => ({url : `/tournaments/${tournamentId}/matches/${matchId}/match-maps/${mapId}`, method: 'GET'}),
            providesTags: (_result, _error, {mapId}) => [{ type: 'MatchMap', id: mapId }],
        }),
        createMatchMap: builder.mutation<MatchMap, {tournamentId: string, matchId: string, map: Omit<MatchMap, 'id'>}>({
            query: ({tournamentId, matchId, map}) => ({
                url: `/tournaments/${tournamentId}/matches/${matchId}/match-maps`,
                method: 'POST',
                body: map,
            }),
            invalidatesTags: (_result, _error, { matchId }) => [{ type: 'MatchMap', id: `${matchId}` }],
        }),
        deleteMatchMap: builder.mutation<void, {tournamentId: string, matchId: string, mapId: string}>({
            query: ({tournamentId, matchId, mapId}) => ({
                url: `/tournaments/${tournamentId}/matches/${matchId}/match-maps/${mapId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, { matchId }) => [{ type: 'MatchMap', id: `${matchId}` }],
        }),
        updateMatchMap: builder.mutation<void, {tournamentId: string, matchId: string, map: MatchMap}>({
            query: ({tournamentId, matchId, map}) => ({
                url: `/tournaments/${tournamentId}/matches/${matchId}/match-maps/${map.id}`,
                method: 'PUT',
                body: map,
            }),
            invalidatesTags: (_result, _error, { matchId, map }) => [{ type: 'MatchMap', id: `${matchId}-${map.id}` }],
        }),
    }),
})

export const {
    useGetMatchMapsQuery,
    useGetMatchMapByIdQuery,
    useCreateMatchMapMutation,
    useDeleteMatchMapMutation,
    useUpdateMatchMapMutation,
} = matchMapsApiSlice;