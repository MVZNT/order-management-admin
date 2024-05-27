import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {AiOutlineDelete} from "react-icons/ai";

const RolesTable = () => {
    return (
        <div className={"bg-white shadow rounded-md"}>
            <Table className="max-lg:w-[700px]">
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Permissions</TableHead>
                        <TableHead>CreatedAt</TableHead>
                        <TableHead>UpdatedAt</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell>123</TableCell>
                        <TableCell>Manager</TableCell>

                        <TableCell className={"flex gap-1"}>
                            <span className={"bg-gray-500 text-white py-1 px-2 rounded-sm text-xs"}>work_orders</span>
                            <span className={"bg-gray-500 text-white py-1 px-2 rounded-sm text-xs"}>dashboard</span>
                            <span className={"bg-gray-500 text-white py-1 px-2 rounded-sm text-xs"}>tasks</span>
                        </TableCell>

                        <TableCell>20.08.2024, 10:00</TableCell>
                        <TableCell>19.09.2024, 20:31</TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                {/*<FiEdit className="text-[18px] text-amber-700 opacity-60 cursor-pointer"*/}
                                {/*        onClick={editRoleModal.onOpen}/>*/}
                                <AiOutlineDelete className={"text-[19px] text-destructive cursor-pointer"}/>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
};

export default RolesTable;