import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer/Footer";
import {  hall_navigations, mess_navigations, student_navigations, superAdmin_navigations } from "../../navigation";
import { useUserAuth } from "../../features/context/UserAuthContext";
import { navigationInterface } from "../../features/Model";



export default function Admin(props: { children: any }) {
    const { ...rest } = props;
    const location = useLocation();
    const [open, setOpen] = React.useState(true);
    const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

    const [navigations, setNavigations] = React.useState<navigationInterface[]>([])
    const { user } = useUserAuth()
    React.useEffect(() => {
        if (user) {
            if (user.permissionNo == 1000) {
                setNavigations(superAdmin_navigations)
            }

            if(user.permissionNo==2000){
                setNavigations(hall_navigations)
            }
            if(user.permissionNo==3000){
                setNavigations(student_navigations)
            }
            if(user.permissionNo==4000){
                setNavigations(mess_navigations)
            }
        }

    }, [])
    React.useEffect(() => {
        window.addEventListener("resize", () =>
            window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
        );
    }, []);
    React.useEffect(() => {
        getActiveRoute(navigations);
    }, [location.pathname, navigations]);

    const getActiveRoute = (routes: any) => {
        const activeRoute = "Main Dashboard";
        console.log(window.location.href)
        console.log(routes)
        for (let i = 0; i < routes.length; i++) {
            if (
                window.location.href.indexOf(
                    routes[i].path
                ) !== -1
            ) {
                console.log("hi inside condition");
                console.log(routes[i].path);
                setCurrentRoute(routes[i].name);
            }
        }
        return activeRoute;
    };
    const getActiveNavbar = (routes: any) => {
        const activeNavbar = false;
        for (let i = 0; i < routes.length; i++) {
            if (
                window.location.href.indexOf(routes[i].path) !== -1
            ) {
                return routes[i].secondary;
            }
        }
        return activeNavbar;
    };
    // const getRoutes = (routes: any) => {
    //     return routes.map((prop: any, key: number) => {
    //         if (prop.layout === "/admin") {
    //             return (
    //                 <Route path={`/${prop.path}`} element={prop.component} key={key} />
    //             );
    //         } else {
    //             return null;
    //         }
    //     });
    // };

    document.documentElement.dir = "ltr";
    return (
        <div className="flex h-full w-full">
            <Sidebar open={open} onClose={() => setOpen(false)} />
            {/* Navbar & Main Content */}
            <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
                {/* Main Content */}
                <main
                    className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
                >
                    {/* Routes */}
                    <div className="h-full">
                        <Navbar
                            onOpenSidenav={() => setOpen(true)}
                            logoText={"Horizon UI Tailwind React"}
                            brandText={currentRoute}
                            secondary={getActiveNavbar(navigations)}
                            {...rest}
                        />
                        <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                            {props.children}
                        </div>
                        <div className="p-3">
                            <Footer />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
