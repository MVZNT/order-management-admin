import {useState} from "react";
import {useGetSingleOrder} from "@/hooks/useOrder.ts";
import {useParams} from "react-router-dom";
import {SingleOrderType} from "@/types/orders";
import OrderInfoTab from "@/components/tabs/order-info.tsx";
import JobNotesTab from "@/components/tabs/job-notes.tsx";
import StateShower from "@/components/state-shower.tsx";
import {Select} from "@/components/ui/select.tsx";
import {capitalizedText} from "@/lib";
import {OrderStatus} from "@/types/reports";

const OrderInfo = () => {
    const [tab, setTab] = useState<"ORDER_INFO" | "JOB_NOTES">("ORDER_INFO");
    const {reportId} = useParams();
    const [orderStatus, setOrderStatus] = useState<OrderStatus>();

    const getSingleOrderQuery = useGetSingleOrder(Number(reportId));
    const orderInfo: SingleOrderType = getSingleOrderQuery.data?.data?.info;

    const handleOrderStatusChange = (value: OrderStatus) => {
        setOrderStatus(value);
    };

    return (
        <>
            <div className={"bg-white shadow rounded-sm p-3 flex items-center text-sm justify-between"}>
                <div className={"flex gap-2"}>
                    <div
                        onClick={() => setTab("ORDER_INFO")}
                        className={`${tab === "ORDER_INFO" ? "bg-primary text-white" : "bg-primary bg-opacity-10"} px-4 py-1 rounded-sm cursor-pointer`}
                    >
                        Order Info
                    </div>

                    <div
                        onClick={() => setTab("JOB_NOTES")}
                        className={`${tab === "JOB_NOTES" ? "bg-primary text-white" : "bg-primary bg-opacity-10"} px-4 py-1 rounded-sm cursor-pointer`}
                    >
                        Job Notes
                    </div>
                </div>

                <div className={"w-1/5"}>
                    <Select
                        defaultValue={orderInfo?.status ? capitalizedText(orderInfo?.status) : "Select order status"}
                        data={[
                            {id: "COMPLETED", name_uz: "Completed"},
                            {id: "UNCOMPLETED", name_uz: "Uncompleted"},
                            {id: "REJECTED", name_uz: "Rejected"},
                        ]}
                        selectedValue={(value) => handleOrderStatusChange(value as OrderStatus)}
                    />
                </div>
            </div>

            {getSingleOrderQuery.isLoading ? (
                <StateShower id={"loading"} name={"Loading..."}/>
            ) : getSingleOrderQuery.isError ? (
                <StateShower id={"error"} name={"Something went wrong! Please try again!"}/>
            ) : tab === "ORDER_INFO" ? (
                <OrderInfoTab data={orderInfo} orderStatus={orderStatus!}/>
            ) : (
                <JobNotesTab orderInfo={orderInfo?.job_notes}/>
            )}
        </>
    );
};

export default OrderInfo;
