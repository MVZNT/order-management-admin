import TextArea from "@/components/ui/text-area.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {useCreateJobNote} from "@/hooks/useJobNotes.tsx";

const JobNotesForm = ({report_id}: { report_id: number }) => {
    const [note_text, setNoteText] = useState("");

    // mutation
    const createJobNoteMutation = useCreateJobNote()

    const onSubmit = (e: any) => {
        e.preventDefault();

        const payload = {
            report_id,
            note_text
        }

        createJobNoteMutation.mutate(payload)
    }

    return (
        <form className={"flex flex-col gap-3"}>
            <h1 className={"text-xl text-center font-medium"}>Create job note</h1>

            <div className={"flex flex-col gap-3 text-sm"}>
                <span>Description</span>
                <TextArea placeholder={"enter description for note..."} onChange={(e) => setNoteText(e.target.value)}/>
            </div>

            <Button isLoading={createJobNoteMutation.isPending} onClick={onSubmit}>Create</Button>
        </form>
    )
};

export default JobNotesForm;