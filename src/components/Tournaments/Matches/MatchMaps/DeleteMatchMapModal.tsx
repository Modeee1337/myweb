// DeleteMatchMapModal.tsx
import {useDeleteMatchMapMutation} from "../../../../api/matchMapSlice.ts";
import ModalBase from "../../../ModalBase.tsx";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";

interface EditMatchMapModalProps {
    isOpen: boolean;
    onClose: () => void;
    matchMapId: string;
}

function DeleteMatchMapModal({ isOpen, onClose, matchMapId } : EditMatchMapModalProps) {
    const { tournamentId, matchId } = useParams<{ tournamentId: string, matchId : string }>();
    const [deleteMatchMap] = useDeleteMatchMapMutation();

    const handleDelete = async () => {
        try {
            await deleteMatchMap({
                tournamentId: tournamentId!,
                matchId: matchId!,
                mapId: matchMapId
            }).unwrap();
            onClose();
            toast.success('Match Map deleted successfully!', {position: "bottom-left"})
        } catch (error) {
            // Handle the error...
        }
    };

    return (
        <ModalBase
            isOpen={isOpen}
            title="Delete Match Map"
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
            }>Are you sure you want to delete this match map?</p>
        </ModalBase>
    );
}

export default DeleteMatchMapModal;