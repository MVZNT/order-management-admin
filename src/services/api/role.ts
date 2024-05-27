import {api} from "@/services/configs";

class Role {
    getRoles = async () => {
        return await api.get("/role")
    }
}

export const roleService = new Role();