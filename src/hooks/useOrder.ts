import {useMutation, useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/hooks/queryKeys.ts";
import {ordersService} from "@/services/api/orders.ts";
import {GetOrdersQueryType, UpdateOrderInfoType} from "@/types/orders";
import {customToast} from "@/lib";
import {queryClient} from "@/main.tsx";
import {useSyncOrdersModal} from "@/hooks/useZustand.tsx";

export const useGetOrders = (query: GetOrdersQueryType, isEnabled: boolean = true) => {
    return useQuery({
        queryKey: [queryKeys.GET_ORDERS],
        queryFn: () => {
            return ordersService.getOrders(query);
        },
        refetchOnWindowFocus: false,
        enabled: isEnabled,
    });
};

export const useGetSingleOrder = (report_id: number) => {
    return useQuery({
        queryKey: [queryKeys.GET_SINGLE_ORDER],
        queryFn: () => {
            return ordersService.getSingleOrder(report_id);
        },
        refetchOnWindowFocus: false,
    })
}

export const useUpdateOrder = () => {
    return useMutation({
        mutationKey: [queryKeys.UPDATE_ORDER],
        mutationFn: ({report_id, data}: { report_id: number, data: UpdateOrderInfoType }) => {
            return ordersService.update(report_id, data);
        },
        onSuccess() {
            customToast("SUCCESS", "Work order is updated successfully!");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_SINGLE_ORDER],
            })
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while updating work order!"
            );
        },
    });
};

export const useSyncOrder = () => {
    const {setLoading, onClose} = useSyncOrdersModal()

    return useMutation({
        mutationKey: [queryKeys.SYNC_ORDER],
        mutationFn: () => {
            return ordersService.syncOrders();
        },
        onSuccess() {
            customToast("SUCCESS", "Work orders are synced successfully!");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_ORDERS],
            })
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_SYNC_LOG],
            })
            setLoading(false)
            onClose()
        },
        onError(error: any) {
            console.log(error);
            setLoading(false)
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while syncing work orders!"
            );
        },
    });
};

export const useGetOrdersSyncLog = () => {
    return useQuery({
        queryKey: [queryKeys.GET_SYNC_LOG],
        queryFn: () => {
            return ordersService.getSyncOrdersLog();
        },
        refetchOnWindowFocus: false,
    })
}