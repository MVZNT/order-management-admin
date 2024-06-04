import {FiEdit} from "react-icons/fi";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import Switch from "@/components/ui/switch.tsx";
import {MdSettingsBackupRestore} from "react-icons/md";
import {SingleTaskType} from "@/types/tasks";
import {useChangeCompletionStatusModal, useEditTaskModal, useTaskTimeRecordsModal} from "@/hooks/useZustand.tsx";
import {DialogModal} from "@/components/ui/dialog.tsx";
import {TaskTimeRecordsTable} from "@/components/tables/index.ts";
import {useState} from "react";
import {TaskForm} from "@/components/forms";
import {ChangeCompletionStatus} from "@/components";
import {AiOutlineDelete} from "react-icons/ai";
import {capitalizedText} from "@/lib";

const TasksTable = ({data, onChangeIsVisible, onDelete}: {
    data: SingleTaskType[],
    onChangeIsVisible: (taskId: number, currentStatus: boolean) => void
    onDelete: (id: number) => void
}) => {
    const [task, setTask] = useState<SingleTaskType>()
    const taskTimeRecordsModal = useTaskTimeRecordsModal()

    const editTaskModal = useEditTaskModal();
    const changeCompletionStatusModal = useChangeCompletionStatusModal()

    const onHandleTask = (taskId: number) => {
        const findTask = data.find(task => task.id === taskId);
        setTask(findTask)
    }

    return (
        <>
            <DialogModal
                isOpen={taskTimeRecordsModal.isOpen}
                onClose={taskTimeRecordsModal.onClose}
            >
                <TaskTimeRecordsTable data={task?.TaskTimeRecords!}/>
            </DialogModal>

            <DialogModal
                isOpen={editTaskModal.isOpen}
                onClose={editTaskModal.onClose}
                className={"w-[700px] top-[50%]"}
            >
                <TaskForm action={"EDIT"} data={task}/>
            </DialogModal>

            {/* change completion status modal */}
            <DialogModal
                isOpen={changeCompletionStatusModal.isOpen}
                onClose={changeCompletionStatusModal.onClose}
                className={"w-[450px]"}
            >
                <ChangeCompletionStatus taskId={task?.id!} currentStatus={task?.isCompleted!}/>
            </DialogModal>

            <Table className="max-lg:w-[700px]">
                <TableHeader>
                    <TableRow>
                        <TableHead className={"min-w-40"}>ID</TableHead>
                        <TableHead className={"min-w-60"}>Description</TableHead>
                        <TableHead className={"min-w-14"}>Qty</TableHead>
                        <TableHead className={"min-w-14"}>Price</TableHead>
                        <TableHead className={"min-w-14"}>Total</TableHead>
                        <TableHead className={"min-w-64"}>Additional Instructions</TableHead>
                        <TableHead className={"min-w-32"}>IsVisible</TableHead>
                        <TableHead className={"min-w-28"}>IsCompleted</TableHead>
                        <TableHead className={"min-w-28"}>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>{task.id}</TableCell>
                                <TableCell>{task.desc.charAt(0).toUpperCase() + task.desc.slice(1).toLowerCase()}</TableCell>
                                <TableCell>{task.qty}</TableCell>
                                <TableCell>{task.price}</TableCell>
                                <TableCell>{task.total}</TableCell>
                                <TableCell>{capitalizedText(task?.add || "")}</TableCell>
                                <TableCell>
                                    <Switch checked={task.isVisible}
                                            onClick={() => onChangeIsVisible(task.id, task.isVisible)}/>
                                </TableCell>

                                <TableCell>
                                    <Switch
                                        checked={task.isCompleted}
                                        onClick={() => {
                                            onHandleTask(task.id)
                                            changeCompletionStatusModal.onOpen()
                                        }}/>
                                </TableCell>

                                <TableCell>
                                    <div className="flex gap-2 items-center">
                                        <MdSettingsBackupRestore
                                            className="text-[23px] text-blue-600 cursor-pointer"
                                            onClick={() => {
                                                onHandleTask(task.id)
                                                taskTimeRecordsModal.onOpen()
                                            }}/>

                                        <FiEdit
                                            onClick={() => {
                                                editTaskModal.onOpen()
                                                onHandleTask(task.id)
                                            }}
                                            className="text-[18px] text-amber-700 opacity-60 font-bold cursor-pointer"/>

                                        <AiOutlineDelete
                                            className={"text-[19px] text-destructive cursor-pointer"}
                                            onClick={() => onDelete(task.id)}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
};

export default TasksTable;