import {Outlet} from "react-router-dom";
import {Sidebar} from "../components";
import {useGetAdminInfo} from "@/hooks";
import {AdminProps} from "@/types";
import {useGetAdminInfoStore} from "@/hooks/useZustand.tsx";
import {useEffect} from "react";

const RootLayout = () => {
    const getAdminInfoQuery = useGetAdminInfo();
    const adminInfo: AdminProps = getAdminInfoQuery.data?.data?.info

    const {setAdminInfo, setIsLoading} = useGetAdminInfoStore()


    useEffect(() => {
        if (getAdminInfoQuery.isLoading) {
            setIsLoading?.(true)
        }

        if (getAdminInfoQuery.isSuccess) {
            setIsLoading?.(false)
        }
        
        if (adminInfo) {
            setAdminInfo(adminInfo);
        }
    }, [adminInfo]);

    return (
        <div className="flex gap-2 ">
            <Sidebar/>

            <div className="w-full px-3 pt-4 pb-10 flex flex-col gap-3">
                <Outlet/>
            </div>
        </div>
    );
};

export default RootLayout;
