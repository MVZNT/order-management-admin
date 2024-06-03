import {Input} from "@/components/ui/input.tsx";
import TextArea from "@/components/ui/text-area.tsx";
import {TasksTable} from "@/components/tables";
import {Button} from "@/components/ui/button.tsx";
import {AiOutlineDelete} from "react-icons/ai";
import {SingleOrderType, UpdateOrderInfoType} from "@/types/orders";
import {dateFormatterPPW, dateFormatterPPWReverse} from "@/lib";
import {AssignWorker, TaskForm} from "@/components/forms";
import {DialogModal} from "@/components/ui/dialog.tsx";
import {useAssignWorkerModal, useCreateTaskModal} from "@/hooks/useZustand.tsx";
import {useDeleteAssignment} from "@/hooks/useAssignment.ts";
import {useDeleteTask, useUpdateTask} from "@/hooks/useTask.ts";
import {useEffect, useState} from "react";
import {useUpdateOrder} from "@/hooks/useOrder.ts";
import {useParams} from "react-router-dom";
import {OrderStatus} from "@/types/reports";

const OrderInfoTab = ({orderStatus, data}: { orderStatus: OrderStatus, data: SingleOrderType }) => {
    const createTaskModal = useCreateTaskModal();
    const assignWorkerModal = useAssignWorkerModal()

    const {reportId} = useParams()

    const [orderInfo, setOrderInfo] = useState<UpdateOrderInfoType>({
        wo_number: data.wo_number,
        org_wo_num: data.org_wo_num,
        work_type_alias: data.work_type_alias,
        address: data.address,
        client_company_alias: data.client_company_alias,
        date_received: data.date_received,
        date_due: data.date_due,
        start_date: data.start_date,
        coordinates: data.coordinates!,
        loan_info: data.loan_number, // should be changed
        mortgage_name: data.mortgage_name,
        cust_text: data.cust_text,
        broker: data.broker_company, // should be changed
        lot_size: data.lot_size,
        lock_code: data.lock_code,
        key_code: data.key_code,
        comments: data.comments,
        status: orderStatus,
    });

    useEffect(() => {
        setOrderInfo((prev) => ({
            ...prev,
            status: orderStatus,
        }));
    }, [orderStatus]);

    const editTaskMutation = useUpdateTask()
    const editOrderMutation = useUpdateOrder()
    const deleteAssignmentMutation = useDeleteAssignment()
    const deleteTaskMutation = useDeleteTask()

    const onSaveChanges = () => {
        editOrderMutation.mutate({
            report_id: +reportId!,
            data: orderInfo
        })
    }

    const onDeleteAssignment = (assignmentId: number) => {
        const isOk = confirm("Are you sure to unassign this worker?")
        if (isOk) {
            deleteAssignmentMutation.mutate(assignmentId)
        }
    }

    const onDeleteTask = (taskId: number) => {
        const isOk = confirm("Are you sure to delete this task?")
        if (isOk) {
            deleteTaskMutation.mutate(taskId)
        }
    }

    const onChangeIsVisible = (taskId: number, currentStatus: boolean) => {
        editTaskMutation.mutate({
            taskId,
            data: {
                isVisible: !currentStatus
            }
        })
    }

    console.log(orderInfo.date_received)

    return (
        <>
            <DialogModal
                isOpen={createTaskModal.isOpen} onClose={createTaskModal.onClose}
                className={"w-[700px] top-[45%]"}>
                <TaskForm action={"CREATE"} report_id={data.report_id}/>
            </DialogModal>

            <DialogModal isOpen={assignWorkerModal.isOpen} onClose={assignWorkerModal.onClose}>
                <AssignWorker selected_orders={[data]} isInOrderInfo={true}/>
            </DialogModal>

            <div className={"flex flex-col gap-5 text-sm"}>
                <div className={"grid grid-cols-2 gap-5 max-xl:grid-cols-1"}>
                    <div className={"flex flex-col gap-2 bg-white rounded shadow p-3"}>
                        <div className={"flex justify-between items-center"}>
                            <h1>Wo:</h1>

                            <div className={"w-2/3"}>
                                <Input
                                    defaultValue={data?.wo_number}
                                    onChange={(e) => setOrderInfo({
                                        wo_number: e.target.value,
                                    })}
                                    className={"bg-[#F2F2F2] h-8 rounded-sm shadow-none"}/>
                            </div>
                        </div>

                        <hr/>
                        <div className={"flex justify-between items-center"}>
                            <h1>PPW:</h1>

                            <div className={"w-2/3"}>
                                <Input
                                    defaultValue={data?.org_wo_num}
                                    onChange={(e) => setOrderInfo({
                                        org_wo_num: e.target.value,
                                    })}
                                    type={"number"}
                                    className={"bg-[#F2F2F2] h-8 rounded-sm shadow-none"}/>
                            </div>
                        </div>

                        <hr/>
                        <div className={"flex justify-between items-center"}>
                            <h1>Work Type:</h1>

                            <div className={"w-2/3"}>
                                <Input
                                    defaultValue={data?.work_type_alias}
                                    onChange={(e) => setOrderInfo({
                                        work_type_alias: e.target.value,
                                    })}
                                    className={"bg-[#F2F2F2] h-8 rounded-sm shadow-none"}/>
                            </div>
                        </div>

                        <hr/>
                        <div className={"flex justify-between items-center"}>
                            <h1>Address:</h1>

                            <div className={"w-2/3"}>
                                <TextArea
                                    defaultValue={data?.address}
                                    onChange={(e) => setOrderInfo({
                                        address: e.target.value,
                                    })}
                                    className={"bg-[#F2F2F2] h-8 rounded-sm shadow-none"}/>
                            </div>
                        </div>

                        <hr/>
                        <div className={"flex justify-between items-center"}>
                            <h1>Client Company:</h1>

                            <div className={"w-2/3"}>
                                <Input
                                    defaultValue={data?.client_company_alias}
                                    onChange={(e) => setOrderInfo({
                                        client_company_alias: e.target.value,
                                    })}
                                    className={"bg-[#F2F2F2] h-8 rounded-sm shadow-none"}/>
                            </div>
                        </div>

                        <hr/>
                        <div className={"flex justify-between items-center"}>
                            <h1>Received date:</h1>

                            <div className={"w-2/3"}>
                                <Input
                                    defaultValue={dateFormatterPPW(data?.date_received)}
                                    onChange={(e) => setOrderInfo({
                                        date_received: dateFormatterPPWReverse(e.target.value),
                                    })}
                                    className={"bg-[#F2F2F2] h-8 rounded-sm shadow-none"}/>
                            </div>
                        </div>

                        <hr/>
                        <div className={"flex justify-between items-center"}>
                            <h1>Due date:</h1>

                            <div className={"w-2/3"}>
                                <Input
                                    defaultValue={dateFormatterPPW(data?.date_due)}
                                    onChange={(e) => setOrderInfo({
                                        date_due: dateFormatterPPWReverse(e.target.value),
                                    })}
                                    className={"bg-[#F2F2F2] h-8 rounded-sm shadow-none"}/>
                            </div>
                        </div>

                        <hr/>
                        <div className={"flex justify-between items-center"}>
                            <h1>Start date:</h1>

                            <div className={"w-2/3"}>
                                <Input
                                    defaultValue={dateFormatterPPW(data?.start_date)}
                                    onChange={(e) => setOrderInfo({
                                        start_date: dateFormatterPPWReverse(e.target.value),
                                    })}
                                    className={"bg-[#F2F2F2] h-8 rounded-sm shadow-none"}/>
                            </div>
                        </div>

                        <hr/>
                        <div className={"flex justify-between items-center"}>
                            <h1>Coordinates:</h1>

                            <div className={"w-2/3"}>
                                <Input
                                    defaultValue={data?.coordinates!}
                                    onChange={(e) => setOrderInfo({
                                        coordinates: e.target.value,
                                    })}
                                    className={"bg-[#F2F2F2] h-8 rounded-sm shadow-none"}/>
                            </div>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-2 bg-white rounded shadow p-3"}>
                        <div className={"flex justify-between items-center"}>
                            <h1>Loan Info:</h1>

                            <div className={"w-2/3"}>
                                <Input
                                    defaultValue={`${data?.loan_number} ${data?.loan_type_other}`}
                                    className={"bg-[#F2F2F2] h-8 rounded-sm shadow-none"}/>
                            </div>
                        </div>

                        <hr/>
                        <div className={"flex justify-between items-center"}>
                            <h1>Mortgager:</h1>

                            <div className={"w-2/3"}>
                                <Input
                                    defaultValue={data?.mortgage_name}
                                    onChange={(e) => setOrderInfo({
                                        mortgage_name: e.target.value,
                                    })}
                                    className={"bg-[#F2F2F2] h-8 rounded-sm shadow-none"}/>
                            </div>
                        </div>

                        <hr/>
                        <div className={"flex justify-between items-center"}>
                            <h1>Customer:</h1>

                            <div className={"w-2/3"}>
                                <Input
                                    defaultValue={data?.cust_text}
                                    onChange={(e) => setOrderInfo({
                                        cust_text: e.target.value,
                                    })}
                                    className={"bg-[#F2F2F2] h-8 rounded-sm shadow-none"}/>
                            </div>
                        </div>

                        <hr/>
                        <div className={"flex justify-between items-center"}>
                            <h1>Broker Info:</h1>

                            <div className={"w-2/3"}>
                                <TextArea
                                    defaultValue={`${data?.broker_name} ${data?.broker_email} ${data?.broker_phone} ${data?.broker_company}`}
                                    className={"bg-[#F2F2F2] h-8 rounded-sm shadow-none"}/>
                            </div>
                        </div>

                        <hr/>
                        <div className={"flex justify-between items-center"}>
                            <h1>Lot size:</h1>

                            <div className={"w-2/3"}>
                                <Input
                                    defaultValue={data?.lot_size}
                                    onChange={(e) => setOrderInfo({
                                        lot_size: e.target.value,
                                    })}
                                    className={"bg-[#F2F2F2] h-8 rounded-sm shadow-none"}/>
                            </div>
                        </div>

                        <hr/>
                        <div className={"flex justify-between items-center"}>
                            <h1>Lock Code:</h1>

                            <div className={"w-2/3"}>
                                <Input
                                    defaultValue={data?.lock_code}
                                    onChange={(e) => setOrderInfo({
                                        lock_code: e.target.value,
                                    })}
                                    className={"bg-[#F2F2F2] h-8 rounded-sm shadow-none"}/>
                            </div>
                        </div>

                        <hr/>
                        <div className={"flex justify-between items-center"}>
                            <h1>Key Code:</h1>

                            <div className={"w-2/3"}>
                                <Input
                                    defaultValue={data?.key_code}
                                    onChange={(e) => setOrderInfo({
                                        key_code: e.target.value,
                                    })}
                                    className={"bg-[#F2F2F2] h-8 rounded-sm shadow-none"}/>
                            </div>
                        </div>

                        <hr/>
                        <div className={"flex justify-between items-center"}>
                            <h1>Comments:</h1>

                            <div className={"w-2/3"}>
                                <TextArea
                                    defaultValue={data?.comments}
                                    onChange={(e) => setOrderInfo({
                                        comments: e.target.value,
                                    })}
                                    className={"bg-[#F2F2F2] min-h-28 rounded-sm shadow-none"}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex flex-col gap-5"}>
                    <div className={"bg-white rounded shadow p-3 flex flex-col gap-3"}>
                        <div className={"flex justify-between items-center"}>
                            <span className={"text-base font-medium ml-1"}>Task Items </span>

                            <Button onClick={createTaskModal.onOpen}>+ create task</Button>
                        </div>

                        <div className={"bg-white w-full"}>
                            <TasksTable
                                data={data?.tasks} onChangeIsVisible={onChangeIsVisible}
                                onDelete={onDeleteTask}
                            />
                        </div>
                    </div>
                </div>

                <div className={"flex justify-between items-center bg-white rounded shadow p-3"}>
                    <div className={"flex flex-col gap-3 w-2/3"}>
                        <span className={"text-base font-medium"}>Assigned Workers</span>

                        <div className={"flex items-center gap-5"}>
                            <h1 className={"text-primary font-medium cursor-pointer"}
                                onClick={assignWorkerModal.onOpen}>+
                                Assign worker</h1>

                            {
                                data?.assigned_workers?.length === 0
                                    ? <h1 className={"text-gray-700"}>There are no assigned workers!</h1>
                                    : data?.assigned_workers?.map((worker, index) => (
                                        <div key={index} className={"flex items-center gap-1 "}>
                                            <span>{worker.worker}</span>
                                            <AiOutlineDelete className={"text-xl text-destructive cursor-pointer"}
                                                             onClick={() => onDeleteAssignment(worker.assignmentId)}/>
                                        </div>
                                    ))
                            }

                        </div>
                    </div>

                    <Button isLoading={editOrderMutation.isPending} onClick={onSaveChanges}>Save changes</Button>
                </div>
            </div>
        </>
    )
};

export default OrderInfoTab;