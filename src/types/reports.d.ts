interface Worker {
    id: number;
    name: string;
}

interface Completion {
    spent_time: number;
    spent_amount: number;
    worker: Worker;
}

interface Task {
    id: number;
    desc: string;
    quantity: number;
    price: number;
    total: number;
    completion: Completion;
}

interface TaskList {
    list: Task[];
    overall: {
        spent_time: number;
        spent_amount: number;
        total_tasks_price: number
    };
}

interface OrderStats {
    total_orders: number;
    completed_orders: number;
    uncompleted_orders: number;
    rejected_orders: number;
}

interface TaskStats {
    total_tasks: number;
    completed_tasks: number;
    uncompleted_tasks: number;
}

interface Stats {
    orders: OrderStats;
    tasks: TaskStats;
}

interface WorkerDetails {
    name: string;
    hourly_pay_rate: number;
    worked_hours: number;
    total_salary: number;
    expenses: number;
}

interface Overall {
    total_spent_time: number;
    total_spent_amount: number;
    total_task_price: number;
    total_profit: number;
    worker: WorkerDetails;
}

export type OrderStatus = "COMPLETED" | "UNCOMPLETED" | "REJECTED"

export interface ReportOrderType {
    report_id: number;
    wo_number: number;
    city: string;
    address: string;
    status: OrderStatus;
    completed_date: string | null;
    task: TaskList;
}

export interface Orders {
    stats: Stats;
    overall: Overall;
    list: ReportOrderType[];
}

// main
export interface GetReportsType {
    message: string;
    orders: Orders;
}