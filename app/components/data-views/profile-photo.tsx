"use client"
import { getProfilePhotoUrl } from "@/app/api/user-actions/get-profile-photo-url"
import { createClient } from "@/utils/supabase/client"
import Image from 'next/image'
import { useEffect, useMemo, useState } from "react"
import BlankProfilePhoto from "./blank-profile-photo"

export default function ProfilePhoto({ size }: { size: number }) {
    const supabase = createClient()
    const [url, setUrl] = useState<string>()
    const memoizedUrl = useMemo(() => url, [url]);
    useEffect(() => {
        getProfilePhotoUrl()
            .then((response) => {
                if (!response || !response.data) {
                    return null
                }
                return supabase.storage.from("avatars").download(response.data.avatar_url as string)
            })
            .then((response) => {
                if (!response || response.error) {
                    console.error(response?.error)
                    return
                }
                setUrl(URL.createObjectURL(response.data))
            })
    }, [])

    return (
        <>
            {
                memoizedUrl !== undefined ? (<Image
                    width={size}
                    height={size}
                    src={memoizedUrl}
                    alt="Avatar"
                    // priority
                    loading="lazy"
                    className="inline-block h-8 w-8 rounded-full"
                    style={{ height: size, width: size }}
                />
                ) : (
                    <BlankProfilePhoto size={size} />
                )
            }
        </>
    )
}