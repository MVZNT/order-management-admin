import {AiOutlineDelete} from "react-icons/ai";
import {SingleJobNoteType} from "@/types/job-notes";
import {dateFormatter} from "@/lib";

const JobNotesCard = ({data, onDelete}: { data: SingleJobNoteType, onDelete: (noteId: number) => void }) => {

    return (
        <div className={"bg-white flex flex-col gap-4 p-3 rounded-md shadow text-sm"}>
            <div className={"flex justify-between border-b pb-2 border-black/30"}>
                <div className={"flex gap-1"}>
                    <span>ID:</span>
                    <span className={"font-medium"}>#{data.id}</span>
                </div>

                <div className={"flex gap-2 items-center"}>
                    <span className={"text-xs"}>{dateFormatter(data.createdAt)}</span>
                    <AiOutlineDelete
                        className={"text-xl text-destructive cursor-pointer"}
                        onClick={() => onDelete(data.id)}/>
                </div>
            </div>

            <span>
                {data.note_text}
            </span>
        </div>
    );
};

export default JobNotesCard;