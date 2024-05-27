import {api} from "@/services/configs";

class Assigment {
    assignOrders = async (workerId: number, report_ids: number[]) => {
        return await api.post("/assignment", {
            workerId,
            report_ids
        })
    }
    
    delete = async (assignmentId: number) => {
        return await api.delete(`/assignment/${assignmentId}`);
    }
}

export const assignmentService = new Assigment();