import { createContext, useContext, useEffect, useState } from "react";
import { AdminInterface } from "./Model";
import { SetJwtToken, getJwtToken } from "../../utils/function";
import { JwtRestApi, logOutApi } from "./Repository";
import { useLocation, useNavigate } from "react-router-dom";
// import { JwtRestApi } from "./Repository";

// create user context
const userAuthContext = createContext<any>(null);

// user context provider
export function UserAuthContextProvider(props: { children: any }) {
    // states
    const [user, setUser] = useState<AdminInterface>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    let location = useLocation();

    // functions
    // add user to context
    async function addUser(value: any) {
        setUser(value);
        setLoading(false)
    }

    // remove user to context
    async function removeUser() {
        if (user) {

            const data = await logOutApi({ userId: user.id ?? "" })
        }
        setUser(undefined);
        SetJwtToken("");
        navigate("/login")
    }

    async function fetchUser() {
        // const u: AdminInterface = {
        //     name: "admin user",
        //     email: "admin@mail.com",
        //     phone: "345345345",

        // }
        // setUser(u)

        try {
            const jwtToken = getJwtToken();
            const userData = await JwtRestApi({ jwtToken: jwtToken })
            console.log(userData?.jwtToken)
            SetJwtToken(userData?.jwtToken as string)

            if (userData) {
                setUser(userData.userInfo)
            }
            else {
                // console.log(location.pathname)
                // if (location.pathname != "/login"){
                    navigate("/login")
                    
            }
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    useEffect(() => {
        console.log("Hi, Congratulation! you are inside the useeffect of userAuthContext.")
        fetchUser();
    }, []);

    return (<userAuthContext.Provider value={{ addUser, removeUser, user }}>{!loading && props.children}</userAuthContext.Provider>);
}

export function useUserAuth() {
    const { addUser, removeUser, user } = useContext(userAuthContext);

    return Object.freeze({
        authLogIn: (user: AdminInterface) => addUser(user),
        authLogOut: () => removeUser(),
        user: user as AdminInterface
    });
}