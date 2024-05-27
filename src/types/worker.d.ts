export type CreateOrUpdateWorkerProps = {
    name: string,
    username: string;
    password: string;
};

export type WorkerType = {
    id: number,
    name: string,
    groupId: string;
    hourly_pay_rate: number,
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}
