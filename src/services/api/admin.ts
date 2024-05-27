/* eslint-disable @typescript-eslint/no-explicit-any */
import {CreateOrUpdateAdminProps, LoginAdminProps} from "@/types";
import {api} from "../configs";

class Admin {
    login = async (data: LoginAdminProps) => {
        return await api.post("/admin/login", data);
    };
    create = async (data: CreateOrUpdateAdminProps) => {
        return await api.post("/admin/create", data);
    };
    getAdmins = async (keyword: string = "") => {
        return await api.get(`/admin?keyword=${keyword}`);
    };
    getAdminInfo = async () => {
        return await api.get('/admin/info')
    }
    update = async (adminId: number, data: CreateOrUpdateAdminProps) => {
        return await api.put(`/admin/${adminId}`, data);
    }
    delete = async (adminId: number) => {
        return await api.delete(`/admin/${adminId}`);
    }
}

export const adminService = new Admin();
