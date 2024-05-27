import {WorkerSchema} from "@/lib";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";

import {Form, FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {useCreateWorker, useUpdateWorker} from "@/hooks/useWorker.ts";
import {WorkerType} from "@/types/worker";
import {useState} from "react";

type WorkerFormType = {
    action: "CREATE" | "EDIT",
    data?: WorkerType
}

const WorkerForm = ({action, data}: WorkerFormType) => {
    const [isPassShown, setPassShown] = useState<boolean>(false)

    const createWorkerMutation = useCreateWorker()
    const updateWorkerMutation = useUpdateWorker()

    const form = useForm<z.infer<typeof WorkerSchema>>({
        resolver: zodResolver(WorkerSchema),
        values: {
            name: data?.name || "",
            username: data?.username || "",
            password: data?.password || "",
            groupId: data?.groupId || "",
            hourly_pay_rate: data?.hourly_pay_rate!,
        }
    });

    function onSubmit(values: z.infer<typeof WorkerSchema>) {
        if (action === "CREATE") {
            createWorkerMutation.mutate(values)
        } else {
            updateWorkerMutation.mutate({
                workerId: Number(data?.id),
                data: values
            })
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
                <h1 className="text-[22px] font-semibold text-center">{action === "CREATE" ? "Create worker" : "Edit worker"}</h1>

                <div className="flex flex-col gap-2">
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

                    {/* GroupId */}
                    <FormField
                        control={form.control}
                        name="groupId"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="telegam groupId" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Hourly Pay Rate */}
                    <FormField
                        control={form.control}
                        name="hourly_pay_rate"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="hourly pay rate" {...field} />
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

                    <Button
                        isLoading={createWorkerMutation.isPending || updateWorkerMutation.isPending}>{action === "CREATE" ? "Create" : "Save changes"}</Button>
                </div>
            </form>
        </Form>
    );
};

export default WorkerForm;
