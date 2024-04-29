'use client'

import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'


export function SubmitButton({customTitle, redirectUrl}: {customTitle?: string, redirectUrl: string | undefined}) {
    const { pending } = useFormStatus()
    const router = useRouter()

    useEffect(() => {
        if (redirectUrl !== undefined) {
            router.push(redirectUrl);
        }
    }, [redirectUrl, router])

    return (
        <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
             {pending ? 'Saving...' : customTitle || 'Save' }
        </button>
    )
}