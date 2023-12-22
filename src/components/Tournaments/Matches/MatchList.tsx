// MatchList.tsx
import {Button, CircularProgress, Grid, Box} from '@mui/material';
import {AddMatchModal} from './AddMatchModal.tsx';
import {EditMatchModal} from './EditMatchModal.tsx';
import {DeleteMatchModal} from './DeleteMatchModal.tsx';
import {useGetMatchesQuery} from "../../../api/matchesApiSlice.ts";
import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import React from 'react';
import {Match} from "../../../api/types.ts";

export function MatchList() {
    const {tournamentId } = useParams<{ tournamentId: string }>();
    const [open, setOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [matchToEdit, setMatchToEdit] = useState<Match | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [matchToDelete, setMatchToDelete] = useState<string | null>(null);
    const { data: matches, isLoading, isError, error } = useGetMatchesQuery(tournamentId!);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if(isLoading) {
        return <CircularProgress/>;
    }

    if(isError || error) {
        //TODO handle errors gracefully
    }

    return (
        <Box bgcolor="white">
            <Button onClick={handleOpen}>Add Match</Button>
            <AddMatchModal isOpen={open} onClose={handleClose}/>
            {matchToEdit ? <EditMatchModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} match={matchToEdit}/> : null}
            <DeleteMatchModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} matchId={matchToDelete!}/>
            <Grid container justifyContent="center" sx={{ p: 3, border: '1px solid grey', borderRadius: '4px', backgroundColor: '#f5f5f5' }}>
                <Grid item xs={6}><strong>Start Date</strong></Grid>
                <Grid item xs={3}><strong>Tournament ID</strong></Grid>
                <Grid item xs={3}><strong>Actions</strong></Grid>
                {matches?.map((match) => (
                    <React.Fragment key={match.id}>
                        <Grid item xs={6}>
                            <Link to={`/tournaments/${tournamentId}/matches/${match.id}/matchmaps`}>{match.startDate}</Link>
                        </Grid>
                        <Grid item xs={3}>
                            {match.tournament.id}
                        </Grid>
                        <Grid item xs={3}>
                            <Button color="primary" onClick={() => { setMatchToEdit(match); setEditModalOpen(true); }}>Edit</Button>
                            <Button color="secondary" onClick={() => { setMatchToDelete(match.id); setDeleteModalOpen(true); }}>Delete</Button>
                        </Grid>
                    </React.Fragment>
                ))}
            </Grid>
        </Box>
    );
}