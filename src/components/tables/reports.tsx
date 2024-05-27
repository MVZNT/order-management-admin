import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {SingleReportType} from "@/types/reports";
import {capitalizedText, numberSpacer} from "@/lib";

const ReportsTable = ({data}: { data: SingleReportType[] }) => {
    return (
        <div className={"bg-white shadow rounded-md"}>
            <Table className="max-lg:w-[700px]">
                <TableHeader>
                    <TableRow>
                        <TableHead>Report Id</TableHead>
                        <TableHead>Order Status</TableHead>
                        <TableHead>Completed tasks</TableHead>
                        <TableHead>Uncompleted tasks</TableHead>
                        <TableHead>Tasks price</TableHead>
                        <TableHead>Assigned worker</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        data?.map(report => (
                            <TableRow key={report.report_id}>
                                <TableCell>{report.report_id}</TableCell>
                                <TableCell>{capitalizedText(report.status)}</TableCell>
                                <TableCell>{report.task.completed}</TableCell>
                                <TableCell>{report.task.unCompleted}</TableCell>
                                <TableCell>{numberSpacer(report.task.price)}</TableCell>
                                <TableCell>{report.workers?.length === 0 ? "---" : report.workers?.map(worker => worker.name).join(", ")}</TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
};

export default ReportsTable;