import {AdminsTable} from "@/components/tables";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useCreateAdminModal, useEditAdminModal, useGetAdminInfoStore} from "@/hooks/useZustand.tsx";
import {DialogModal} from "@/components/ui/dialog.tsx";
import {AdminForm} from "@/components/forms";
import {useDeleteAdmin, useGetAdmins} from "@/hooks";
import {AdminProps} from "@/types";
import {customToast} from "@/lib/utils.ts";
import {useEffect, useState} from "react";
import StateShower from "@/components/state-shower.tsx";

const Admins = () => {
    const [keyword, setKeyword] = useState<string>("");
    const [admin, setAdmin] = useState<AdminProps>()

    const createAdminModal = useCreateAdminModal();
    const editAdminModal = useEditAdminModal();

    const {role} = useGetAdminInfoStore()

    const getAdminsQuery = useGetAdmins(keyword);
    const adminsData: AdminProps[] = getAdminsQuery.data?.data?.admins

    const deleteAdminMutation = useDeleteAdmin()

    const onAdminDelete = (id: number) => {
        const isOk = confirm("Are you sure to delete the admin?")
        if (isOk) {
            return deleteAdminMutation.mutate(id)
        } else {
            return null
        }
    }

    useEffect(() => {
        getAdminsQuery.refetch()
    }, [keyword])

    const onAdminEdit = (id: number) => {
        const findAdmin = adminsData.find(admin => admin.id === id)
        if (!findAdmin) {
            return customToast("ERROR", "Admin is not found to edit!")
        }
        setAdmin(findAdmin)
    }

    return (
        <>
            {/* create admin modal */}
            <DialogModal isOpen={createAdminModal.isOpen} onClose={createAdminModal.onClose}>
                <AdminForm action={"CREATE"}/>
            </DialogModal>

            {/* edit admin modal */}
            <DialogModal isOpen={editAdminModal.isOpen} onClose={editAdminModal.onClose}>
                <AdminForm action={"EDIT"} data={admin}/>
            </DialogModal>

            <div className={"flex justify-between"}>
                <Input placeholder={"Search by name..."} className={"w-1/4"}
                       onChange={(e) => setKeyword(e.target.value)}/>
                {role === "ADMIN" && <Button onClick={createAdminModal.onOpen}>+ Create admin</Button>}
            </div>

            {
                getAdminsQuery.isLoading ? <StateShower id={"loading"} name={"Loading..."}/> : adminsData.length === 0 ?
                    <StateShower id={"no_data"} name={"No admins found!"}/> :
                    <AdminsTable data={adminsData} onEdit={onAdminEdit} onDelete={onAdminDelete}/>
            }
        </>
    )
};

export default Admins;