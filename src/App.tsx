import {Route, Routes} from "react-router-dom";
import {AuthLayout, RootLayout, StaffLayout, StatisticsLayout} from "./layouts";
import {InternalServerError, NotFound, OrderInfo, Orders} from "./pages";
import {AuthChecker} from "./middlewares";

import {Admins, Workers} from "@/pages/staff/index";
import {Expenses, ReportsNew} from "@/pages/statistics";

function App() {
    return (
        <Routes>
            {/* Root layout */}
            <Route
                element={
                    <AuthChecker>
                        <RootLayout/>
                    </AuthChecker>
                }
            >
                <Route index element={<Orders/>}/>
                <Route path={"/order/:reportId"} element={<OrderInfo/>}/>
                <Route path={"/staff"} element={<StaffLayout/>}>
                    <Route path={"workers"} element={<Workers/>}/>
                    <Route path={"admins"} element={<Admins/>}/>
                </Route>

                <Route path={"/statistics"} element={<StatisticsLayout/>}>
                    <Route path={"expenses"} element={<Expenses/>}/>
                    <Route path={"reports"} element={<ReportsNew/>}/>
                </Route>

                {/*<Route path={"/settings"} element={<SettingsLayout/>}>*/}
                {/*    <Route path={"roles"} element={<Roles/>}/>*/}
                {/*</Route>*/}

                <Route path="*" element={<NotFound/>}/>
            </Route>

            <Route path="/500" element={<InternalServerError/>}/>

            {/* Auth layout */}
            <Route path="/auth" element={<AuthLayout/>}/>
        </Routes>
    );
}

export default App;
