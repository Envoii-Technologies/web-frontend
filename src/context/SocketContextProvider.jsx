import { createContext, useState, useEffect, useContext } from "react";
import socketIOClient from 'socket.io-client';

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {

    

    return (
        <SocketContext.Provider value={{}}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    return useContext(SocketContext);
}
