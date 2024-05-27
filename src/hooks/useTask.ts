import {useMutation} from "@tanstack/react-query";
import {queryKeys} from "@/hooks/queryKeys.ts";
import {CreateOrdUpdateTaskType, UpdateCompletionStatusType} from "@/types";
import {customToast} from "@/lib";
import {taskService} from "@/services/api/task.ts";
import {useChangeCompletionStatusModal, useCreateTaskModal, useEditTaskModal} from "@/hooks/useZustand.tsx";
import {queryClient} from "@/main.tsx";

export const useCreateTask = () => {
    const createTaskModal = useCreateTaskModal();

    return useMutation({
        mutationKey: [queryKeys.CREATE_TASK],
        mutationFn: (data: CreateOrdUpdateTaskType) => {
            return taskService.create(data);
        },
        onSuccess(res) {
            customToast("SUCCESS", "Task is created successfully!");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_SINGLE_ORDER],
            })
            createTaskModal.onClose()
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while creating task!"
            );
        },
    });
};

export const useUpdateTask = () => {
    const editTaskModal = useEditTaskModal();

    return useMutation({
        mutationKey: [queryKeys.UPDATE_TASK],
        mutationFn: ({taskId, data}: { taskId: number, data: CreateOrdUpdateTaskType }) => {
            return taskService.update(taskId, data);
        },
        onSuccess(res) {
            customToast("SUCCESS", "Task is updated successfully!");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_SINGLE_ORDER],
            })
            editTaskModal.onClose()
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while updating task!"
            );
        },
    });
};

export const useUpdateTaskCompletionStatus = () => {
    const changeCompletionStatusModal = useChangeCompletionStatusModal();

    return useMutation({
        mutationKey: [queryKeys.UPDATE_TASK],
        mutationFn: (data: UpdateCompletionStatusType) => {
            return taskService.updateCompletionStatus(data);
        },
        onSuccess(res) {
            customToast("SUCCESS", "Task completion status is updated successfully!");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_SINGLE_ORDER],
            })
            changeCompletionStatusModal.onClose()
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while updating task completion status!"
            );
        },
    });
};