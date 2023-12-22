// TournamentList.tsx
import {Button, CircularProgress, Grid, Box} from '@mui/material';
import {AddTournamentModal} from './AddTournamentModal.tsx';
import {EditTournamentModal} from './EditTournamentModal.tsx';
import {DeleteTournamentModal} from './DeleteTournamentModal.tsx';
import {useGetTournamentsQuery} from "../../api/tournamentApiSlice.ts";
import {useState} from "react";
import React from 'react';
import {Link} from "react-router-dom";
import {Tournament} from "../../api/types.ts";
import {jwtDecode} from "jwt-decode";

export function TournamentList() {
    const [open, setOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [tournamentToEdit, setTournamentToEdit] = useState<Tournament | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [tournamentToDelete, setTournamentToDelete] = useState<string | null>(null);
    const { data: tournaments, isLoading, isError, error } = useGetTournamentsQuery();

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token!);
    const decodedTokenRole = decodedToken.ROLE!;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if(isLoading) {
        return <CircularProgress/>;
    }

    if(isError || error) {
        //TODO gracefully handle errors
    }

    return (
        <Box bgcolor="white">
            <Button onClick={handleOpen}>Add Tournament</Button>
            <AddTournamentModal isOpen={open} onClose={handleClose}/>
            {tournamentToEdit ? <EditTournamentModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} tournament={tournamentToEdit}/> : null}
            <DeleteTournamentModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} tournamentId={tournamentToDelete!}/>
            <Grid container justifyContent="center" sx={{ p: 3, border: '1px solid grey', borderRadius: '4px', backgroundColor: '#f5f5f5' }}>
                <Grid item xs={10}><strong>Name</strong></Grid>
                <Grid item xs={2}><strong>Actions</strong></Grid>
                {tournaments?.map((tournament) => (
                    <React.Fragment key={tournament.id}>
                        <Grid item xs={10}>
                            {decodedTokenRole === "ROLE_ADMIN" ? <Link to={`/tournaments/${tournament.id}/matches`}>{tournament.name}</Link> : <p>{tournament.name}</p> }
                        </Grid>
                        <Grid item xs={2}>
                            <Button color="primary" onClick={() => { setTournamentToEdit(tournament); setEditModalOpen(true); }}>Edit</Button>
                            <Button color="secondary" onClick={() => { setTournamentToDelete(tournament.id); setDeleteModalOpen(true); }}>Delete</Button>
                        </Grid>
                    </React.Fragment>
                ))}
            </Grid>
        </Box>
    );
}