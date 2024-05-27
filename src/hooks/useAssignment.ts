import {useMutation} from "@tanstack/react-query";
import {queryKeys} from "@/hooks/queryKeys.ts";
import {assignmentService} from "@/services/api";
import {customToast} from "@/lib";
import {queryClient} from "@/main.tsx";
import {useAssignWorkerModal} from "@/hooks/useZustand.tsx";

export const useAssignOrders = (isUsedInOrderInfo: boolean = false) => {
    const assignWorkerModal = useAssignWorkerModal()

    return useMutation({
        mutationKey: [queryKeys.ASSIGN_ORDER],
        mutationFn: ({worker_id, report_ids}: { worker_id: number, report_ids: number[] }) => {
            return assignmentService.assignOrders(worker_id, report_ids);
        },
        onSuccess() {
            customToast("SUCCESS", "Worker is assigned successfully!");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_ORDERS],
            })
            {
                isUsedInOrderInfo ? queryClient.invalidateQueries({
                    queryKey: [queryKeys.GET_SINGLE_ORDER],
                }) : null
            }
            assignWorkerModal.onClose()
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while assigning worker!"
            );
        },
    });
};

export const useDeleteAssignment = () => {
    return useMutation({
        mutationKey: [queryKeys.DELETE_ASSIGNMENT],
        mutationFn: (assignmentId: number) => {
            return assignmentService.delete(assignmentId);
        },
        onSuccess() {
            customToast("SUCCESS", "Worker is unassigned successfully!");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_SINGLE_ORDER],
            })
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while unassigning worker!"
            );
        },
    });
};