import {api} from "@/services/configs";

class Reports {
    getReports = async (workerId?: number, from_date?: string, to_date?: string) => {
        return await api.get("/reports", {
            params: {
                workerId,
                from_date,
                to_date
            }
        })
    }
}

export const reportsService = new Reports();