// AuthContext.tsx
import { jwtDecode } from "jwt-decode";
import React, {ReactNode, createContext, useEffect, useState} from "react";

interface AuthContextProps {
    token: string | null;
    role: string | null;
    isTokenExpired: boolean;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
    token: null,
    role: null,
    isTokenExpired: true,
    setToken: () => {},
});

export const AuthProvider: React.FC <AuthProviderProps>= ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [isTokenExpired, setIsTokenExpired] = useState<boolean>(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const decodedToken: any = jwtDecode(storedToken);
            setToken(storedToken);
            setRole(decodedToken.ROLE);
            setIsTokenExpired(decodedToken.exp < Date.now() / 1000);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ token, role, isTokenExpired, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};