// PrivateRoute.tsx
import {Navigate, Outlet} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {toast} from "react-toastify";
import {Role} from "../../api/types.ts";

interface PrivateRouteProps {
    allowedRoles: Role[];
}

export function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
    const token = localStorage.getItem('token');

    if(token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now()/1000; // Convert to seconds

        if(decodedToken.exp && decodedToken.exp > currentTime) {
            return <Outlet />;
        }

        console.log('Token expired');
        toast.info('Your session has expired. Please login again.', {position: "bottom-left"})
        localStorage.removeItem('token');
    }

    return <Navigate to="/login" replace />;
}