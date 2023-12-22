// EditMatchModal.tsx
import { useForm, Controller } from 'react-hook-form';
import {Match} from "../../../api/types.ts";
import {useUpdateMatchMutation} from "../../../api/matchesApiSlice.ts";
import ModalBase from "../../ModalBase.tsx";
import {DateTimePicker} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";

interface MatchFormInputs {
    startDate: Date;
}

interface EditMatchModalProps {
    isOpen: boolean;
    onClose: () => void;
    match: Match;
}

export function EditMatchModal({ isOpen, onClose, match }: EditMatchModalProps) {
    const { tournamentId } = useParams<{ tournamentId: string }>();
    const { control, handleSubmit, formState: { errors } } = useForm<MatchFormInputs>({
        defaultValues: {startDate: dayjs(Date.now()).toDate()},
    });
    const [updateMatch] = useUpdateMatchMutation();

    const onSubmit = async (data: MatchFormInputs) => {
        try {
            await updateMatch({
                match: {startDate : data.startDate.toISOString()},
                tournamentId: tournamentId!,
                matchId: match.id,
            }).unwrap();
            onClose();
            toast.success('Match updated successfully!', {position: "bottom-left"})
        } catch (error) {
            // Handle the error...
        }
    };

    return (
        <ModalBase
            isOpen={isOpen}
            title="Edit Match"
            onConfirm={handleSubmit(onSubmit)}
            confirmButtonText="Save"
            onCancel={onClose}
            cancelButtonText="Cancel"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="startDate"
                        control={control}
                        rules={{ required: 'Start date is required' }}
                        render={({field: {onChange}}) => (
                            <DateTimePicker
                                label="Start Date"
                                onChange={onChange}
                                disablePast={true}
                            />
                        )}
                    />
                    {errors.startDate && <span>{errors.startDate.message}</span>}
                </form>
            </LocalizationProvider>
        </ModalBase>
    );
}