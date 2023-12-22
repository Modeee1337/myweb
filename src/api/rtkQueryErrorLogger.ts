// rtkQueryErrorLogger.ts
import {isRejectedWithValue, Middleware} from '@reduxjs/toolkit';
import {toast} from "react-toastify";

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        console.warn('We got a rejected action!');
        toast.error(action.error.message, {position: "bottom-left"});
    }
    return next(action);
};