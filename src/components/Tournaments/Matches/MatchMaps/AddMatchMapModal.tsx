// AddMatchMapModal.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField } from '@mui/material';
import { useCreateMatchMapMutation } from "../../../../api/matchMapSlice.ts";
import ModalBase from "../../../ModalBase.tsx";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";

const MatchMapFormSchema = z.object({
    resultTeamOne: z.coerce.number().nonnegative().int(),
    resultTeamTwo: z.coerce.number().nonnegative().int(),
    ctOne: z.coerce.number().nonnegative().int(),
    ctTwo: z.coerce.number().nonnegative().int(),
    tOne: z.coerce.number().nonnegative().int(),
    tTwo: z.coerce.number().nonnegative().int(),
    rankOne: z.coerce.number().positive().int(),
    rankTwo: z.coerce.number().positive().int(),
    mapWinsOne: z.coerce.number().nonnegative().int(),
    mapWinsTwo: z.coerce.number().nonnegative().int(),
    mapWinner: z.coerce.number().int().min(1).max(2),
});

type MatchMapFormInputs = z.infer<typeof MatchMapFormSchema>;

interface AddMatchMapModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddMatchMapModal({ isOpen, onClose }: AddMatchMapModalProps) {
    const { tournamentId, matchId } = useParams<{ tournamentId: string, matchId : string }>();
    const { register, handleSubmit, formState: { errors } } = useForm<MatchMapFormInputs>({
        resolver: zodResolver(MatchMapFormSchema),
    });
    const [addMatchMap] = useCreateMatchMapMutation();

    const onSubmit = async (data: MatchMapFormInputs) => {
        try {
            await addMatchMap({
                map : {
                    resultTeamOne: data.resultTeamOne,
                    resultTeamTwo: data.resultTeamTwo,
                    ctOne: data.ctOne,
                    ctTwo: data.ctTwo,
                    tOne: data.tOne,
                    tTwo: data.tTwo,
                    rankOne: data.rankOne,
                    rankTwo: data.rankTwo,
                    mapWinsOne: data.mapWinsOne,
                    mapWinsTwo: data.mapWinsTwo,
                    mapWinner: data.mapWinner,

                },
                matchId: matchId!,
                tournamentId: tournamentId!,
            }).unwrap();
            onClose();
            toast.success('Match Map added successfully!', {position: "bottom-left"})
        } catch (error) {
            // Handle the error...
        }
    };

    return (
        <ModalBase
            isOpen={isOpen}
            title="Add Match Map"
            onConfirm={handleSubmit(onSubmit)}
            confirmButtonText="Add"
            onCancel={onClose}
            cancelButtonText="Cancel"
        >
            <form style={
                {
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "center",
                }
            } onSubmit={handleSubmit(onSubmit)}>
                <TextField type="number" {...register('resultTeamOne')} label="Result Team One" error={!!errors.resultTeamOne} helperText={errors.resultTeamOne?.message} />
                <TextField type="number" {...register('resultTeamTwo')} label="Result Team Two" error={!!errors.resultTeamTwo} helperText={errors.resultTeamTwo?.message} />
                <TextField type="number" {...register('ctOne')} label="CT One" error={!!errors.ctOne} helperText={errors.ctOne?.message} />
                <TextField type="number" {...register('ctTwo')} label="CT Two" error={!!errors.ctTwo} helperText={errors.ctTwo?.message} />
                <TextField type="number" {...register('tOne')} label="T One" error={!!errors.tOne} helperText={errors.tOne?.message} />
                <TextField type="number" {...register('tTwo')} label="T Two" error={!!errors.tTwo} helperText={errors.tTwo?.message} />
                <TextField type="number" {...register('rankOne')} label="Rank One" error={!!errors.rankOne} helperText={errors.rankOne?.message} />
                <TextField type="number" {...register('rankTwo')} label="Rank Two" error={!!errors.rankTwo} helperText={errors.rankTwo?.message} />
                <TextField type="number" {...register('mapWinsOne')} label="Map Wins One" error={!!errors.mapWinsOne} helperText={errors.mapWinsOne?.message} />
                <TextField type="number" {...register('mapWinsTwo')} label="Map Wins Two" error={!!errors.mapWinsTwo} helperText={errors.mapWinsTwo?.message} />
                <TextField type="number" {...register('mapWinner')} label="Map Winner" error={!!errors.mapWinner} helperText={errors.mapWinner?.message} />
            </form>
        </ModalBase>
    );
}