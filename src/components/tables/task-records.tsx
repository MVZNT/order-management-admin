import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {TaskTimeRecordsType} from "@/types/tasks";

const TaskTimeRecords = ({data}: { data: TaskTimeRecordsType[] }) => {
    return (
        data?.length === 0
            ? <h1 className={"text-center text-gray-700"}>No time records for this task (:</h1>
            : <Table className="max-lg:w-[700px]">
                <TableHeader>
                    <TableRow>
                        <TableHead>Start Time</TableHead>
                        <TableHead>End Time</TableHead>
                        <TableHead>Spent Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.map(record => (
                            <TableRow key={record?.id}>
                                <TableCell>{record?.start_time}</TableCell>
                                <TableCell>{record?.end_time}</TableCell>
                                <TableCell>{record?.spent_time}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
    )
};

export default TaskTimeRecords;