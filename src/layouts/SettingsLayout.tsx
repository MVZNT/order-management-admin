import {Outlet} from "react-router-dom";

const SettingsLayout = () => {
    return (
        <>
            <div className={"bg-white shadow rounded-sm p-3 flex gap-2"}>
                <h1 className={`bg-primary text-white px-4 py-1 rounded-sm`}>Roles</h1>
            </div>

            <Outlet/>
        </>
    )
};

export default SettingsLayout;