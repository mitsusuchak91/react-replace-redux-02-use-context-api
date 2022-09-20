import { useEffect, useState } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
    const setState = useState(globalState)[1]; //here 1 is second value, first is 0

    const dispatch = actionIdentifier => {
        const newState = actions[actionIdentifier] (globalState);
        globalState = { ...globalState, ...newState };

        for (const listener of listeners) {  //for loop JavaScript
            listener(globalState);
        }
    };

    useEffect(() => {
        listeners.push(setState); //when componenet mount, its push/update the global state
        
        return () => {
            listeners = listeners.filter(li => li !== setState); //when componenet unmount, its filter the global state

        }
    }, [setState]);

    return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
    if (initialState) {
        globalState = { ...globalState, ...initialState };
    }
    actions = { ...actions, ...userActions };
};