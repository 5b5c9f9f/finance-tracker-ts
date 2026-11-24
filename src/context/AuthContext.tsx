import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types/auth";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => boolean;
    register: (name: string, email: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_KEY = "finflow_current_user";
const USERS_DB_KEY = "finflow_users_db";

interface StoredUser extends User {
    password: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem(CURRENT_USER_KEY);
        return saved ? JSON.parse(saved) : null;
    });

    const register = (
        name: string,
        email: string,
        password: string,
    ): boolean => {
        const usersRaw = localStorage.getItem(USERS_DB_KEY);
        const users: StoredUser[] = usersRaw ? JSON.parse(usersRaw) : [];

        if (users.some((u) => u.email === email)) {
            return false;
        }

        const newUser: StoredUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
        };

        localStorage.setItem(USERS_DB_KEY, JSON.stringify([...users, newUser]));

        const publicUser: User = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        };
        setUser(publicUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(publicUser));
        return true;
    };

    const login = (email: string, password: string): boolean => {
        const usersRaw = localStorage.getItem(USERS_DB_KEY);
        const users: StoredUser[] = usersRaw ? JSON.parse(usersRaw) : [];

        const found = users.find(
            (u) => u.email === email && u.password === password,
        );
        if (!found) {
            return false;
        }

        const publicUser: User = {
            id: found.id,
            name: found.name,
            email: found.email,
        };
        setUser(publicUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(publicUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(CURRENT_USER_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth должен использоваться внутри AuthProvider");
    }
    return context;
}
