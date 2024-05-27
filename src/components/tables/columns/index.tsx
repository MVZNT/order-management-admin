import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import * as React from "react";
import {FiEdit} from "react-icons/fi";
import {Link} from "react-router-dom";
import {useSetReportIdStore} from "@/hooks/useZustand.tsx";
import {OrderStatusType} from "@/types/reports";
import {capitalizedText, dateFormatterPPW} from "@/lib";

export type OrderTableType = {
    id: number,
    report_id: number,
    wo_status: string,
    wo_number: string | number,
    date_due: string,
    date_received: string,
    address: string,
    city: string,
    state: string,
    status: OrderStatusType,
    assigned_workers: {
        assignmentId: number,
        worker: string
    }[],
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
        accessorKey: "report_id",
        header: "Report Id",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("report_id")}</div>
        ),
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
            <div className="capitalize">{row.getValue("wo_number") || ""}</div>
        ),
    },
    {
        accessorKey: "date_due",
        header: "Date Due",
        cell: ({row}) => (
            <div className="capitalize">{dateFormatterPPW(row?.getValue("date_due") || "")}</div>
        ),
    },
    {
        accessorKey: "date_received",
        header: "Date Received",
        cell: ({row}) => (
            <div className="capitalize">{dateFormatterPPW(row?.getValue("date_received"))}</div>
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
            const {setReportId} = useSetReportIdStore()

            const onLinkClick = (report_id: number) => {
                setReportId(report_id)
            }

            return (
                <div className="flex gap-2">
                    <Link to={`/order/${row.getValue("report_id")}`}
                          onClick={() => onLinkClick(row.getValue("report_id"))}>
                        <FiEdit className="text-[18px] text-amber-700 opacity-60 font-bold cursor-pointer"/>
                    </Link>
                </div>
            )
        },
    },
]