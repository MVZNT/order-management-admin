import * as z from "zod";

export const LoginSchema = z.object({
    username: z
        .string({
            required_error: "username is required!",
        })
        .min(1, "username is required!"),
    password: z
        .string({
            required_error: "password is required!",
        })
        .min(1, "password is required!"),
});

export const WorkerSchema = z.object({
    name: z
        .string({
            required_error: "name is required!",
        }).min(1, "name is required!"),
    hourly_pay_rate: z
        .coerce.number({
            invalid_type_error: "hourly pay rate is required!",
        }).min(1, "hourly pay rate is required!"),
    username: z
        .string({
            required_error: "username is required!",
        }).min(1, "username is required!"),
    password: z
        .string({
            required_error: "password is required!",
        }).min(1, "password is required!"),
    groupId: z.string().optional(),
})

export const ExpenseSchema = z.object({
    amount: z.coerce.number({
        invalid_type_error: "amount is required!",
    }).min(1, "amount is required!"),
    action: z.string({
        required_error: "action is required!",
    }).min(1, "action is required!"),
    comment: z.string().optional(),
    date: z.any().optional()
})

export const TaskSchema = z.object({
    desc: z.string({
        required_error: "description is required!",
    }).min(1, "description is required!"),
    qty: z.coerce.number({
        // invalid_type_error: "quantity is required!"
    }).default(0),
    price: z.coerce.number({
        required_error: "price is required!",
    }).default(0),
    total: z.coerce.number({
        required_error: `total is required!`,
    }).default(0),
    add: z.string({
        required_error: "additional info is required!",
    }).optional(),
})


export const AdminSchema = z.object({
    role: z.any(),
    name: z
        .string({
            required_error: "name is required!",
        }).min(1, "name is required!"),
    username: z
        .string({
            required_error: "username is required!",
        }).min(1, "username is required!"),
    password: z
        .string({
            required_error: "password is required!",
        }).min(1, "password is required!"),
})