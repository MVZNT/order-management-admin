/* eslint-disable @typescript-eslint/no-explicit-any */
import {useMutation, useQuery} from "@tanstack/react-query";
import {queryKeys} from "./queryKeys";
import {workerService} from "@/services/api";
import {customToast} from "@/lib/utils";
import {CreateOrUpdateWorkerProps} from "@/types/worker";
import {queryClient} from "@/main.tsx";
import {useCreateWorkerModal, useEditWorkerModal} from "@/hooks/useZustand.tsx";

export const useCreateWorker = () => {
    const createWorkerModal = useCreateWorkerModal();

    return useMutation({
        mutationKey: [queryKeys.CREATE_WORKER],
        mutationFn: (data: CreateOrUpdateWorkerProps) => {
            return workerService.create(data);
        },
        onSuccess() {
            customToast("SUCCESS", "Worker is created successfully!");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_WORKERS],
            })
            createWorkerModal.onClose()
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while creating worker!"
            );
        },
    });
};

export const useGetWorkers = (keyword: string) => {
    return useQuery({
        queryKey: [queryKeys.GET_WORKERS],
        queryFn: () => {
            return workerService.getWorkers(keyword);
        },
        refetchOnWindowFocus: false,
    });
};

export const useUpdateWorker = () => {
    const editWorkerModal = useEditWorkerModal();

    return useMutation({
        mutationKey: [queryKeys.UPDATE_WORKER],
        mutationFn: ({workerId, data}: { workerId: number, data: CreateOrUpdateWorkerProps }) => {
            return workerService.update(workerId, data);
        },
        onSuccess() {
            customToast("SUCCESS", "Worker is updated successfully!");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_WORKERS],
            })
            editWorkerModal.onClose()
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while updating worker!"
            );
        },
    });
};

export const useDeleteWorker = () => {
    return useMutation({
        mutationKey: [queryKeys.DELETE_WORKER],
        mutationFn: (workerId: number) => {
            return workerService.delete(workerId);
        },
        onSuccess() {
            customToast("SUCCESS", "Worker is deleted successfully!");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_WORKERS],
            })
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while deleting worker!"
            );
        },
    });
};