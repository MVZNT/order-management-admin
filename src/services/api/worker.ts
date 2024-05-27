/* eslint-disable @typescript-eslint/no-explicit-any */
import {api} from "../configs";
import {CreateOrUpdateWorkerProps} from "@/types/worker";

class Worker {
    create = async (data: CreateOrUpdateWorkerProps) => {
        return await api.post("/worker/create", data);
    };
    getWorkers = async (keyword: string = "") => {
        return await api.get(`/worker?keyword=${keyword}`);
    };
    update = async (workerId: number, data: CreateOrUpdateWorkerProps) => {
        return await api.put(`/worker/${workerId}`, data);
    }
    delete = async (workerId: number) => {
        return await api.delete(`/worker/${workerId}`);
    }
}

export const workerService = new Worker();
