type Permission = {
    rolePermId?: number; // optional if you don't need it when submitting the form
    roleId: number;
    permId: number;
    accessibility: ('WRITE' | 'READ' | 'EDIT' | 'DELETE')[];
};

export type RoleType = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    permissions: Permission[];
};
