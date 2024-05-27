import {api} from "@/services/configs";

class JobNotes {
    create = async (report_id: number, note_text: string) => {
        return await api.post("/job-notes", {
            report_id,
            note_text,
        })
    }

    delete = async (noteId: number) => {
        return await api.delete(`/job-notes/${noteId}`);
    }
}

export const jobNotesService = new JobNotes();