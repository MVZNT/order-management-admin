import {useMutation, useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/hooks/queryKeys.ts";
import {expenseService} from "@/services/api/expense.ts";
import {AddExpenseType, GetExpensesQuery} from "@/types/expense";
import {customToast} from "@/lib";
import {queryClient} from "@/main.tsx";
import {useAddExpenseModal} from "@/hooks/useZustand.tsx";

export const useGetExpenses = (query: GetExpensesQuery) => {
    return useQuery({
        queryKey: [queryKeys.GET_EXPENSES],
        queryFn: () => {
            return expenseService.getExpenses(query);
        },
        refetchOnWindowFocus: false,
    })
}

export const useAddExpense = () => {
    const addExpenseModal = useAddExpenseModal()

    return useMutation({
        mutationKey: [queryKeys.ADD_EXPENSE],
        mutationFn: (data: AddExpenseType) => {
            return expenseService.addExpense(data);
        },
        onSuccess() {
            customToast("SUCCESS", "Expense is added successfully!");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_EXPENSES],
            })
            addExpenseModal.onClose()
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while adding expense!"
            );
        },
    });
};
