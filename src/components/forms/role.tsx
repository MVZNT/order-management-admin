import {Checkbox} from "@/components/ui/checkbox.tsx";
import {PermissionsData} from "@/constants";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";

type RoleFormType = {
    action: "CREATE" | "EDIT"
}

const RoleForm = ({action}: RoleFormType) => {
    const [name, setName] = useState<string>("");
    const [perms, setPerms] = useState<{ id: number, selectedAccessItems: string[] }[]>([]);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    
    const onPermSelect = (isSelected: boolean, id: number, accessItem: string) => {
        if (isSelected) {
            const existingPermIndex = perms?.findIndex((item) => item.id === id);

            if (existingPermIndex !== -1) {
                const updatedPerms = [...perms!];
                const existingPerm = updatedPerms[existingPermIndex];
                const updatedAccessItems = [...existingPerm.selectedAccessItems, accessItem];
                updatedPerms[existingPermIndex] = {...existingPerm, selectedAccessItems: updatedAccessItems};

                setPerms(updatedPerms);
            } else {
                const newPerm = {
                    id,
                    selectedAccessItems: [accessItem]
                };

                setPerms([...(perms ?? []), newPerm]);
            }
        } else {
            const updatedPerms = perms.reduce((acc, perm) => {
                if (perm.id === id) {
                    // Remove the unchecked accessItem from selectedAccessItems
                    const updatedSelectedAccessItems = perm.selectedAccessItems.filter((item) => item !== accessItem);
                    if (updatedSelectedAccessItems.length > 0) {
                        // Keep the permission if it still has selectedAccessItems
                        acc.push({...perm, selectedAccessItems: updatedSelectedAccessItems});
                    }
                } else {
                    acc.push(perm); // Keep other permissions unchanged
                }
                return acc;
            }, [] as { id: number; selectedAccessItems: string[] }[]);
            setPerms(updatedPerms);
        }
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        setIsSubmitted(true)

        if (name.length === 0) return null

        const requestData = {
            name,
            permissions: perms
        }

        console.log(requestData)
    }

    return (
        <form className={"flex flex-col gap-3"}>
            <h1 className={"text-xl font-medium text-center"}>{action === "CREATE" ? "Create role" : "Edit role"}</h1>

            <div className={"flex flex-col gap-4 mt-4"}>
                <div className={"space-y-2"}>
                    <span className={"text-base font-medium"}>Name:</span>
                    <input placeholder={"enter name..."}
                           required
                           onChange={(e) => setName(e.target.value)}
                           className={"border border-black border-opacity-30 px-2 py-[7px] rounded-sm block w-full outline-none placeholder:text-sm text-sm"}/>
                    {name.length === 0 && isSubmitted &&
                        <span className={"text-destructive text-sm"}>name should not be empty!</span>}
                </div>

                <div className={"space-y-3"}>
                    <span className={"text-base font-medium"}>Permissions:</span>

                    <div className={"flex flex-col gap-2 text-sm"}>
                        {
                            PermissionsData.map((perm, index) => (
                                <>
                                    <div key={perm.id} className={"flex justify-between"}>
                                        <span>{perm.name.charAt(0).toUpperCase() + perm.name.slice(1).toLowerCase()}</span>

                                        <div className={"flex gap-5"}>
                                            {perm.allowedAccesses.map((access, index) => (
                                                <div key={index} className={"flex gap-2 items-center"}>
                                                    <span>{access}</span>
                                                    <Checkbox className={"mt-[3px]"}
                                                              onCheckedChange={(isChecked) => {
                                                                  onPermSelect(isChecked as boolean, perm.id, access)
                                                              }}/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {index < PermissionsData.length - 1 && <hr/>}
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className={"flex justify-center mt-4"}>
                <Button onClick={onSubmit}
                        className={"w-1/3"}>{action === "CREATE" ? "Create" : "Save changes"}</Button>
            </div>
        </form>
    );
};

export default RoleForm;