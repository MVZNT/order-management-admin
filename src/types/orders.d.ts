import {SingleTaskType} from "@/types/tasks";
import {SingleJobNoteType} from "@/types/job-notes";
import {OrderStatusType} from "@/types/reports";

export type GetOrdersQueryType = {
    report_id?: number,
    wo_number?: string,
    loan_number?: number,
    status?: string,
    country?: string,
    address?: string,
    city?: string,
    state?: string,
    zip_code?: string
    workerId?: number
}

export type SingleOrderType = {
    id: number;
    report_id: number;
    wo_number: string;
    org_wo_num: number;
    wo_status: string;
    client_company_alias: string;
    cust_text: string;
    loan_number: string;
    loan_type_other: string;
    date_received: string;
    date_due: string;
    start_date: string;
    country: string | null;
    address: string;
    city: string;
    state: string;
    zip: string;
    comments: string;
    work_type_alias: string;
    mortgage_name: string;
    ppw_report_id: number;
    import_user_id: number | null;
    mcs_woid: string;
    bg_checkin_provider: string;
    autoimport_client_orig: string;
    wo_number_orig: string;
    wo_photo_ts_format: string;
    autoimport_userid: string;
    lot_size: string;
    lock_code: string;
    key_code: string;
    broker_name: string;
    broker_company: string;
    broker_phone: string;
    broker_email: string;
    has_foh: boolean;
    coordinates: string | null;
    bit_photos_url: string | null;
    status: OrderStatusType
    createdAt: string;
    updatedAt: string;
    assigned_workers: {
        assignmentId: number,
        worker: string
    }[],
    tasks: SingleTaskType[],
    job_notes: SingleJobNoteType[];
};

export type UpdateOrderInfoType = {
    wo_number?: string | number;
    org_wo_num?: string | number;
    work_type_alias?: string;
    address?: string;
    client_company_alias?: string;
    date_received?: string;
    date_due?: string;
    start_date?: string;
    coordinates?: string; // You might want to specify the actual type of coordinates
    loan_info?: string; // Change the type as needed
    mortgage_name?: string;
    cust_text?: string;
    broker?: string; // Change the type as needed
    lot_size?: string; // Change the type as needed
    lock_code?: string;
    key_code?: string;
    comments?: string;
    status?: OrderStatusType
}

export type GetOrdersType = {
    message: string,
    isInitial: boolean,
    orders: SingleOrderType[],
}
