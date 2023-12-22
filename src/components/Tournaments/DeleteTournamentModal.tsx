// DeleteTournamentModal.tsx
import { useDeleteTournamentMutation } from '../../api/tournamentApiSlice.ts';
import ModalBase from '../ModalBase.tsx';
import {toast} from "react-toastify";

interface DeleteTournamentModalProps {
    isOpen: boolean;
    onClose: () => void;
    tournamentId: string;
}

export function DeleteTournamentModal({ isOpen, onClose, tournamentId }: DeleteTournamentModalProps) {
    const [deleteTournament] = useDeleteTournamentMutation();
    const handleDelete = async () => {
        try {
            await deleteTournament(tournamentId).unwrap();
            onClose();
            toast.success('Tournament deleted successfully!', {position: "bottom-left"})
        } catch (error) {
            // Handle the error...
        }
    };

    return (
        <ModalBase
            isOpen={isOpen}
            title="Delete Tournament"
            onConfirm={handleDelete}
            confirmButtonText="Delete"
            onCancel={onClose}
            cancelButtonText="Cancel"
        >
            <p style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }
            }>Are you sure you want to delete this tournament?</p>
        </ModalBase>
    );
}