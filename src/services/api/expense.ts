import {api} from "@/services/configs";
import {AddExpenseType, GetExpensesQuery} from "@/types/expense";

class Expense {
    addExpense = async (data: AddExpenseType) => {
        return await api.post("/expense", data)
    }
    getExpenses = async (query: GetExpensesQuery) => {
        const {page = 1, limit = 10, from_date, to_date, workerId} = query
        return await api.get("/expense", {
            params: {
                page,
                limit,
                from_date,
                to_date,
                workerId
            }
        })
    }
}

export const expenseService = new Expense();