import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {SingleExpenseType} from "@/types/expense";
import {dateFormatter, numberSpacer} from "@/lib";

const ExpensesTable = ({data}: { data: SingleExpenseType[] }) => {
    return (
        <div className={"bg-white shadow rounded-md"}>
            <Table className="max-lg:w-[700px] text-sm">
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Worker</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Comment</TableHead>
                        <TableHead>CreatedAt (Date)</TableHead>
                        <TableHead>UpdatedAt</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        data?.map(expense => (
                            <TableRow key={expense.id}>
                                <TableCell>#{expense.id}</TableCell>
                                <TableCell>
                                    {expense.worker.name}
                                </TableCell>
                                <TableCell className={"font-medium"}>
                                    {
                                        expense.action === "SPENDING"
                                            ? <span
                                                className={"text-destructive"}>{numberSpacer(expense.amount)}</span>
                                            : <span
                                                className={"text-green-600"}>{numberSpacer(expense.amount)}</span>
                                    }
                                </TableCell>
                                <TableCell className={"lowercase"}>{expense.action}</TableCell>
                                <TableCell className={"text-xs font-mono italic"}>{expense.comment}</TableCell>
                                <TableCell>{dateFormatter(expense.createdAt)}</TableCell>
                                <TableCell>{dateFormatter(expense.updatedAt)}</TableCell>

                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
};

export default ExpensesTable;