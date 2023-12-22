// AddMatchModal.tsx
import {Controller, useForm} from 'react-hook-form';
import {useCreateMatchMutation} from "../../../api/matchesApiSlice.ts";
import ModalBase from "../../ModalBase.tsx";
import {DateTimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";

interface MatchFormInputs {
    startDate: Date;
}

interface AddMatchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddMatchModal({isOpen, onClose}: AddMatchModalProps) {
    const { tournamentId } = useParams<{ tournamentId: string }>();
    const {control, handleSubmit, formState: {errors}} = useForm<MatchFormInputs>({
        defaultValues: {startDate: dayjs(Date.now()).toDate()},
    });
    const [createMatch] = useCreateMatchMutation();

    const onSubmit = async (data: MatchFormInputs) => {
        try {
            await createMatch({
                match: {startDate : data.startDate.toISOString()},
                tournamentId: tournamentId!,
            }).unwrap();
            onClose();
            toast.success('Match added successfully!', {position: "bottom-left"})
        } catch (error) {
            // Handle the error...
        }
    };

    return (
        <ModalBase
            isOpen={isOpen}
            title="Add Match"
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
                <Controller
                    name="startDate"
                    control={control}
                    rules={{ required: 'Start date is required' }}
                    render={({field: {onChange}}) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Start Date"
                                onChange={onChange}
                                disablePast={true}
                            />
                        </LocalizationProvider>
                    )}
                />
                {errors.startDate && <span>{errors.startDate.message}</span>}
            </form>
        </ModalBase>
    );
}