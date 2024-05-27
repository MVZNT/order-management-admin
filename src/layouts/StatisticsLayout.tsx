import {Link, Outlet, useLocation} from "react-router-dom";

const StatisticsLayout = () => {
    const {pathname} = useLocation()

    return (
        <>
            <div className={"bg-white shadow rounded-sm p-3 flex gap-2 text-sm"}>
                <Link
                    to={"/statistics/expenses"}
                    className={`${pathname === "/statistics/expenses" ? "bg-primary text-white" : "bg-primary bg-opacity-10"} px-4 py-1 rounded-sm`}
                >
                    Expenses
                </Link>

                <Link
                    to={"/statistics/reports"}
                    className={`${pathname === "/statistics/reports" ? "bg-primary text-white" : "bg-primary bg-opacity-10"} px-4 py-1 rounded-sm`}
                >
                    Reports
                </Link>
            </div>

            <Outlet/>
        </>
    )
};

export default StatisticsLayout;