import {useMutation} from "@tanstack/react-query";
import {queryKeys} from "@/hooks/queryKeys.ts";
import {jobNotesService} from "@/services/api";
import {customToast} from "@/lib";
import {useCreateJobNoteModal} from "@/hooks/useZustand.tsx";
import {queryClient} from "@/main.tsx";

export const useCreateJobNote = () => {
    const createJobNoteModal = useCreateJobNoteModal()

    return useMutation({
        mutationKey: [queryKeys.CREATE_JOB_NOTE],
        mutationFn: ({report_id, note_text}: { report_id: number, note_text: string }) => {
            return jobNotesService.create(report_id, note_text);
        },
        onSuccess(res) {
            customToast("SUCCESS", "Job note is created successfully!");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_SINGLE_ORDER]
            })
            createJobNoteModal.onClose()
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while creating job note!"
            );
        },
    });
};

export const useDeleteJobNote = () => {
    return useMutation({
        mutationKey: [queryKeys.CREATE_JOB_NOTE],
        mutationFn: (noteId: number) => {
            return jobNotesService.delete(noteId)
        },
        onSuccess(res) {
            customToast("SUCCESS", "Job note is deleted successfully!");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_SINGLE_ORDER]
            })
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while deleting job note!"
            );
        },
    });
};