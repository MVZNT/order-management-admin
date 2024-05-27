import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/hooks/queryKeys.ts";
import {reportsService} from "@/services/api/reports.ts";

export const useGetReports = (workerId?: number) => {
    return useQuery({
        queryKey: [queryKeys.GET_REPORTS],
        queryFn: () => {
            return reportsService.getReports(workerId);
        },
        refetchOnWindowFocus: false,
    });
};
