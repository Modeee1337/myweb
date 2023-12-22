// MatchMaps.tsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMatchMapsQuery } from "../../../../api/matchMapSlice.ts";
import { Button, Grid, Box } from '@mui/material';
import { AddMatchMapModal } from './AddMatchMapModal.tsx';
import React from 'react';

import DeleteMatchMapModal from "./DeleteMatchMapModal.tsx";
import {EditMatchMapModal} from "./EditMatchMapModal.tsx";
import {MatchMap} from "../../../../api/types.ts";

export function MatchMaps() {
    const { tournamentId = '', matchId = '' } = useParams();
    const { data, error, isLoading } = useGetMatchMapsQuery({ tournamentId, matchId });

    const [open, setOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [mapToEdit, setMapToEdit] = useState<MatchMap | null>(null);
    const [mapToDelete, setMapToDelete] = useState<string | null>(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Something went wrong</div>

    return (
        <Box bgcolor="white">
            <Button onClick={handleOpen}>Add Match Map</Button>
            <AddMatchMapModal isOpen={open} onClose={handleClose} />
            {mapToEdit ? <EditMatchMapModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} matchMap={mapToEdit} /> : null}
            {mapToDelete ? <DeleteMatchMapModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} matchMapId={mapToDelete} /> : null}
            <Grid container justifyContent="center" sx={{ p: 3, border: '1px solid grey', borderRadius: '4px', backgroundColor: '#f5f5f5' }}>
                <Grid item xs={2}><strong>Result</strong></Grid>
                <Grid item xs={1}><strong>CT</strong></Grid>
                <Grid item xs={1}><strong>T</strong></Grid>
                <Grid item xs={1}><strong>Rank</strong></Grid>
                <Grid item xs={2}><strong>Map Wins</strong></Grid>
                <Grid item xs={2}><strong>Map Winner</strong></Grid>
                <Grid item xs={2}><strong>Actions</strong></Grid>
                {data?.map((map) => (
                    <React.Fragment key={map.id}>
                        <Grid item xs={2}>{map.resultTeamOne} : {map.resultTeamTwo}</Grid>
                        <Grid item xs={1}>{map.ctOne} : {map.ctTwo}</Grid>
                        <Grid item xs={1}>{map.tOne} : {map.tTwo}</Grid>
                        <Grid item xs={1}>{map.rankOne} : {map.rankTwo}</Grid>
                        <Grid item xs={2}>{map.mapWinsOne} : {map.mapWinsTwo}</Grid>
                        <Grid item xs={2}>{map.mapWinner}</Grid>
                        <Grid item xs={2}>
                            <Button color="primary" onClick={() => { setMapToEdit(map); setEditModalOpen(true); }}>Edit</Button>
                            <Button color="secondary" onClick={() => { setMapToDelete(map.id); setDeleteModalOpen(true); }}>Delete</Button>
                        </Grid>
                    </React.Fragment>
                ))}
            </Grid>
        </Box>
    );
}