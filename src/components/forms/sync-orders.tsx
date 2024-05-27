import {Button} from "@/components/ui/button.tsx";
import {GoRocket} from "react-icons/go";
import {useSyncOrdersModal} from "@/hooks/useZustand.tsx";
import {useSyncOrder} from "@/hooks/useOrder.ts";

const SyncOrdersForm = () => {
    const {setLoading} = useSyncOrdersModal()

    const syncOrdersMutation = useSyncOrder()

    const onSync = () => {
        setLoading(true)
        syncOrdersMutation.mutate()
    }

    return (
        <div className={"flex flex-col gap-4"}>
            <h1 className={"text-xl font-medium"}>Synchronize orders</h1>
            <span className={"text-sm"}>It usually takes 20-35 seconds and sometimes more, please be patient while syncing orders!</span>

            <div className={"flex justify-center"}>
                <Button
                    isLoading={syncOrdersMutation.isPending}
                    className={"flex gap-2 items-center"}
                    onClick={onSync}
                >
                    <GoRocket/>
                    <span>Let's sync!</span>
                </Button>
            </div>
        </div>
    )
};

export default SyncOrdersForm;