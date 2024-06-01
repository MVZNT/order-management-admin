import {ModalProps} from "@/types/zustand";
import {create} from "zustand";
import {AdminProps} from "@/types";
import {SelectItemProps} from "@/components/searchable-select.tsx";

// worker
export const useCreateWorkerModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export const useEditWorkerModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

// admin
export const useCreateAdminModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export const useEditAdminModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

// role
export const useCreateRoleModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export const useEditRoleModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

// assignment
export const useAssignWorkerModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

// task time records modal
export const useTaskTimeRecordsModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

// task modals
export const useCreateTaskModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export const useEditTaskModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export const useChangeCompletionStatusModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

// job note modals
export const useCreateJobNoteModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

// sync orders modal
interface SyncOrdersProps extends ModalProps {
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
}

export const useSyncOrdersModal = create<SyncOrdersProps>((set) => ({
    isOpen: false,
    isLoading: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
    setLoading: (isLoading: boolean) => set({isLoading}),
}))

// filter orders
export const useFilterOrdersModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

// expense modal
export const useAddExpenseModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))


interface FilterOrderState {
    isFiltered: boolean,
    report_id?: number | undefined;
    wo_number?: string;
    status?: string;
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    worker?: SelectItemProps
    setReportId?: (reportId: number) => void;
    setWoNumber?: (woNumber: string) => void;
    setStatus?: (status: string) => void;
    setAddress?: (address: string) => void;
    setCity?: (city: string) => void;
    setState?: (state: string) => void;
    setZipCode?: (zip_code: string) => void;
    setIsFiltered?: (isFiltered: boolean) => void;
    setWorker?: (data: SelectItemProps | undefined) => void
}

export const useFilterOrdersStore = create<FilterOrderState>((set) => ({
    isFiltered: false,
    report_id: undefined,
    wo_number: "",
    status: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    worker: {},
    setReportId: (reportId: number) => set({report_id: reportId}),
    setWoNumber: (woNumber: string) => set({wo_number: woNumber}),
    setStatus: (status: string) => set({status: status}),
    setAddress: (address: string) => set({address: address}),
    setCity: (city: string) => set({city: city}),
    setState: (state: string) => set({state: state}),
    setZipCode: (zip_code: string) => set({zip_code: zip_code}),
    setIsFiltered: (isFiltered: boolean) => set({isFiltered: isFiltered}),
    setWorker: (data: SelectItemProps | undefined) => set({worker: data})
}));

// set reportId state
export const useSetReportIdStore = create<{
    report_id: number | undefined,
    setReportId: (id: number) => void
}>((set) => ({
    report_id: undefined,
    setReportId: (id: number) => set({report_id: id}),
}))

interface AdminInfoStoreType extends AdminProps {
    isLoading?: boolean,
    setIsLoading?: (loading: boolean) => void,
    setAdminInfo: (info: AdminProps) => void
}

// worker info state
export const useGetAdminInfoStore = create<AdminInfoStoreType>((set) => ({
    id: undefined,
    name: undefined,
    username: undefined,
    role: undefined,
    updatedAt: undefined,
    createdAt: undefined,
    isLoading: false,
    setIsLoading: (loading: boolean) => set({isLoading: loading}),
    setAdminInfo: (info: AdminProps) => set({
        id: info?.id,
        name: info?.name,
        role: info?.role,
        username: info?.username,
        createdAt: info?.createdAt,
        updatedAt: info?.updatedAt,
    })
}))