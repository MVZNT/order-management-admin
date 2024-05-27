import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/hooks/queryKeys.ts";
import {roleService} from "@/services/api";

export const useGetRoles = () => {
    return useQuery({
        queryKey: [queryKeys.GET_ROLES],
        queryFn: () => {
            return roleService.getRoles();
        },
        refetchOnWindowFocus: false,
    });
};
