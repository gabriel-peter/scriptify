"use client"
import { getProfilePhotoUrl } from "@/app/actions/user/get-profile-photo-url"
import { createClient } from "@/utils/supabase/client"
import Image from 'next/image'
import { useEffect, useMemo, useState } from "react"
import BlankProfilePhoto from "./blank-profile-photo"

export default function ProfilePhoto({ size, userId }: { size: number, userId?: string }) {
    const supabase = createClient()
    const [url, setUrl] = useState<string>()
    const memoizedUrl = useMemo(() => url, [url]);
    useEffect(() => {
        getProfilePhotoUrl(userId)
            .then((response) => {
                if (!response || !response.data || !response.data.avatar_url) {
                    return null
                }
                return supabase.storage.from("avatars").download(response.data.avatar_url as string)
            })
            .then((response) => {
                if (!response || response.error) {
                    return
                }
                setUrl(URL.createObjectURL(response.data))
            })
    }, [userId])

    return (
        <>
            {
                memoizedUrl !== undefined ? (<Image
                    width={size}
                    height={size}
                    src={memoizedUrl}
                    alt="Avatar"
                    // priority
                    // loading="lazy"
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

