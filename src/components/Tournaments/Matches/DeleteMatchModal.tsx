// DeleteMatchModal.tsx

import {useDeleteMatchMutation} from "../../../api/matchesApiSlice.ts";
import ModalBase from "../../ModalBase.tsx";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";

interface DeleteMatchModalProps {
    isOpen: boolean;
    onClose: () => void;
    matchId: string;
}

export function DeleteMatchModal({ isOpen, onClose, matchId }: DeleteMatchModalProps) {
    const { tournamentId } = useParams<{ tournamentId: string }>();
    const [deleteMatch] = useDeleteMatchMutation();

    const handleDelete = async () => {
        try {
            await deleteMatch({
                tournamentId: tournamentId!,
                matchId: matchId,
            }).unwrap();
            onClose();
            toast.success('Match deleted successfully!', {position: "bottom-left"})
        } catch (error) {
            // Handle the error...
        }
    };

    return (
        <ModalBase
            isOpen={isOpen}
            title="Delete Match"
            onConfirm={handleDelete}
            confirmButtonText="Delete"
            onCancel={onClose}
            cancelButtonText="Cancel"
        >
            <p>Are you sure you want to delete this match?</p>
        </ModalBase>
    );
}