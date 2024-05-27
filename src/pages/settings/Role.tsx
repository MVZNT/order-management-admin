// import {RolesTable} from "@/components/tables";
// import {DialogModal} from "@/components/ui/dialog.tsx";
// import {useCreateRoleModal, useEditRoleModal} from "@/hooks/useZustand.tsx";
// import {Input} from "@/components/ui/input.tsx";
// import {Button} from "@/components/ui/button.tsx";
// import {RoleForm} from "@/components/forms";
//
// const Roles = () => {
//     const createRoleModal = useCreateRoleModal();
//     const editRoleModal = useEditRoleModal();
//
//     return (
//         <>
//             {/* create role modal */}
//             <DialogModal isOpen={createRoleModal.isOpen} onClose={createRoleModal.onClose}
//                          className={"w-1/2 top-[45%]"}>
//                 <RoleForm action={"CREATE"}/>
//             </DialogModal>
//
//             {/* edit role modal */}
//             <DialogModal isOpen={editRoleModal.isOpen} onClose={editRoleModal.onClose} className={"w-1/2 top-[45%]"}>
//                 <RoleForm action={"EDIT"}/>
//             </DialogModal>
//
//             <div className={"flex justify-between"}>
//                 <Input placeholder={"Search by roles..."} className={"w-1/4"}/>
//                 <Button onClick={createRoleModal.onOpen}>+ Create role</Button>
//             </div>
//
//             <RolesTable/>
//         </>
//     )
// };
//
// export default Roles;