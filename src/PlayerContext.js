import { useState, createContext, useEffect } from 'react';
import ls from 'localstorage-slim';
import { PLAYER, DIGGING, CHECK_DISABLED, BUILD_BUILDING, PICKAXES, BUILDINGS, AUTO_DIGGING, RESOURCES } from './Engine/Engine.js';
import usePersistedState from './usePersistedState';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useInterval from './use-interval.hook';

export const playerContext = createContext();

export const ContextProvider = ({ children }) => {
    //FOR PRODUCTION
    const [playerData, setPlayerData] = useState(usePersistedState(PLAYER, 'MDPData')[0]);
    //FOR TESTING
    //const [playerData, setPlayerData] = useState(PLAYER);
    const [currentProgress, setCurrentProgress] = useState(0);

    const notify = (message = '', type = '') => {
        switch (type) {
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
        if (playerData.miners.qty > 0) {
            AUTO_DIGGING(playerData, setPlayerData);
        }
    }, 1000);

    useEffect(() => {
        const resourceCheck = playerData.resources;
        const craftableCheck = playerData.craftables;

        //Checking for new resources that aren't in the saved data.
        Object.keys(RESOURCES.dig).forEach((resource) => {
            if(resourceCheck[resource] >= 0) return;
            resourceCheck[resource] = null;
        });

        //Checking for resources that are no longer in the game.
        Object.keys(resourceCheck).forEach((resource) => {
            if(RESOURCES.dig[resource]) return;
            delete resourceCheck[resource];
        });

        //Checking for new craftables that aren't in the saved data.
        Object.keys(RESOURCES.craft).forEach((resource) => {
            if(craftableCheck[resource] >= 0) return;
            craftableCheck[resource] = null;
        });

        //Checking for craftables that are no longer in the game.
        Object.keys(craftableCheck).forEach((resource) => {
            if(RESOURCES.craft[resource]) return;
            delete craftableCheck[resource];
        });

        setPlayerData({ ...playerData, resources: resourceCheck, craftables: craftableCheck});
    }, []);

    useEffect(() => {
        ls.set('MDPData', JSON.stringify(playerData), { isJSON: true, encrypt: false });
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
                notify,
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
