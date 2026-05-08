import { createContext } from 'react';

export type UserContextType = {
	userName: string;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
