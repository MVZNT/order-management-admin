export type ExpenseActionEnum = "EARNING" | "PENALTY"

export type GetExpensesQuery = {
    page?: number,
    limit?: number,
    from_date?: string,
    to_date?: string,
    workerId?: number,
}

export type AddExpenseType = {
    workerId: number,
    amount: number,
    action: ExpenseActionEnum
    comment?: string,
    date?: string
}

export type SingleExpenseType = {
    id: number,
    amount: number,
    action: ExpenseActionEnum,
    comment?: string | null,
    date?: string | null,
    createdAt: string,
    updatedAt: string,
    worker: {
        id: number,
        name: string
    }
}

export type ExpenseStatsType = {
    total: number,
    earnings: number,
    penalties: number
}

export type getExpensesType = {
    message: string,
    meta: {
        currentPage: number,
        limit: number,
        total_pages: number,
        totalExpenses: number
    },
    stats: ExpenseStatsType,
    expenses: SingleExpenseType[]
}