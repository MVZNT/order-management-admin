import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {LuSearch} from "react-icons/lu";
import {useEffect, useState} from "react";
import {useGetOrders} from "@/hooks/useOrder.ts";
import {useFilterOrdersModal, useFilterOrdersStore} from "@/hooks/useZustand.tsx";
import toast, {Toaster} from "react-hot-toast";
import {MdOutlineClear} from "react-icons/md";
import {Select} from "@/components/ui/select.tsx";
import {OrderStatus} from "@/types/reports";
import {SearchableSelect} from "@/components";
import {useGetWorkers} from "@/hooks/useWorker.ts";
import {WorkerType} from "@/types/worker";

const countMap = new Map<number, number>();

const FilterOrdersForm = () => {
    const {
        setIsFiltered,
        report_id, setReportId,
        wo_number, setWoNumber,
        status, setStatus,
        address, setAddress,
        city, setCity,
        state, setState,
        worker, setWorker
    } = useFilterOrdersStore()
    const filterOrdersModal = useFilterOrdersModal()

    const [isOnFilter, setIsOnFilter] = useState<boolean>(false)
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [searchWorkerKeyword, setSearchWorkerKeyword] = useState<string>("")

    const getOrdersQuery = useGetOrders({
        report_id,
        city,
        state,
        status,
        address,
        wo_number,
        workerId: worker?.key ? +worker.key : undefined
    }, submitted)
    const getWorkersQuery = useGetWorkers(searchWorkerKeyword)

    const workersData: WorkerType[] = getWorkersQuery.data?.data?.workers

    const onSubmit = () => {
        if (report_id || city || state || status || address || wo_number || worker) {
            setSubmitted(true);
            setIsOnFilter(true);
        }
    }

    const onClearFilter = () => {
        setIsOnFilter(false);
        setIsFiltered?.(false);

        setReportId?.(0);
        setWoNumber?.("");
        setStatus?.("");
        setAddress?.("");
        setCity?.("");
        setState?.("");
        setWorker?.({
            key: 0,
            value: undefined
        });

        setSubmitted(true);
    }

    useEffect(() => {
        if (submitted && getOrdersQuery.isFetchedAfterMount) {
            setSubmitted(false);
            if (isOnFilter) {
                setIsFiltered?.(true);
                filterOrdersModal.onClose();
                toast.success("Fetched successfully!");
            } else {
                countMap.clear();
            }
        }
    }, [submitted, getOrdersQuery.isFetchedAfterMount]);

    useEffect(() => {
        getWorkersQuery.refetch();
    }, [searchWorkerKeyword]);

    return (
        <div className={"flex flex-col gap-4"}>
            {
                submitted && getOrdersQuery.isFetchedAfterMount && <Toaster/>
            }

            <div className={"flex flex-col items-center gap-2 mb-4"}>
                <h1 className={"text-xl font-medium text-center"}>Filter Worker Orders</h1>
                <span className={"w-1/2 h-[1px] bg-black/40"}></span>
            </div>

            <div className={"grid grid-cols-3 gap-4"}>
                <div className={"flex flex-col gap-1 text-sm"}>
                    <span className={"font-medium text-gray-700"}>Report ID:</span>
                    <Input
                        value={report_id}
                        type={"number"}
                        placeholder={"enter report id..."}
                        onChange={(e) => setReportId?.(+e.target.value)}
                    />
                </div>

                <div className={"flex flex-col gap-1 text-sm"}>
                    <span className={"font-medium text-gray-700"}>WO:</span>
                    <Input
                        value={wo_number}
                        placeholder={"enter wo number..."}
                        onChange={(e) => setWoNumber?.(e.target.value)}
                    />
                </div>

                <div className={"flex flex-col gap-1 text-sm"}>
                    <span className={"font-medium text-gray-700"}>Status:</span>
                    <Select
                        defaultValue={status ? status : "Select status"}
                        data={[
                            {id: "NEW", name_uz: "New"},
                            {id: "COMPLETED", name_uz: "Completed"},
                            {id: "UNCOMPLETED", name_uz: "Uncompleted"},
                            {id: "REJECTED", name_uz: "Rejected"},
                        ]}
                        selectedValue={(value) => setStatus?.(value as OrderStatus)}
                    />
                </div>

                <div className={"flex flex-col gap-1 text-sm"}>
                    <span className={"font-medium text-gray-700"}>Address:</span>
                    <Input
                        value={address}
                        placeholder={'enter address...'}
                        onChange={(e) => setAddress?.(e.target.value)}
                    />
                </div>

                <div className={"flex flex-col gap-1 text-sm"}>
                    <span className={"font-medium text-gray-700"}>City:</span>
                    <Input
                        value={city}
                        placeholder={'enter city...'}
                        onChange={(e) => setCity?.(e.target.value)}
                    />
                </div>

                <div className={"flex flex-col gap-1 text-sm"}>
                    <span className={"font-medium text-gray-700"}>State:</span>
                    <Input
                        value={state}
                        placeholder={'enter state...'}
                        onChange={(e) => setState?.(e.target.value)}
                    />
                </div>

                <div className={"flex flex-col gap-1 text-sm"}>
                    <span className={"font-medium text-gray-700"}>Worker:</span>
                    <SearchableSelect
                        className={"w-full"}
                        defaultPlaceholder={"Select worker"}
                        data={workersData?.map(worker => {
                            return {
                                key: worker.id,
                                value: worker.name
                            }
                        })}
                        selectedItem={worker}
                        onSelected={setWorker}
                        setSearchValue={setSearchWorkerKeyword}
                    />
                </div>
            </div>

            <div className={"flex justify-end mt-2 gap-3"}>
                <Button
                    disabled={getOrdersQuery.isFetching || (!report_id && !city && !state && !status && !address && !wo_number && !worker?.key)}
                    isLoading={getOrdersQuery.isFetching}
                    className={"w-1/5 flex items-center gap-1"} onClick={onSubmit}>
                    <LuSearch className={"text-xl"}/>
                    <span>Search</span>
                </Button>

                <Button
                    onClick={onClearFilter}
                    disabled={!report_id && !city && !state && !status && !address && !wo_number && !worker?.key}
                    className={"bg-gray-600 hover:bg-gray-600 text-white py-1 px-3 rounded-md shadow flex items-center gap-1 border cursor-pointer"}>
                    <MdOutlineClear/>
                    <span>Clear filter</span>
                </Button>
            </div>
        </div>
    )
};

export default FilterOrdersForm;
