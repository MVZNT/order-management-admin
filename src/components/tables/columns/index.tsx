import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import * as React from "react";
import {FiEdit} from "react-icons/fi";
import {Link} from "react-router-dom";
import {useSetReportIdStore} from "@/hooks/useZustand.tsx";
import {OrderStatus} from "@/types/reports";
import {capitalizedText} from "@/lib";
import {SingleTaskType} from "@/types";
import {SingleJobNoteType} from "@/types/job-notes";

export type OrderTableType = {
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
    status: OrderStatus
    createdAt: string;
    updatedAt: string;
    assigned_workers: {
        assignmentId: number,
        worker: string
    }[],
    tasks: SingleTaskType[],
    job_notes: SingleJobNoteType[];
}

export const OrdersTableColumns: ColumnDef<OrderTableType>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => (
            <div className="font-medium">{capitalizedText(row?.getValue("status") || "")}</div>
        ),
    },
    {
        accessorKey: "wo_number",
        header: "WO",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("wo_number")}</div>
        ),
    },
    {
        accessorKey: "work_type_alias",
        header: "Work Type",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("work_type_alias")}</div>
        ),
    },
    {
        accessorKey: "date_due",
        header: "Date Due",
        cell: ({row}) => (
            <div className="capitalize">{row?.getValue("date_due")}</div>
        ),
    },
    {
        accessorKey: "date_received",
        header: "Date Received",
        cell: ({row}) => (
            <div className="capitalize">{row?.getValue("date_received")}</div>
        ),
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("address")}</div>
        ),
    },
    {
        accessorKey: "city",
        header: "City",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("city")}</div>
        ),
    },
    {
        accessorKey: "state",
        header: "State",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("state")}</div>
        ),
    },
    {
        accessorKey: "assigned_workers",
        header: "Assigned Workers",
        cell: ({row}) => {
            const workers: { assignmentId: number, worker: string }[] = row.getValue("assigned_workers")
            return (
                <div
                    className="capitalize">{workers?.length === 0 ? "---" : workers.map(worker => worker?.worker).join(", ")}</div>
            )
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({row}) => {
            const {setReportId} = useSetReportIdStore();
    
            const onLinkClick = (report_id: number) => {
                setReportId(report_id);
            };
    
            return (
                <div className="flex gap-2">
                    <Link to={`/order/${row.original.report_id}`}
                          onClick={() => onLinkClick(row.original.report_id)}>
                        <FiEdit className="text-[18px] text-amber-700 opacity-60 font-bold cursor-pointer"/>
                    </Link>
                </div>
            );
        },
    },
]