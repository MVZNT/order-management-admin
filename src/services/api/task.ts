import {api} from "@/services/configs";
import {CreateOrdUpdateTaskType, UpdateCompletionStatusType} from "@/types/tasks";

class Task {
    create = async (data: CreateOrdUpdateTaskType) => {
        return await api.post("/task", data)
    }
    update = async (taskId: number, data: CreateOrdUpdateTaskType) => {
        return await api.put(`/task/${taskId}`, data)
    }
    updateCompletionStatus = async (data: UpdateCompletionStatusType) => {
        return await api.put(`/task/status-change`, data)
    }
    delete = async (taskId: number) => {
        return await api.delete(`/task/${taskId}`);
    }
}

export const taskService = new Task();