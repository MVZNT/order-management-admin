import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import "../../styles/index.css"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import React from "react";
import {GetReportsType} from "@/types/reports";
import {dateFormatter, formatTimeSeconds, numberSpacer} from "@/lib";

type ReportTableProps = {
    data: GetReportsType,
}

const ReportsTableNew = ({data}: ReportTableProps) => {
    return (
        <div className="bg-white shadow rounded-md text-sm p-4">
            <div className="flex mr-4 reports_table font-medium">
                <span>Wo</span>
                <span>City</span>
                <span>Address</span>
                <span>Status</span>
                <span>Completed Date</span>
                <span>Assigned Worker</span>
            </div>

            <Accordion type="single" collapsible>
                {
                    data?.orders?.list?.map(order => (
                        <AccordionItem key={order.report_id} value={`item-${order.report_id}`}>
                            <AccordionTrigger>
                                <div className="flex w-full reports_table cursor-pointer font-normal">
                                    <span>#{order.wo_number}</span>
                                    <span>{order.city}</span>
                                    <span>{order.address}</span>
                                    <span>{order.status}</span>
                                    <span>{order?.completed_date ? dateFormatter(order?.completed_date) : ""}</span>
                                    <span>{order?.task?.list[0]?.completion?.worker?.name}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className={"bg-primary/5 border border-black/10"}>
                                <Table className="max-lg:w-[700px] ">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Total</TableHead>
                                            <TableHead>Spent Time</TableHead>
                                            <TableHead>Spent Money</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            order?.task?.list?.map((task, index, array) => (
                                                <React.Fragment key={index}>
                                                    <TableRow>
                                                        <TableCell>{task.desc}</TableCell>
                                                        <TableCell>{task.quantity}</TableCell>
                                                        <TableCell>{task.price ? numberSpacer(task.price) : 0} usd</TableCell>
                                                        <TableCell>{task.total ? numberSpacer(task.total) : 0} usd</TableCell>
                                                        <TableCell>{task.completion?.spent_time ? formatTimeSeconds(task.completion?.spent_time) : 0}</TableCell>
                                                        <TableCell>{task.completion?.spent_amount ? numberSpacer(task.completion?.spent_amount) : 0} usd</TableCell>
                                                    </TableRow>

                                                    {index === array.length - 1 && (
                                                        <TableRow className={"font-medium relative"}>
                                                            <TableCell>Total</TableCell>
                                                            <TableCell></TableCell>
                                                            <TableCell></TableCell>
                                                            <TableCell>{order.task.overall.total_tasks_price ? numberSpacer(order.task.overall.total_tasks_price) : 0} usd</TableCell>
                                                            <TableCell>{order.task.overall.spent_time ? formatTimeSeconds(order.task.overall.spent_time) : 0}</TableCell>
                                                            <TableCell>{order.task.overall.spent_amount ? numberSpacer(order.task.overall.spent_amount) : 0} usd</TableCell>
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

                <div className={"flex justify-end mt-4 gap-14 text-sm"}>
                    <div className={"flex gap-1"}>
                        <span>Total tasks price:</span>
                        <h1 className={"font-medium"}>{numberSpacer(data?.orders?.overall?.total_task_price | 0)} usd</h1>
                    </div>

                    <div className={"flex gap-1"}>
                        <span>Total worked hours:</span>
                        <h1 className={"font-medium"}>{formatTimeSeconds(data?.orders?.overall?.total_spent_time | 0)}</h1>
                    </div>

                    <div className={"flex gap-1"}>
                        <span>Total profit:</span>
                        <h1 className={"font-medium"}>{numberSpacer(Number(data?.orders?.overall?.total_profit))} usd</h1>
                    </div>
                </div>
            </Accordion>
        </div>
    );
};

export default ReportsTableNew;
