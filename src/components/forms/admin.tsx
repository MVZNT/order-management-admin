import {AdminSchema} from "@/lib";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";

import {Form, FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {Select} from "@/components/ui/select.tsx";
import {AdminProps} from "@/types";
import {useCreateAdmin, useUpdateAdmin} from "@/hooks";
import {useGetRoles} from "@/hooks/useRoles.ts";
import {customToast} from "@/lib/utils.ts";
import {useState} from "react";

type AdminFormType = {
    action: "CREATE" | "EDIT",
    data?: AdminProps
}

const AdminForm = ({data, action}: AdminFormType) => {
    const [isPassShown, setPassShown] = useState<boolean>(false)
    const getRolesQuery = useGetRoles()

    const form = useForm<z.infer<typeof AdminSchema>>({
        resolver: zodResolver(AdminSchema),
        values: {
            role: data?.role || undefined,
            name: data?.name || "",
            username: data?.username || "",
            password: data?.password || "",
        }
    });


    const createAdminMutation = useCreateAdmin()
    const editAdminMutation = useUpdateAdmin()

    function onSubmit(values: z.infer<typeof AdminSchema>) {
        if (!form.getValues("role")) {
            return customToast("ERROR", "role should not be empty!")
        }

        if (action === "CREATE") {
            createAdminMutation.mutate({...values, role: form.getValues("role")})
        } else {
            editAdminMutation.mutate({
                adminId: Number(data?.id),
                data: {
                    ...values,
                    role: form.getValues("role"),
                },
            })
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
                <h1 className="text-[22px] font-semibold text-center">{action === "CREATE" ? "Create admin" : "Edit admin"}</h1>

                <div className="flex flex-col gap-2">
                    {/* Role */}
                    <FormField
                        control={form.control}
                        name="role"
                        render={() => (
                            <FormItem>
                                <FormControl>
                                    <Select
                                        defaultValue={data?.role ? data.role : "Select role"}
                                        data={[
                                            {id: "ADMIN", name_uz: "Admin"},
                                            {id: "MANAGER", name_uz: "Manager"},
                                            {id: "QC", name_uz: "QC"},
                                        ]}
                                        selectedValue={(value) => form.setValue("role", value)}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Username */}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Password */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <div className={"flex gap-1"}>
                                        <Input placeholder="password"
                                               type={isPassShown ? "text" : "password"} {...field} />
                                        <span className={"text-xs text-center cursor-pointer"}
                                              onClick={() => setPassShown(!isPassShown)}>{isPassShown ? "hide" : "show"} password</span>
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button>{action === "CREATE" ? "Create" : "Save changes"}</Button>
                </div>
            </form>
        </Form>
    );
};

export default AdminForm;
