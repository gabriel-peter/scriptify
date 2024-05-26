'use client'
import { useFormStatus } from 'react-dom'
import { useEffect } from 'react'
import { standardButtonStyling } from './styling'
import { Button } from '../catalyst-ui/button'

export function SubmitButton({customTitle, successAction, isSuccess}: {customTitle?: string, successAction: () => void, isSuccess: boolean}) {
    const { pending } = useFormStatus()
    // const router = useRouter()

    useEffect(() => {
        if (isSuccess) {
            successAction();
            // router.push(redirectUrl);
        }
    }, [successAction, isSuccess])

    return (
        <Button
            type="submit"
            disabled={pending}
            className={standardButtonStyling}
        >
             {pending ? 'Saving...' : customTitle || 'Save' }
        </Button>
    )
}