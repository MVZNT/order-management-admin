import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/hooks/queryKeys.ts";
import {reportsService} from "@/services/api/reports.ts";

export const useGetReports = (workerId?: number, from_date?: string, to_date?: string) => {
    return useQuery({
        queryKey: [queryKeys.GET_REPORTS],
        queryFn: () => {
            return reportsService.getReports(workerId, from_date, to_date);
        },
        refetchOnWindowFocus: false,
    });
};
