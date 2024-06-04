import React, {useEffect, useState} from "react";
import {formatTimeSeconds, numberSpacer} from "@/lib";
import {SelectItemProps} from "@/components/searchable-select.tsx";
import {useGetWorkers} from "@/hooks/useWorker.ts";
import {WorkerType} from "@/types/worker";
import {ReportsTableNew} from "@/components/tables";
import {MdOutlineClear} from "react-icons/md";
import {SearchableSelect} from "@/components";
import DatePickerDemo from "@/components/ui/date-picker.tsx";
import {useGetReports} from "@/hooks/useReports.ts";
import {GetReportsType} from "@/types/reports";
import StateShower from "@/components/state-shower.tsx";

const Reports = () => {
    const [worker, setWorker] = useState<SelectItemProps>();

    const [keyword, setKeyword] = useState("");
    const [from_date, setFromDate] = useState<Date | undefined>(undefined);
    const [to_date, setToDate] = useState<Date | undefined>(undefined);

    // get workers query
    const getWorkersQuery = useGetWorkers(keyword)
    const workersData: WorkerType[] = getWorkersQuery.data?.data?.workers

    // get reports query
    const getReportsQuery = useGetReports(
        worker?.key ? +worker?.key! : undefined,
        from_date?.toISOString(),
        to_date?.toISOString()
    )

    const reportsData: GetReportsType = getReportsQuery.data?.data

    useEffect(() => {
        getWorkersQuery.refetch()
    }, [keyword]);

    useEffect(() => {
        getReportsQuery.refetch()
    }, [worker, from_date, to_date]);

    const onClearWorker = () => {
        setWorker({key: 0, value: undefined})
    }


    if (reportsData?.orders.list?.length === 0) {
        return <StateShower id={"no_data"} name={"No data"}/>
    }

    const workerInfo = reportsData?.orders?.overall?.worker

    const orderStats = reportsData?.orders?.stats?.orders
    const taskStats = reportsData?.orders?.stats?.tasks

    return (
        <>
            <div className={"flex gap-5"}>
                <div className={"flex flex-col w-2/3 text-sm gap-5"}>
                    <div className={"grid grid-cols-2  gap-5"}>
                        <div className={"flex flex-col gap-2 px-5 py-3 bg-white border rounded"}>
                            <h1 className={"font-medium border-b border-/30 pb-[2px] text-primary"}>Work Orders:</h1>
                            <ul className={"ml-2 flex gap-6 justify-between"}>
                                <li className={"flex flex-col"}>Total: <span
                                    className={"font-medium"}>{orderStats?.total_orders}</span></li>
                                <li className={"flex flex-col"}>Completed: <span
                                    className={"font-medium"}>{orderStats?.completed_orders}</span>
                                </li>
                                <li className={"flex flex-col"}>Uncompleted: <span
                                    className={"font-medium"}>{orderStats?.uncompleted_orders}</span>
                                </li>
                                <li className={"flex flex-col"}>Rejected: <span
                                    className={"font-medium"}>{orderStats?.rejected_orders}</span>
                                </li>
                            </ul>
                        </div>

                        <div className={"flex flex-col gap-3 px-5 py-3 bg-white border rounded "}>
                            <h1 className={"font-medium border-b border-black/20 pb-[2px] text-primary"}>Tasks:</h1>
                            <ul className={"ml-2 flex gap-6 justify-between"}>
                                <li className={"flex flex-col"}>Total: <span
                                    className={"font-medium"}>{taskStats?.total_tasks}</span></li>
                                <li className={"flex flex-col"}>Completed:<span
                                    className={"font-medium"}>{taskStats?.completed_tasks}</span>
                                </li>
                                <li className={"flex flex-col"}>Uncompleted:<span
                                    className={"font-medium"}>{taskStats?.uncompleted_tasks}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {
                        reportsData?.orders?.overall?.worker && <div className={`flex justify-between gap-5`}>
                            <div className={"flex flex-col gap-3 px-5 py-3 w-full bg-white border rounded "}>
                                <h1 className={"font-medium border-b border-black/20 pb-[2px] text-primary"}>Worker
                                    info:</h1>
                                <ul className={"w-full flex justify-between flex-wrap gap-3 text-sm"}>
                                    <li>Name: <span className={"font-medium"}>{workerInfo?.name}</span></li>
                                    <li>Hourly rate: <span
                                        className={"font-medium"}>{workerInfo?.hourly_pay_rate} usd</span></li>
                                    <li>Worked hours: <span
                                        className={"font-medium"}>{formatTimeSeconds(workerInfo?.worked_hours)}</span></li>
                                    <li>Total salary: <span
                                        className={"font-medium"}>{numberSpacer(workerInfo?.total_salary)}</span></li>
                                    <li>Expenses: <span
                                        className={"font-medium"}>{numberSpacer(workerInfo?.expenses)} usd</span></li>
                                </ul>
                            </div>
                        </div>
                    }
                </div>

                <div className={"flex flex-col gap-4 w-1/3"}>
                    <div className={"flex gap-2 w-full"}>
                        {
                            worker?.value &&
                            <MdOutlineClear
                                className={"text-xl cursor-pointer"}
                                onClick={onClearWorker}
                            />
                        }

                        <div className={"w-full "}>
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
                    <div className={"flex gap-2"}>
                        <DatePickerDemo placeholder={"From Date"} date={from_date} setDate={setFromDate}/>
                        <DatePickerDemo placeholder={"To Date"} date={to_date} setDate={setToDate}/>
                    </div>
                </div>
            </div>

            <ReportsTableNew data={reportsData}/>
        </>
    )
};

export default Reports;

