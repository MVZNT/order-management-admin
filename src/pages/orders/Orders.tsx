import {Navbar} from "@/components";
import {IoFilterSharp, IoSync} from "react-icons/io5";
import {OrdersTable} from "@/components/tables";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import {OrdersTableColumns, OrderTableType} from "@/components/tables/columns";
import {useEffect, useState} from "react";
import {MdAssignmentAdd} from "react-icons/md";
import {Input} from "@/components/ui/input.tsx";
import {DialogModal} from "@/components/ui/dialog.tsx";
import {AssignWorker, FilterOrdersForm, SyncOrdersForm} from "@/components/forms";
import {
    useAssignWorkerModal,
    useFilterOrdersModal,
    useFilterOrdersStore,
    useSyncOrdersModal
} from "@/hooks/useZustand.tsx";
import {useGetOrders, useGetOrdersSyncLog} from "@/hooks/useOrder.ts";
import {GetOrdersType} from "@/types/orders";
import {FaFilter} from "react-icons/fa6";
import {dateFormatter} from "@/lib";
import StateShower from "@/components/state-shower.tsx";


const Orders = () => {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [selectedOrders, setSelectedOrders] = useState<OrderTableType[]>()
    const {isFiltered} = useFilterOrdersStore()

    const syncOrdersModal = useSyncOrdersModal()

    // search keyword
    const [keyword, setKeyword] = useState<string>("")

    const assignerModal = useAssignWorkerModal()
    const filterOrdersModal = useFilterOrdersModal()

    const getSyncLogQuery = useGetOrdersSyncLog()
    const getOrdersQuery = useGetOrders({
        report_id: +keyword!
    })

    const ordersData: GetOrdersType = getOrdersQuery.data?.data
    const syncLogData = getSyncLogQuery.data?.data?.log

    const tableConfigs = useReactTable({
        data: ordersData?.orders,
        columns: OrdersTableColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            columnVisibility,
            rowSelection,
        },
    })


    const onAssign = () => {
        const selectedRowIds = tableConfigs.getSelectedRowModel().flatRows.map((row) => row.id);
        const selectedData = ordersData?.orders.filter((item, index) => selectedRowIds.includes(String(index)));
        setSelectedOrders(selectedData)
        assignerModal.onOpen()
    }

    useEffect(() => {
        getOrdersQuery.refetch()
    }, [keyword])


    if (getOrdersQuery.isLoading) {
        return <StateShower id={"loading"} name={"Loading..."}/>
    }

    if (getOrdersQuery.error) {
        return <StateShower id={"error"} name={"Something went wrong! Please try again!"}/>
    }

    // @ts-ignore
    return (
        <>
            <Navbar name={"Orders"}/>

            {/* assign worker modal */}
            <DialogModal isOpen={assignerModal.isOpen} onClose={assignerModal.onClose}
                         className={"w-[450px] max-lg:w-[450px]"}>
                <AssignWorker selected_orders={selectedOrders!}/>
            </DialogModal>

            {/* filter orders modal */}
            <DialogModal isOpen={filterOrdersModal.isOpen} onClose={filterOrdersModal.onClose} className={"w-[800px]"}>
                <FilterOrdersForm/>
            </DialogModal>

            <DialogModal
                isOpen={syncOrdersModal.isOpen}
                onClose={!syncOrdersModal.isLoading ? syncOrdersModal.onClose : syncOrdersModal.onOpen}
                className={"w-[400px]"}
            >
                <SyncOrdersForm/>
            </DialogModal>

            <div className={"flex justify-between gap-3 w-full max-lg:flex-col"}>
                <div className={"flex gap-4"}>
                    {
                        (tableConfigs.getIsAllPageRowsSelected() || tableConfigs.getIsSomePageRowsSelected()) &&
                        <div
                            className={`bg-white hover:bg-white py-1 px-4 flex gap-1 cursor-pointer items-center rounded-md shadow-sm border justify-center`}
                            onClick={onAssign}
                        >
                            <MdAssignmentAdd className={"text-xl"}/>
                            <span className={"text-sm"}>Assign worker</span>
                        </div>
                    }

                    <div
                        onClick={filterOrdersModal.onOpen}
                        className={`bg-white hover:bg-white py-1 px-5 flex gap-1 cursor-pointer items-center rounded-md shadow-sm border duration-300`}>
                        {
                            isFiltered ? <FaFilter className={"text-base"}/> : <IoFilterSharp className={"text-base"}/>
                        }

                        <span className={"text-sm"}>{!isFiltered ? "Filter" : "Filtered"}</span>
                    </div>

                    <Input placeholder={"Search by report id..."} type={"number"} className={"w-56"}
                           onChange={(e) => setKeyword(e.target.value)}/>
                </div>

                <div className={"flex gap-2 max-lg:justify-end"}>
                    {
                        syncLogData && <h1 className={"text-sm self-center text-gray-400"}>Last
                            sync: {dateFormatter(syncLogData?.syncedDate)} ({syncLogData?.spentTime || ""})</h1>
                    }

                    <div
                        onClick={syncOrdersModal.onOpen}
                        className={"flex gap-1 items-center bg-primary text-white rounded-md shadow px-3 text-sm py-[6px] border cursor-pointer"}>
                        <IoSync className={"text-[18px]"}/>
                        <span>Sync orders</span>
                    </div>
                </div>
            </div>

            {
                ordersData?.orders?.length === 0
                    ? <StateShower id={"no_data"} name={"No orders found!"}/>
                    : <div className={"bg-white shadow rounded-md"}>
                        <OrdersTable table={tableConfigs}/>
                    </div>
            }
        </>
    )
};

export default Orders;