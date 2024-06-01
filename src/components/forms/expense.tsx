import {customToast, ExpenseSchema} from "@/lib";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import TextArea from "@/components/ui/text-area.tsx";
import {Select} from "@/components/ui/select.tsx";
import {useAddExpense} from "@/hooks/useExpenses.ts";
import {ExpenseActionEnum} from "@/types/expense";
import {SearchableSelect} from "@/components";
import {useEffect, useState} from "react";
import {SelectItemProps} from "@/components/searchable-select.tsx";
import {useGetWorkers} from "@/hooks/useWorker.ts";
import {WorkerType} from "@/types/worker";

const ExpenseForm = () => {
    const [worker, setWorker] = useState<SelectItemProps>();
    const [keyword, setKeyword] = useState("");

    const form = useForm<z.infer<typeof ExpenseSchema>>({
        resolver: zodResolver(ExpenseSchema),
    });

    const getWorkersQuery = useGetWorkers(keyword)
    const workersData: WorkerType[] = getWorkersQuery.data?.data?.workers

    const addExpenseMutation = useAddExpense();

    function onSubmit(values: z.infer<typeof ExpenseSchema>) {
        if (!worker?.key) {
            return customToast("ERROR", "Please, select worker!")
        }

        addExpenseMutation.mutate({
            workerId: +worker?.key!,
            date: values?.date ? new Date(values.date).toISOString() : undefined,
            action: values.action as ExpenseActionEnum,
            amount: values.amount,
            comment: values.comment,
        });
    }

    useEffect(() => {
        getWorkersQuery.refetch()
    }, [keyword]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <h1 className="text-[22px] font-semibold text-center">Create expense</h1>

                <div className="flex flex-col gap-2">
                    {/* Worker */}
                    <div className="w-full flex flex-col gap-3">
                        <span className="text-sm font-medium">Worker</span>
                        <SearchableSelect
                            className="w-full"
                            defaultPlaceholder="Select worker"
                            onSelected={setWorker}
                            selectedItem={worker}
                            setSearchValue={setKeyword}
                            data={workersData?.map((worker) => {
                                return {
                                    key: worker?.id,
                                    value: worker?.name
                                }
                            })}
                        />
                    </div>

                    {/* Action */}
                    <FormField
                        control={form.control}
                        name="action"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Expense Action:</FormLabel>
                                <FormControl>
                                    <Select
                                        data={[
                                            {id: "SPENDING", name_uz: "Spending (expense for company)"},
                                            {id: "PENALTY", name_uz: "Penalty"},
                                        ]}
                                        defaultValue="Select expense action"
                                        selectedValue={(value) => form.setValue("action", String(value))}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Amount */}
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Amount:</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter amount"
                                        type="number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Date */}
                    <FormField
                        control={form.control}
                        name="date"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Date:</FormLabel>
                                <FormControl>
                                    <Input type="date" placeholder="Select date" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Comment */}
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Comment:</FormLabel>
                                <FormControl>
                                    <TextArea placeholder="Enter comment for this expense..." {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button isLoading={addExpenseMutation.isPending}>Create</Button>
                </div>
            </form>
        </Form>
    );
};

export default ExpenseForm;
