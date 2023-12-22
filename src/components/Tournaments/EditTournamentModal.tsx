// EditTournamentModal.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField } from '@mui/material';
import { useUpdateTournamentMutation } from '../../api/tournamentApiSlice.ts';
import ModalBase from '../ModalBase.tsx';
import {Tournament} from "../../api/types.ts";
import {toast} from "react-toastify";

const TournamentFormSchema = z.object({
    name: z.string().min(10).max(255),
});

type TournamentFormInputs = z.infer<typeof TournamentFormSchema>;

interface EditTournamentModalProps {
    isOpen: boolean;
    onClose: () => void;
    tournament: Tournament;
}

export function EditTournamentModal({ isOpen, onClose, tournament }: EditTournamentModalProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<TournamentFormInputs>({
        resolver: zodResolver(TournamentFormSchema),
        defaultValues: tournament,
    });
    const [updateTournament] = useUpdateTournamentMutation();

    const onSubmit = async (data: TournamentFormInputs) => {
        try {
            await updateTournament({ ...data, id: tournament.id }).unwrap();
            onClose();
            toast.success('Tournament updated successfully!', {position: "bottom-left"});
        } catch (error) {
            // Handle the error...
        }
    };

    return (
        <ModalBase
            isOpen={isOpen}
            title="Edit Tournament"
            onConfirm={handleSubmit(onSubmit)}
            confirmButtonText="Save"
            onCancel={onClose}
            cancelButtonText="Cancel"
        >
            <form style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    color: 'white',
                }
            } onSubmit={handleSubmit(onSubmit)}>
                <TextField {...register('name')} label="Name" error={!!errors.name} helperText={errors.name?.message} />
            </form>
        </ModalBase>
    );
}