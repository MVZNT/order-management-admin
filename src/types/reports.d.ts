export interface OrderStatsGeneralType {
    total: number,
    completed: number,
    unCompleted: number,
    rejected: number
}

export interface TaskStatsType extends OrderStatsGeneralType {
    price: number,
}

export type OrderStatusType = "COMPLETED" | "UNCOMPLETED" | "REJECTED"

export type SingleReportType = {
    report_id: number,
    status: OrderStatusType,
    task: TaskStatsType,
    workers: {
        id: number,
        name: string
    }[]
}

export type GetReportsType = {
    message: string,
    stats_general: {
        orders: OrderStatsGeneralType,
        tasks: TaskStatsType
    },
    orders: SingleReportType[]
}