import React, { useState } from "react";
import { User } from "../entities/user";

export type UserContextType = {
    user?: User;
    setUser: (user?: User) => void;
}

export const UserContext = React.createContext<UserContextType>({
    user: undefined,
    setUser: () => { }
});

interface Props {
    children: React.ReactNode | React.ReactNode[]
}
export function UserContextProvider(props: Props) {
    const [user, setUser] = useState<User>();

    return <UserContext.Provider value={{ user, setUser }}>
        {props.children}
    </UserContext.Provider>
}