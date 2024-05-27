/* eslint-disable @typescript-eslint/no-explicit-any */
import {useMutation, useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {queryKeys} from "./queryKeys";
import {CreateOrUpdateAdminProps, LoginAdminProps} from "@/types";
import {adminService} from "@/services/api";
import {customToast} from "@/lib/utils";
import {useCreateAdminModal, useEditAdminModal} from "@/hooks/useZustand.tsx";
import {queryClient} from "@/main.tsx";

export const useAdminLogin = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationKey: [queryKeys.LOGIN],
        mutationFn: (data: LoginAdminProps) => {
            return adminService.login(data);
        },
        onSuccess(res) {
            localStorage.setItem("accessToken", res.data?.accessToken);
            localStorage.setItem("refreshToken", res.data?.refreshToken);
            customToast("SUCCESS", "Successfully logged in!");
            navigate("/");
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while logging in to account!"
            );
        },
    });
};

export const useCreateAdmin = () => {
    const createAdminModal = useCreateAdminModal()

    return useMutation({
        mutationKey: [queryKeys.CREATE_WORKER],
        mutationFn: (data: CreateOrUpdateAdminProps) => {
            return adminService.create(data);
        },
        onSuccess() {
            customToast("SUCCESS", "Admin is created successfully!");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_ADMINS]
            })
            createAdminModal.onClose()
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while creating admin!"
            );
        },
    });
};

export const useGetAdmins = (keyword: string) => {
    return useQuery({
        queryKey: [queryKeys.GET_ADMINS],
        queryFn: () => {
            return adminService.getAdmins(keyword);
        },
        refetchOnWindowFocus: false,
    });
};

export const useGetAdminInfo = () => {
    return useQuery({
        queryKey: [queryKeys.GET_ADMIN_INFO],
        queryFn: () => {
            return adminService.getAdminInfo();
        },
        refetchOnWindowFocus: false,
    });
};

export const useUpdateAdmin = () => {
    const editAdminModal = useEditAdminModal();

    return useMutation({
        mutationKey: [queryKeys.UPDATE_WORKER],
        mutationFn: ({adminId, data}: { adminId: number, data: CreateOrUpdateAdminProps }) => {
            return adminService.update(adminId, data);
        },
        onSuccess() {
            customToast("SUCCESS", "Admin is updated successfully!");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_ADMINS]
            })
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_ADMIN_INFO]
            })
            editAdminModal.onClose()
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while updating admin!"
            );
        },
    });
};

export const useDeleteAdmin = () => {
    return useMutation({
        mutationKey: [queryKeys.DELETE_WORKER],
        mutationFn: (adminId: number) => {
            return adminService.delete(adminId);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_ADMINS]
            })

            customToast("SUCCESS", "Admin is deleted successfully!");
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while deleting admin!"
            );
        },
    });
};