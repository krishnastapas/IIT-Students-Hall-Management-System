import { createContext, useContext, useState } from "react";


// create user context
const userAuthContext = createContext<any>(null);

// user context provider
export function SettingContextProvider(props: { children: any }) {
    // states
    const [loading, setLoading] = useState(false);

    const changeLoading = (flag: boolean) => {
        setLoading(flag);
    }


    return (<userAuthContext.Provider value={{ loading, changeLoading }}>{props.children}</userAuthContext.Provider>);
}

export function useSetting() {
    const { loading, changeLoading } = useContext(userAuthContext);

    return Object.freeze({
        changeLoading: (flag: boolean) => changeLoading(flag),
        loading: loading as boolean
    });
}