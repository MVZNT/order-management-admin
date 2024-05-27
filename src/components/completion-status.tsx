import TextArea from "@/components/ui/text-area.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {useUpdateTaskCompletionStatus} from "@/hooks/useTask.ts";

const ChangeCompletionStatus = ({taskId, currentStatus}: { taskId: number, currentStatus: boolean }) => {
    const [comment, setComment] = useState("")

    const updateCompletionStatusMutation = useUpdateTaskCompletionStatus()

    const onSubmit = (e: any) => {
        e.preventDefault();

        const payload = {
            taskId,
            isCompleted: !currentStatus,
            comment
        }

        updateCompletionStatusMutation.mutate(payload)
    }

    return (
        <form className={"flex flex-col gap-4"}>
            <h1 className={"text-[18px] font-medium text-center"}>Change completion status</h1>

            <TextArea
                placeholder={"enter comment for an action..."}
                onChange={(e) => setComment(e.target.value)}
            />

            <Button isLoading={updateCompletionStatusMutation.isPending} onClick={onSubmit}>Submit</Button>
        </form>
    )
};

export default ChangeCompletionStatus;