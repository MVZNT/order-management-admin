import {TaskSchema} from "@/lib";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import TextArea from "@/components/ui/text-area.tsx";
import {SingleTaskType} from "@/types/tasks";
import {useCreateTask, useUpdateTask} from "@/hooks/useTask.ts";

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
            total: data?.total,
            add: data?.add,
            desc: data?.desc || ""
        }
    });

    const createTaskMutation = useCreateTask();
    const updateTaskMutation = useUpdateTask();

    function onSubmit(values: z.infer<typeof TaskSchema>) {
        if (action === "CREATE") {
            createTaskMutation.mutate({
                report_id,
                ...values
            })
        } else if (action === "EDIT") {
            updateTaskMutation.mutate({
                taskId: data?.id!,
                data: values
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
                    <div className="flex gap-2">
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
                                        <Input placeholder="enter price" type={"number"}{...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* Total amount */}
                        <FormField
                            control={form.control}
                            name="total"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Total:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="enter total" type={"number"} {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
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
