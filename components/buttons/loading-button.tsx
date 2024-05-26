import { useState } from "react"
import { Button } from "../catalyst-ui/button"
import BasicSpinner from "../loading/basic-spinner"

type ClientLoadState = "Loading" | "Success" | "Error" | "Idle"

/**
 * Server action must return error
 * @returns 
 */
export default function LoadingButton({ title, serverAction }: { title: string, serverAction: () => Promise<void> }) {
    const [status, setState] = useState<ClientLoadState>('Success')

    function handleServerAction() {
        setState('Loading');
        
        serverAction()
        .then(() => setState('Success'))
        .catch(console.error);
    }

    // Catalyst UI Button
    return <Button
        onClick={() => handleServerAction()}
    >
        {status === 'Loading' && <BasicSpinner />}
        {title}
    </Button>
}