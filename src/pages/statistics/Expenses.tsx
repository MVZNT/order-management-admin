import {ExpensesTable} from "@/components/tables";
import {Button} from "@/components/ui/button.tsx";
import {useGetExpenses} from "@/hooks/useExpenses.ts";
import {getExpensesType} from "@/types/expense";
import {numberSpacer} from "@/lib";
import {SearchableSelect} from "@/components";
import DatePickerDemo from "@/components/ui/date-picker.tsx";
import React, {useEffect, useState} from "react";
import {useGetWorkers} from "@/hooks/useWorker.ts";
import {WorkerType} from "@/types/worker";
import {SelectItemProps} from "@/components/searchable-select.tsx";
import {MdOutlineClear} from "react-icons/md";
import {Pagination} from "antd";
import {DialogModal} from "@/components/ui/dialog.tsx";
import {ExpenseForm} from "@/components/forms";
import {useAddExpenseModal} from "@/hooks/useZustand.tsx";
import StateShower from "@/components/state-shower.tsx";

const Expenses = () => {
    const [from_date, setFromDate] = useState<Date | undefined>(undefined);
    const [to_date, setToDate] = useState<Date | undefined>(undefined);
    const [worker, setWorker] = useState<SelectItemProps>();
    const [keyword, setKeyword] = useState<string>("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState<number>(10);

    // modals
    const addExpenseModal = useAddExpenseModal()

    // get expenses query
    const getExpensesQuery = useGetExpenses({
        page,
        limit,
        from_date: from_date?.toISOString(),
        to_date: to_date?.toISOString(),
        workerId: worker?.key ? +worker.key! : undefined,
    })

    const expensesData: getExpensesType = getExpensesQuery.data?.data

    // get workers query
    const getWorkersQuery = useGetWorkers(keyword)
    const workersData: WorkerType[] = getWorkersQuery.data?.data?.workers

    useEffect(() => {
        getWorkersQuery.refetch()
    }, [keyword]);

    useEffect(() => {
        getExpensesQuery.refetch()
    }, [from_date, to_date, worker, page, limit]);

    const findWorker = workersData?.find(item => item.id === worker?.key)
    const selectedWorker = {
        key: findWorker?.id,
        value: findWorker?.name
    }

    const clearWorker = () => {
        setWorker({key: undefined, value: undefined});
        setKeyword("");
        getExpensesQuery.refetch();
    };

    return (
        <>
            <DialogModal isOpen={addExpenseModal.isOpen} onClose={addExpenseModal.onClose} className={"top-[45%]"}>
                <ExpenseForm/>
            </DialogModal>

            <div className={"flex gap-10 text-sm mb-3"}>
                <div
                    className={"flex w-[45%] text-sm items-center justify-evenly bg-white px-3 border rounded"}>
                    <div className={"flex gap-1"}>
                        <span>Total: </span>
                        <span
                            className={"font-medium text-primary"}> {numberSpacer(expensesData?.stats?.total || 0)}</span>
                    </div>

                    <div className={"flex gap-1"}>
                        <span>Spendings: </span>
                        <span
                            className={"font-medium text-destructive"}>{numberSpacer(expensesData?.stats?.earnings || 0)}</span>
                    </div>

                    <div className={"flex gap-1"}>
                        <span>Penalties:</span>
                        <span
                            className={"font-medium text-green-600"}>{numberSpacer(expensesData?.stats?.penalties || 0)}</span>
                    </div>
                </div>

                <div className={"w-[60%] flex gap-5"}>
                    <div className={"flex items-center gap-2 w-[75%]"}>
                        {
                            worker?.value &&
                            <MdOutlineClear
                                className={"text-xl cursor-pointer"}
                                onClick={clearWorker}
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
                                selectedItem={selectedWorker!}
                                setSearchValue={setKeyword}
                                onSelected={setWorker}
                                className={"w-full"}
                            />
                        </div>

                    </div>

                    <div className={"w-full flex gap-3"}>
                        <DatePickerDemo placeholder={"From Date"} date={from_date} setDate={setFromDate}/>
                        <DatePickerDemo placeholder={"To Date"} date={to_date} setDate={setToDate}/>
                    </div>

                    <Button className={"text-sm"} onClick={addExpenseModal.onOpen}>+ add expense</Button>
                </div>
            </div>

            {
                getExpensesQuery.isLoading
                    ? <StateShower id={"loading"} name={"Loading..."}/>
                    : expensesData?.expenses?.length === 0
                        ? <StateShower id={"no_data"} name={"No expenses found!"}/>
                        : <ExpensesTable data={expensesData?.expenses}/>
            }

            <div className={"flex justify-end mt-5"}>
                <Pagination
                    showSizeChanger
                    defaultCurrent={expensesData?.meta?.currentPage}
                    total={expensesData?.meta?.totalExpenses}
                    pageSizeOptions={[5, 10, 20]}
                    onChange={(page, pageSize) => {
                        setPage(page);
                        setLimit(pageSize);
                    }}
                />
            </div>

        </>
    )
};

export default Expenses;
