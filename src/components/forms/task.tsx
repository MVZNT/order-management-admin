import {numberSpacer, TaskSchema} from "@/lib";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import TextArea from "@/components/ui/text-area.tsx";
import {SingleTaskType} from "@/types/tasks";
import {useCreateTask, useUpdateTask} from "@/hooks/useTask.ts";
import {useEffect, useState} from "react";

type WorkerFormType = {
    action: "CREATE" | "EDIT",
    data?: SingleTaskType,
    report_id?: number,
}

const TaskForm = ({action, data, report_id}: WorkerFormType) => {
    const form = useForm<z.infer<typeof TaskSchema>>({
        resolver: zodResolver(TaskSchema),
        defaultValues: {
            qty: data?.qty,
            price: data?.price,
            add: data?.add,
            desc: data?.desc || ""
        }
    });

    const [totalPrice, setTotalPrice] = useState<number | string>("--")

    const createTaskMutation = useCreateTask();
    const updateTaskMutation = useUpdateTask();

    useEffect(() => {
        setTotalPrice(Number(form.getValues("price")) * Number(form.getValues("qty")))
    }, [form.watch()]);

    function onSubmit(values: z.infer<typeof TaskSchema>) {
        if (action === "CREATE") {
            createTaskMutation.mutate({
                report_id,
                total: +totalPrice,
                ...values
            })
        } else if (action === "EDIT") {
            updateTaskMutation.mutate({
                taskId: data?.id!,
                data: {
                    total: +totalPrice,
                    ...values
                }
            })
        } else {
            return null
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
                <h1 className="text-xl font-semibold text-center">{action === "CREATE" ? "Create task" : "Edit task"}</h1>

                <div className={"flex flex-col gap-2"}>
                    <div className="flex gap-4">
                        {/* Quantity */}
                        <FormField
                            control={form.control}
                            name="qty"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Quantity:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="enter quantity" type={"number"} {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* Price */}
                        <FormField
                            control={form.control}
                            name="price"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Price:</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="enter price"
                                            type={"number"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className={"flex flex-col gap-1 text-sm mt-1"}>
                            <span className={"font-medium"}>Total:</span>
                            <h1 className={"mt-[10px]"}>{isNaN(+totalPrice) ? "--" : `${numberSpacer(+totalPrice)} usd`}</h1>
                        </div>
                    </div>

                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="desc"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Description:</FormLabel>
                                <FormControl>
                                    <TextArea
                                        className={"min-h-28"}
                                        placeholder="enter description"  {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Additional info */}
                    <FormField
                        control={form.control}
                        name="add"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Additional info:</FormLabel>
                                <FormControl>
                                    <TextArea
                                        className={"min-h-28"}
                                        placeholder="enter additional info"  {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button
                        isLoading={createTaskMutation.isPending || createTaskMutation.isPending}>{action === "CREATE" ? "Create" : "Save changes"}</Button>
                </div>
            </form>
        </Form>
    );
};

export default TaskForm;
