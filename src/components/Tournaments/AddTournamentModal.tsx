// AddTournamentModal.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField } from '@mui/material';
import { useCreateTournamentMutation } from '../../api/tournamentApiSlice.ts';
import ModalBase from "../ModalBase.tsx";
import {toast} from "react-toastify";

const TournamentFormSchema = z.object({
    name: z.string().min(10).max(255),
});

type TournamentFormInputs = z.infer<typeof TournamentFormSchema>;

interface AddTournamentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddTournamentModal({ isOpen, onClose }: AddTournamentModalProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<TournamentFormInputs>({
        resolver: zodResolver(TournamentFormSchema),
    });
    const [addTournament] = useCreateTournamentMutation();

    const onSubmit = async (data: TournamentFormInputs) => {
        try {
            await addTournament(data).unwrap();
            onClose();
            toast.success('Tournament added successfully!', {position: "bottom-left"})
        } catch (error) {
            // Handle the error...
        }
    };

    return (
        <ModalBase
            isOpen={isOpen}
            title="Add Tournament"
            onConfirm={handleSubmit(onSubmit)}
            confirmButtonText="Add"
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