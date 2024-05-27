import {api} from "@/services/configs";
import {GetOrdersQueryType, UpdateOrderInfoType} from "@/types/orders";

class Orders {
    getOrders = async (query: GetOrdersQueryType) => {
        const {
            report_id,
            city,
            status,
            country,
            loan_number,
            state,
            zip_code,
            address
        } = query

        return await api.get(`/orders`, {
            params: {
                report_id,
                city,
                status,
                country,
                loan_number,
                state,
                zip_code,
                address
            }
        })
    }

    getSingleOrder = async (report_id: number) => {
        return await api.get(`/orders/${report_id}`)
    }
    update = async (report_id: number, data: UpdateOrderInfoType) => {
        return await api.put(`/orders/${report_id}`, data);
    }
    syncOrders = async () => {
        return await api.post(`/orders/sync`)
    }
    getSyncOrdersLog = async () => {
        return await api.get(`/orders/sync-log`)
    }
}

export const ordersService = new Orders();