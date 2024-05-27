export type LoginAdminProps = {
    username: string;
    password: string;
};

export type RolesType = "ADMIN" | "MANAGER" | "QC"

export type CreateOrUpdateAdminProps = {
    role: RolesType,
    name: string;
    username: string;
    password: string;
};

export type AdminProps = {
    id: number | undefined;
    name: string | undefined;
    role: RolesType | undefined;
    username: string | undefined;
    password?: string | undefined;
    createdAt: string | undefined;
    updatedAt: string | undefined;
}