import { useState, createContext, useEffect } from 'react';
import ls from 'localstorage-slim';
import { PLAYER, DIGGING, CHECK_DISABLED, BUILD_BUILDING, PICKAXES, BUILDINGS, AUTO_DIGGING } from './Engine/Engine.js';
import usePersistedState from './usePersistedState';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useInterval from "./use-interval.hook";

export const playerContext = createContext();

export const ContextProvider = ({ children }) => {
    //FOR PRODUCTION
   // const [playerData, setPlayerData] = useState(usePersistedState(PLAYER, 'MDPData')[0]);
    //FOR TESTING
    const [playerData, setPlayerData] = useState(PLAYER);
    const [currentProgress, setCurrentProgress] = useState(0);

    const notify = (message='', type='') => {
        switch(type) {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            case 'warning':
                toast.warning(message);
                break;
            case 'info':
                toast.info(message);
                break;
            default:
                toast(message);
                break;
        }
    };


        useInterval(() => {
            if(playerData.miners.qty > 0){
                AUTO_DIGGING(playerData, setPlayerData);
            }
        }, 1000);

    useEffect(() => {
        ls.set('MDPData', JSON.stringify(playerData), { isJSON: true, encrypt: true });
    }, [playerData]);

    return (
        <playerContext.Provider
            value={{
                playerData,
                setPlayerData,
                DIGGING,
                currentProgress,
                setCurrentProgress,
                CHECK_DISABLED,
                BUILD_BUILDING,
                BUILDINGS,
                PICKAXES,
                notify
            }}
        >
            {children}
            <ToastContainer 
            position="top-right"
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
        </playerContext.Provider>
    );
};

export default ContextProvider;
