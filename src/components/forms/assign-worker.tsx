import {Button} from "../ui/button";
import React, {useEffect, useState} from "react";
import {customToast} from "@/lib/utils.ts";
import {OrderTableType} from "@/components/tables/columns";
import {SearchableSelect} from "@/components";
import {SelectItemProps} from "@/components/searchable-select.tsx";
import {useGetWorkers} from "@/hooks/useWorker.ts";
import {WorkerType} from "@/types/worker";
import {useAssignOrders} from "@/hooks/useAssignment.ts";

const AssignWorker = ({isInOrderInfo = false, selected_orders}: {
    isInOrderInfo?: boolean,
    selected_orders: OrderTableType[]
}) => {
    const [selectedWorker, setSelectedWorker] = useState<SelectItemProps>()
    const [keyword, setKeyword] = useState<string>("")

    const getWorkersQuery = useGetWorkers(keyword)
    const workersData: WorkerType[] = getWorkersQuery.data?.data?.workers

    const assignOrderMutation = useAssignOrders(isInOrderInfo)

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!selectedWorker) {
            return customToast("ERROR", "please, select a worker to assign!")
        }

        const payload = {
            worker_id: +selectedWorker.key!,
            report_ids: selected_orders.map(item => item.report_id),
        }

        assignOrderMutation.mutate(payload)
    }

    useEffect(() => {
        getWorkersQuery.refetch()
    }, [keyword])

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col gap-3"
        >
            <h1 className="text-xl font-medium text-center">Worker Assignment</h1>

            <div className="flex flex-col gap-2 mt-3">
                <SearchableSelect
                    className={"w-full"}
                    data={workersData?.map(worker => {
                        return {
                            key: +worker.id,
                            value: worker.name,
                        }
                    })}
                    defaultPlaceholder={"Select a worker"} onSelected={setSelectedWorker}
                    selectedItem={selectedWorker}
                    setSearchValue={setKeyword}
                />

                <Button isLoading={assignOrderMutation.isPending}>Assign</Button>
            </div>
        </form>
    );
};

export default AssignWorker;
