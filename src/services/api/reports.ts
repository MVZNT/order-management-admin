import {api} from "@/services/configs";

class Reports {
    getReports = async (workerId?: number) => {
        return await api.get("/reports", {
            params: {
                workerId
            }
        })
    }
}

export const reportsService = new Reports();