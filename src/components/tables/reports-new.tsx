import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import "../../styles/index.css";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table.tsx";
import React, { useState, useEffect } from "react";
import { GetReportsType } from "@/types/reports";
import { dateFormatter, formatTimeSeconds, numberSpacer } from "@/lib";
import StateShower from "@/components/state-shower.tsx";

type ReportTableProps = {
    data: GetReportsType,
}

const ReportsTableNew = ({ data }: ReportTableProps) => {
    const [openItems, setOpenItems] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);

    // Set all items as open by default when data is loaded
    useEffect(() => {
        if (data?.orders?.list) {
            const allItems = data.orders.list.map(order => `item-${order.report_id}`);
            setOpenItems(allItems);
        }
    }, [data]);

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to first page when items per page changes
    };

    const totalPages = Math.ceil(data?.orders?.list?.length / itemsPerPage);

    const paginatedData = data?.orders?.list?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const areAllItemsOpen = openItems.length === data?.orders?.list?.length;

    const handleToggleAll = () => {
        if (areAllItemsOpen) {
            setOpenItems([]);
        } else {
            const allItems = data.orders.list.map(order => `item-${order.report_id}`);
            setOpenItems(allItems);
        }
    };

    return (
        <div className="bg-white shadow rounded-md text-sm p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex reports_table_header font-medium mb-2 w-full" >
                    <span className="w-1/6">WO number</span>
                    <span className="w-1/6">Work Type</span>
                    <span className="w-1/6">City</span>
                    <span className="w-1/6">Address</span>
                    <span className="w-1/6">Status</span>
                    <span className="w-1/6">Completed Date</span>
                    <span className="w-1/6">Assigned Worker</span>
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 text-xs rounded w-24"
                    onClick={handleToggleAll}
                >
                    {areAllItemsOpen ? 'Close All' : 'Open All'}
                </button>
            </div>

            {
                data?.orders?.list?.length === 0
                    ? <StateShower id={"no_data"} name={"No reports found!"} />
                    : <>
                        <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
                            {
                                paginatedData?.map(order => (
                                    <AccordionItem key={order.report_id} value={`item-${order.report_id}`}>
                                        <AccordionTrigger>
                                            <div className="flex w-full reports_table cursor-pointer font-normal">
                                                <span className="w-1/6">{order.wo_number}</span>
                                                <span className="w-1/6">{order.work_type_alias}</span>
                                                <span className="w-1/6">{order.city}</span>
                                                <span className="w-1/6">{order.address}</span>
                                                <span className="w-1/6">{order.status}</span>
                                                <span className="w-1/6">{order?.completed_date ? dateFormatter(order?.completed_date) : ""}</span>
                                                <span className="w-1/6">{order?.workers}</span>
                                                <a
                                                    href={`/order/${order.report_id}`}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 text-xs rounded ml-4"
                                                >Edit
                                                </a>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-primary/5 border border-black/10 p-4">
                                            <div className="flex w-full reports_table_child font-normal">
                                                <span className="w-1/6">Description</span>
                                                <span className="w-1/6">Quantity</span>
                                                <span className="w-1/6">Price</span>
                                                <span className="w-1/6">Total</span>
                                                <span className="w-1/6">Spent Time</span>
                                                <span className="w-1/6">Spent Money</span>
                                            </div>
                                            <Table className="w-full">
                                                <TableBody>
                                                    {
                                                        order?.task?.list?.map((task, index, array) => (
                                                            <React.Fragment key={index}>
                                                                <TableRow>
                                                                    <TableCell className="w-1/6">{task.desc}</TableCell>
                                                                    <TableCell className="w-1/6">{task.quantity}</TableCell>
                                                                    <TableCell className="w-1/6">{task.price ? numberSpacer(task.price) : 0} usd</TableCell>
                                                                    <TableCell className="w-1/6">{task.total ? numberSpacer(task.total) : 0} usd</TableCell>
                                                                    <TableCell className="w-1/6">{task.completion?.spent_time ? formatTimeSeconds(task.completion?.spent_time) : 0}</TableCell>
                                                                    <TableCell className="w-1/6">{task.completion?.spent_amount ? numberSpacer(task.completion?.spent_amount) : 0} usd</TableCell>
                                                                </TableRow>

                                                                {index === array.length - 1 && (
                                                                    <TableRow className="font-medium">
                                                                        <TableCell className="w-1/6">Total</TableCell>
                                                                        <TableCell className="w-1/6"></TableCell>
                                                                        <TableCell className="w-1/6"></TableCell>
                                                                        <TableCell className="w-1/6">{order.task.overall.total_tasks_price ? numberSpacer(order.task.overall.total_tasks_price) : 0} usd</TableCell>
                                                                        <TableCell className="w-1/6">{order.task.overall.spent_time ? formatTimeSeconds(order.task.overall.spent_time) : 0}</TableCell>
                                                                        <TableCell className="w-1/6">{order.task.overall.spent_amount ? numberSpacer(order.task.overall.spent_amount) : 0} usd</TableCell>
                                                                    </TableRow>
                                                                )}
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))
                            }

                            <div className="flex justify-end mt-4 gap-14 text-sm">
                                <div className="flex gap-1">
                                    <span>Total tasks price:</span>
                                    <h1 className="font-medium">{numberSpacer(data?.orders?.overall?.total_task_price || 0)} usd</h1>
                                </div>

                                <div className="flex gap-1">
                                    <span>Total worked hours:</span>
                                    <h1 className="font-medium">{formatTimeSeconds(data?.orders?.overall?.total_spent_time || 0)}</h1>
                                </div>

                                <div className="flex gap-1">
                                    <span>Total profit:</span>
                                    <h1 className="font-medium">{numberSpacer(Number(data?.orders?.overall?.total_profit))} usd</h1>
                                </div>
                            </div>
                        </Accordion>

                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center gap-2">
                                <span>Show</span>
                                <select
                                    className="border rounded-md p-1"
                                    value={itemsPerPage}
                                    onChange={handleItemsPerPageChange}
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                </select>
                                <span>entries</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {currentPage > 1 && (
                                    <button
                                        className="border rounded-md p-1"
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                    >
                                        Previous
                                    </button>
                                )}
                                <span>Page {currentPage} of {totalPages}</span>
                                {currentPage < totalPages && (
                                    <button
                                        className="border rounded-md p-1"
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
            }
        </div>
    );
};

export default ReportsTableNew;
