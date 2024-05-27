import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {FiEdit} from "react-icons/fi";
import {AiOutlineDelete} from "react-icons/ai";
import {useEditAdminModal, useGetAdminInfoStore} from "@/hooks/useZustand.tsx";
import {AdminProps} from "@/types";
import {capitalizedText, dateFormatter} from "@/lib/utils.ts";

type AdminsTableProps = {
    data: AdminProps[]
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const AdminsTable = ({data, onEdit, onDelete}: AdminsTableProps) => {
    const editAdminModal = useEditAdminModal();
    const {role} = useGetAdminInfoStore()

    return (
        <div className={"bg-white shadow rounded-md"}>
            <Table className="max-lg:w-[700px]">
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Password</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>CreatedAt</TableHead>
                        <TableHead>UpdatedAt</TableHead>
                        {role === "ADMIN" && <TableHead>Actions</TableHead>}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        data?.map(admin => (
                            <TableRow key={admin.id}>
                                <TableCell>{admin.id}</TableCell>
                                <TableCell>{admin.name}</TableCell>
                                <TableCell>{admin.username}</TableCell>
                                <TableCell>•••••••••</TableCell>
                                <TableCell>{admin?.role ? capitalizedText(admin.role) : "--"}</TableCell>
                                <TableCell>{dateFormatter(admin?.createdAt!)}</TableCell>
                                <TableCell>{dateFormatter(admin?.updatedAt!)}</TableCell>
                                {
                                    role === "ADMIN" && <TableCell>
                                        <div className="flex gap-2">
                                            <FiEdit className="text-[18px] text-amber-700 opacity-60 cursor-pointer"
                                                    onClick={() => {
                                                        editAdminModal.onOpen()
                                                        onEdit(admin.id!)
                                                    }}/>
                                            <AiOutlineDelete className={"text-[19px] text-destructive cursor-pointer"}
                                                             onClick={() => onDelete(admin.id!)}/>
                                        </div>
                                    </TableCell>
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
};

export default AdminsTable;
