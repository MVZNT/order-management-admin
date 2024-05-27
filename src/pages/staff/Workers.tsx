import {WorkersTable} from "@/components/tables";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {DialogModal} from "@/components/ui/dialog.tsx";
import {useCreateWorkerModal, useEditWorkerModal, useGetAdminInfoStore} from "@/hooks/useZustand.tsx";
import {WorkerForm} from "@/components/forms";
import {WorkerType} from "@/types/worker";
import {useDeleteWorker, useGetWorkers} from "@/hooks/useWorker.ts";
import StateShower from "@/components/state-shower.tsx";
import {customToast} from "@/lib/utils.ts";
import {useEffect, useState} from "react";

const Workers = () => {
    const [worker, setWorker] = useState<WorkerType>()
    const [keyword, setKeyword] = useState<string>("")

    const createWorkerModal = useCreateWorkerModal();
    const editWorkerModal = useEditWorkerModal();

    const {role} = useGetAdminInfoStore()

    const getWorkersQuery = useGetWorkers(keyword)
    const workersData: WorkerType[] = getWorkersQuery.data?.data?.workers

    const deleteWorkerMutation = useDeleteWorker()

    const onWorkerDelete = (id: number) => {
        const isOk = confirm("Are you sure to delete the worker?")
        if (isOk) {
            return deleteWorkerMutation.mutate(id)
        } else {
            return null
        }
    }

    const onWorkerEdit = (id: number) => {
        const findWorker = workersData.find(worker => worker.id === id)
        if (!findWorker) {
            return customToast("ERROR", "worker is not found to edit!")
        }
        setWorker(findWorker)
    }


    useEffect(() => {
        getWorkersQuery.refetch()
    }, [keyword])

    return (
        <>
            {/* create worker modal */}
            <DialogModal isOpen={createWorkerModal.isOpen} onClose={createWorkerModal.onClose}>
                <WorkerForm action={"CREATE"}/>
            </DialogModal>

            {/* edit worker modal */}
            <DialogModal isOpen={editWorkerModal.isOpen} onClose={editWorkerModal.onClose}>
                <WorkerForm action={"EDIT"} data={worker}/>
            </DialogModal>

            <div className={"flex justify-between"}>
                <Input placeholder={"Search by name..."} className={"w-1/4"}
                       onChange={(e) => setKeyword(e.target.value)}/>
                {role === "ADMIN" && <Button onClick={createWorkerModal.onOpen}>+ Create worker</Button>}
            </div>

            {
                getWorkersQuery.isLoading ? <StateShower id={"loading"} name={"Loading..."}/>
                    : workersData.length === 0 ? <StateShower id={"no_data"} name={"No workers found!"}/> :
                        <WorkersTable data={workersData} onDelete={onWorkerDelete} onEdit={onWorkerEdit}/>
            }
        </>
    )
};

export default Workers;