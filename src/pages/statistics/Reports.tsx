import {ReportsTable} from "@/components/tables";
import React, {useEffect, useState} from "react";
import {SearchableSelect} from "@/components";
import {useGetReports} from "@/hooks/useReports.ts";
import {GetReportsType} from "@/types/reports";
import {numberSpacer} from "@/lib";
import {SelectItemProps} from "@/components/searchable-select.tsx";
import {useGetWorkers} from "@/hooks/useWorker.ts";
import {WorkerType} from "@/types/worker";
import {MdOutlineClear} from "react-icons/md";
import StateShower from "@/components/state-shower.tsx";

const Reports = () => {
    const [worker, setWorker] = useState<SelectItemProps>();
    const [keyword, setKeyword] = useState("");

    // get reports query
    const getReportsQuery = useGetReports(worker?.key ? +worker?.key! : undefined)
    const reportsData: GetReportsType = getReportsQuery.data?.data
    const orderStatsGeneral = reportsData?.stats_general?.orders
    const taskStatsGeneral = reportsData?.stats_general?.tasks

    // get workers query
    const getWorkersQuery = useGetWorkers(keyword)
    const workersData: WorkerType[] = getWorkersQuery.data?.data?.workers

    useEffect(() => {
        getWorkersQuery.refetch()
    }, [keyword]);

    useEffect(() => {
        getReportsQuery.refetch()
    }, [worker]);

    const onClearWorker = () => {
        setWorker({key: 0, value: undefined})
    }

    return (
        <>
            <div className={"flex"}>
                <div className={"flex w-[80%] text-sm gap-5"}>
                    <div className={"flex flex-col gap-2 px-5 py-3 bg-white border rounded"}>
                        <h1 className={"font-medium border-b border-/30 pb-[2px] text-primary"}>Work Orders:</h1>
                        <ul className={"ml-2 flex gap-4"}>
                            <li>Total: <span className={"font-medium"}>{orderStatsGeneral?.total}</span></li>
                            <li>Completed: <span className={"font-medium"}>{orderStatsGeneral?.completed}</span>
                            </li>
                            <li>Uncompleted: <span
                                className={"font-medium"}>{orderStatsGeneral?.unCompleted}</span></li>
                            <li>Rejected: <span className={"font-medium"}>{orderStatsGeneral?.rejected}</span></li>
                        </ul>
                    </div>

                    <div className={"flex flex-col gap-3 px-5 py-3 bg-white border rounded "}>
                        <h1 className={"font-medium border-b border-black/20 pb-[2px] text-primary"}>Tasks:</h1>
                        <ul className={"ml-2 flex gap-4"}>
                            <li>Total: <span className={"font-medium"}>{taskStatsGeneral?.total}</span></li>
                            <li>Completed: <span className={"font-medium"}>{taskStatsGeneral?.completed}</span>
                            </li>
                            <li>Uncompleted: <span className={"font-medium"}>{taskStatsGeneral?.unCompleted}</span>
                            </li>
                            <li>Total Price: <span
                                className={"font-medium"}>{numberSpacer(taskStatsGeneral?.price || 0)}</span></li>
                        </ul>
                    </div>
                </div>

                <div className={`flex flex-col gap-5 ${worker?.value ? "w-[30%]" : "w-[25%] "}`}>
                    <div className={"flex items-center gap-2 w-full"}>
                        {
                            worker?.value &&
                            <MdOutlineClear
                                className={"text-xl cursor-pointer"}
                                onClick={onClearWorker}
                            />
                        }

                        <div className={"w-full"}>
                            <SearchableSelect
                                defaultPlaceholder={"Select worker"}
                                data={workersData?.map(worker => {
                                    return {
                                        key: worker.id,
                                        value: worker.name
                                    }
                                })}
                                selectedItem={worker}
                                setSearchValue={setKeyword}
                                onSelected={setWorker}
                                className={"w-full"}
                            />
                        </div>

                    </div>
                </div>
            </div>

            {
                getReportsQuery.isLoading ?
                    <StateShower id={"loading"} name={"Loading..."}/>
                    : reportsData?.orders?.length === 0
                        ? <StateShower id={"no_data"} name={"No reports found!"}/>
                        : <ReportsTable data={reportsData?.orders}/>
            }
        </>
    )
};

export default Reports;