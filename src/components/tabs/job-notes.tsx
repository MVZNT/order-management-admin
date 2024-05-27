import {JobNotesCard} from "@/components/cards";
import {SingleJobNoteType} from "@/types/job-notes";
import {Button} from "@/components/ui/button.tsx";
import {useCreateJobNoteModal} from "@/hooks/useZustand.tsx";
import {DialogModal} from "@/components/ui/dialog.tsx";
import {JobNotesForm} from "@/components/forms";
import {useParams} from "react-router-dom";
import {useDeleteJobNote} from "@/hooks/useJobNotes.tsx";

const JobNotesTab = ({orderInfo}: { orderInfo: SingleJobNoteType[] }) => {
    const createJobNotesModal = useCreateJobNoteModal()

    const {reportId} = useParams()

    const deleteNoteMutation = useDeleteJobNote()

    const onDeleteJobNote = (noteId: number) => {
        const isOk = confirm("Are you sure to delete this job note?")
        if (isOk) {
            deleteNoteMutation.mutate(noteId)
        }
    }

    return (
        <>
            <DialogModal isOpen={createJobNotesModal.isOpen} onClose={createJobNotesModal.onClose}>
                <JobNotesForm report_id={+reportId!}/>
            </DialogModal>

            <div className={"flex flex-col gap-5"}>
                <div className={"flex justify-end"}>
                    <Button onClick={createJobNotesModal.onOpen}>+ create note</Button>
                </div>

                <div className={"grid grid-cols-2 gap-4"}>
                    {orderInfo?.map((job_note) => (
                        <JobNotesCard key={job_note.id} data={job_note} onDelete={onDeleteJobNote}/>
                    ))}
                </div>
            </div>
        </>

    )
};

export default JobNotesTab;